"use client"

import { useEffect, useRef, useState } from "react"
import InternshipBackground, { rupees } from "@/components/InternshipBackground"

const FIELDS = [
    ["name", "Full name", "text", "Your full name", "name"],
    ["date_of_birth", "Date of birth", "date", "", "bday"],
    ["phone", "Phone number", "tel", "Your phone number", "tel"],
    ["address", "Street address", "text", "Your address", "street-address"],
    ["city", "City / town", "text", "Your city", "address-level2"],
    ["region", "Region / state", "text", "Your region", "address-level1"],
    ["zip_code", "Postal code", "text", "737121", "postal-code"],
]

async function post(path, body) {
    const res = await fetch(`/api${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw Object.assign(new Error(data.message || "Something went wrong. Please try again."), { status: res.status })
    return data
}

// Razorpay Checkout script, loaded once when the applicant first pays
let checkoutScript
function loadCheckout() {
    if (window.Razorpay) return Promise.resolve()
    checkoutScript ??= new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.onload = resolve
        script.onerror = () => {
            checkoutScript = null
            reject(new Error("Could not load Razorpay. Check your connection and try again."))
        }
        document.body.appendChild(script)
    })
    return checkoutScript
}

// A verified email survives a refresh for this tab, until the server's token expires (2 hours)
const VERIFIED_KEY = "mb-intern-verified"
const VERIFIED_TTL = 2 * 60 * 60 * 1000
function saveVerified(value) {
    try {
        if (value) sessionStorage.setItem(VERIFIED_KEY, JSON.stringify({ ...value, at: Date.now() }))
        else sessionStorage.removeItem(VERIFIED_KEY)
    } catch {}
}
function loadVerified() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(VERIFIED_KEY) || "null")
        if (saved?.email && saved?.token && Date.now() - saved.at < VERIFIED_TTL) return saved
        sessionStorage.removeItem(VERIFIED_KEY)
    } catch {}
    return null
}

// Unsent form fields, kept for this tab so a refresh doesn't lose them
const DRAFT_KEY = "mb-intern-draft"
function saveDraft(value) {
    try {
        if (value) sessionStorage.setItem(DRAFT_KEY, JSON.stringify(value))
        else sessionStorage.removeItem(DRAFT_KEY)
    } catch {}
}
function loadDraft() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null")
        if (saved && typeof saved === "object") return saved
    } catch {}
    return {}
}

// Internship application: verify email by code, fill in details, then pay with Razorpay
export default function InternshipApplication({ pricing }) {
    const [email, setEmail] = useState("")
    const [codeSent, setCodeSent] = useState(false)
    const [code, setCode] = useState("")
    const [token, setToken] = useState("")
    const [cooldown, setCooldown] = useState(0)
    const [background, setBackground] = useState("")
    const [option, setOption] = useState("")
    const [draft, setDraft] = useState({})
    const [busy, setBusy] = useState("")
    const [error, setError] = useState("")
    const [notice, setNotice] = useState("")
    const [done, setDone] = useState("")
    const codeInput = useRef(null)

    useEffect(() => {
        const saved = loadVerified()
        const fields = loadDraft()
        setDraft(fields)
        if (pricing?.categories?.some((item) => item.id === fields.background)) setBackground(fields.background)
        if (pricing?.options?.some((item) => item.id === fields.fee_option)) setOption(fields.fee_option)
        if (!saved) return
        setEmail(saved.email)
        setToken(saved.token)
    }, [pricing])

    useEffect(() => {
        if (!cooldown) return
        const timer = setTimeout(() => setCooldown((value) => value - 1), 1000)
        return () => clearTimeout(timer)
    }, [cooldown])

    async function sendCode(event) {
        event?.preventDefault()
        setBusy("code")
        setError("")
        try {
            const data = await post("/internship/otp", { email })
            setCodeSent(true)
            setCode("")
            setNotice(data.message)
            setCooldown(60)
            setTimeout(() => codeInput.current?.focus(), 0)
        } catch (error) {
            setError(error.message)
        } finally {
            setBusy("")
        }
    }

    async function verifyCode(event) {
        event.preventDefault()
        setBusy("verify")
        setError("")
        try {
            const data = await post("/internship/otp/verify", { email, code })
            setToken(data.token)
            saveVerified({ email, token: data.token })
            setNotice("")
        } catch (error) {
            setError(error.message)
        } finally {
            setBusy("")
        }
    }

    function changeEmail() {
        saveVerified(null)
        setToken("")
        setCodeSent(false)
        setCode("")
        setNotice("")
        setError("")
    }

    async function pay(event) {
        event.preventDefault()
        const form = event.currentTarget
        setBusy("pay")
        setError("")
        try {
            const order = await post("/internship", {
                ...Object.fromEntries(new FormData(form)),
                email,
                email_token: token,
            })
            await loadCheckout()
            await new Promise((resolve, reject) => {
                const checkout = new window.Razorpay({
                    key: order.key,
                    order_id: order.order_id,
                    amount: order.amount,
                    currency: order.currency,
                    name: "Mud Beavers Sikkim",
                    description: order.description,
                    prefill: order.prefill,
                    theme: { color: "#964b00" },
                    handler: (response) =>
                        post("/internship/payment/verify", response).then((data) => {
                            saveVerified(null)
                            saveDraft(null)
                            setDone(data.message)
                            resolve()
                        }, reject),
                    modal: { ondismiss: () => reject(new Error("Payment was cancelled. You can try again when you're ready.")) },
                })
                checkout.on("payment.failed", (response) =>
                    setError(response.error?.description || "The payment failed. Please try again."),
                )
                checkout.open()
            })
        } catch (error) {
            if (error.status === 401) changeEmail()
            setError(error.message)
        } finally {
            setBusy("")
        }
    }

    if (done)
        return <div className="mb-intern-done" role="status"><i className="bi bi-check-circle" aria-hidden="true"></i><h4>You&apos;re enrolled.</h4><p>{done}</p><p>A receipt has been sent to <strong>{email}</strong>.</p></div>

    const category = pricing?.categories?.find((item) => item.id === background)
    const chosen = category && pricing.options.find((item) => item.id === option)
    const fee = chosen && category.prices[chosen.id]
    return <div className="mb-inquiry">
        <fieldset disabled={Boolean(busy)}><legend><span>01</span> Verify your email</legend>
            {token
                ? <p className="mb-intern-verified"><i className="bi bi-patch-check-fill" aria-hidden="true"></i> {email} <button type="button" onClick={changeEmail}>Change</button></p>
                : <>
                    <form className="mb-intern-otp" onSubmit={sendCode}>
                        <label htmlFor="intern-email">Email address<span className="mb-required" aria-hidden="true">*</span><input id="intern-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setCodeSent(false) }} placeholder="you@example.com" autoComplete="email" required maxLength={254} readOnly={codeSent} /></label>
                        {!codeSent && <button className="mb-btn mb-btn--primary" type="submit">{busy === "code" ? "Sending…" : "Send code"}</button>}
                    </form>
                    {codeSent && <form className="mb-intern-otp" onSubmit={verifyCode}>
                        <label htmlFor="intern-code">6-digit code<span className="mb-required" aria-hidden="true">*</span><input ref={codeInput} id="intern-code" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" title="Enter the 6-digit code from your email." required /></label>
                        <button className="mb-btn mb-btn--primary" type="submit">{busy === "verify" ? "Checking…" : "Verify"}</button>
                        <p className="mb-intern-otp__links">
                            <button type="button" onClick={() => sendCode()} disabled={cooldown > 0}>{cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}</button>
                            <button type="button" onClick={changeEmail}>Change email</button>
                        </p>
                    </form>}
                    {notice && <p className="mb-form-note" role="status">{notice}</p>}
                </>}
        </fieldset>
        {error && <p className="mb-intern-error" role="alert">{error}</p>}
        {token && <form onSubmit={pay} onChange={(event) => saveDraft(Object.fromEntries(new FormData(event.currentTarget)))}>
            <fieldset disabled={Boolean(busy)}><legend><span>02</span> Personal details</legend><div className="mb-inquiry__grid">{FIELDS.map(([name, label, type, placeholder, autoComplete]) => <label key={name} htmlFor={`intern-${name}`}>{label}<span className="mb-required" aria-hidden="true">*</span><input id={`intern-${name}`} name={name} type={type} defaultValue={draft[name] || ""} placeholder={placeholder} autoComplete={autoComplete} required maxLength={type === "date" ? undefined : 254} pattern={name === "phone" ? "[0-9]{7,15}" : name === "zip_code" ? "[0-9]{4,10}" : undefined} title={name === "phone" ? "Enter 7 to 15 digits, without spaces or symbols." : name === "zip_code" ? "Enter a numeric postal code." : undefined} /></label>)}</div></fieldset>
            <fieldset disabled={Boolean(busy)}><legend><span>03</span> Your background</legend><InternshipBackground categories={pricing?.categories} value={background} onChange={setBackground} institution={draft.institution} />
                {category && <div className="mb-intern-stay" role="radiogroup" aria-label="Fee option"><p>Choose an option<span className="mb-required" aria-hidden="true">*</span></p>{pricing.options.map(({ id, label, note }) => <label key={id} className={option === id ? "is-selected" : undefined}><input type="radio" name="fee_option" value={id} checked={option === id} onChange={() => setOption(id)} required /><span><strong>{label}</strong>{note && <small>{note}</small>}</span><b>{rupees(category.prices[id])}</b></label>)}</div>}
            </fieldset>
            <fieldset disabled={Boolean(busy)}><legend><span>04</span> Payment</legend>
                <div className="mb-intern-payment mb-intern-payment--online"><div><p>Training fee</p>{fee
                    ? <><strong>{rupees(fee)}</strong><p>{category.label} · {chosen.label}</p></>
                    : <p>Choose your background and an option above to see your fee.</p>}
                    <p>Pay securely with UPI, cards, net banking or wallets through Razorpay.</p></div></div>
                <button className="mb-btn mb-btn--primary" type="submit">{busy === "pay" ? "Opening payment…" : fee ? `Pay ${rupees(fee)}` : "Continue to payment"} <i className="bi bi-arrow-up-right" aria-hidden="true"></i></button>
                <p className="mb-form-note">After payment, our team will get in touch about your batch.</p>
            </fieldset>
        </form>}
    </div>
}
