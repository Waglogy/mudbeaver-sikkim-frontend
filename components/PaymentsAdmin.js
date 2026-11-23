"use client"

import { useCallback, useEffect, useState } from "react"
import { adminRequest as request } from "@/lib/adminApi"
import { BACKGROUNDS, rupees } from "@/components/InternshipBackground"
import { buildXlsx, downloadBlob } from "@/lib/xlsx"

// Admin: internship payments made through Razorpay, with Excel export

const STATUS_LABELS = { paid: "Paid", pending: "Pending" }
const backgroundLabel = (value) => BACKGROUNDS.find((b) => b.value === value)?.label || value

const dateTime = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
})
const formatDate = (value) => (value ? dateTime.format(new Date(value)) : "")

export default function PaymentsAdmin({ onUnauthorized }) {
    const [items, setItems] = useState(null)
    const [search, setSearch] = useState("")
    const [payment, setPayment] = useState("paid")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [error, setError] = useState("")

    const load = useCallback(
        async (filters) => {
            setError("")
            try {
                const params = new URLSearchParams(
                    Object.entries(filters).filter(([, value]) => value),
                )
                setItems(await request(`/payments${params.size ? `?${params}` : ""}`))
            } catch (error) {
                setError(error.message)
                if (error.status === 401) onUnauthorized?.(error)
            }
        },
        [onUnauthorized],
    )

    // Reload when a filter changes, and shortly after typing stops
    useEffect(() => {
        const timer = setTimeout(() => load({ search: search.trim(), payment, from, to }), 300)
        return () => clearTimeout(timer)
    }, [search, payment, from, to, load])

    const paid = items?.filter((item) => item.payment_status === "paid") || []
    const pending = items?.filter((item) => item.payment_status === "pending") || []
    const collected = paid.reduce((sum, item) => sum + (item.amount || 0), 0)

    function exportExcel() {
        const rows = [
            ["Paid on", "Applied on", "Name", "Email", "Phone", "City", "State", "Background", "Institute", "Amount (₹)", "Status", "Razorpay payment ID", "Razorpay order ID"],
            ...items.map((item) => [
                formatDate(item.paid_at),
                formatDate(item.created_at),
                item.name,
                item.email,
                item.phone,
                item.city,
                item.region,
                backgroundLabel(item.background),
                item.institution || "",
                item.amount ?? "",
                STATUS_LABELS[item.payment_status] || item.payment_status,
                item.razorpay_payment_id || "",
                item.razorpay_order_id || "",
            ]),
            [],
            ["Total collected", "", "", "", "", "", "", "", "", collected, `${paid.length} paid`],
        ]
        const stamp = new Date().toISOString().slice(0, 10)
        downloadBlob(
            buildXlsx("Payments", rows, [20, 20, 24, 30, 14, 14, 14, 26, 30, 12, 10, 22, 24]),
            `mudbeavers-payments-${stamp}.xlsx`,
        )
    }

    const filtered = search || from || to || payment
    return (
        <>
            <div className="mb-admin__intro">
                <div>
                    <p className="mb-admin__eyebrow">TRAINING CUM INTERNSHIP</p>
                    <h1>Payments.</h1>
                    <p>
                        Internship fees paid online through Razorpay. Pending
                        means the applicant opened the payment but it was not
                        confirmed; check those in your Razorpay dashboard.
                    </p>
                </div>
                <button disabled={!items?.length} onClick={exportExcel}>
                    <i className="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i>{" "}
                    Export to Excel
                </button>
            </div>

            <div className="mb-admin__pay-summary">
                <div>
                    <span>Collected</span>
                    <strong>{items ? rupees(collected) : "…"}</strong>
                </div>
                <div>
                    <span>Paid</span>
                    <strong>{items ? paid.length : "…"}</strong>
                </div>
                <div>
                    <span>Pending</span>
                    <strong>{items ? pending.length : "…"}</strong>
                </div>
            </div>

            <div className="mb-admin__filters mb-admin__pay-filters">
                <label>
                    <span className="mb-admin__sr">Search payments</span>
                    <input
                        type="search"
                        placeholder="Search name, email, phone, payment ID…"
                        value={search}
                        maxLength={120}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </label>
                <label>
                    <span className="mb-admin__sr">Payment status</span>
                    <select value={payment} onChange={(event) => setPayment(event.target.value)}>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="">Paid and pending</option>
                    </select>
                </label>
                <label>
                    From
                    <input type="date" value={from} max={to || undefined} onChange={(event) => setFrom(event.target.value)} />
                </label>
                <label>
                    To
                    <input type="date" value={to} min={from || undefined} onChange={(event) => setTo(event.target.value)} />
                </label>
            </div>

            {error && (
                <p className="mb-admin__error" role="alert">
                    {error}{" "}
                    <button
                        className="mb-admin__secondary"
                        onClick={() => load({ search: search.trim(), payment, from, to })}
                    >
                        Try again
                    </button>
                </p>
            )}

            {items && !items.length && !error ? (
                <div className="mb-admin__empty">
                    <h2>{filtered ? "No matching payments." : "No payments yet."}</h2>
                    <p>{filtered ? "Try a different search, status or date range." : "Online internship payments will appear here."}</p>
                </div>
            ) : (
                <div className="mb-admin__table-wrap">
                    <table className="mb-admin__table">
                        <caption className="mb-admin__sr">Internship payments</caption>
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Applicant</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Background</th>
                                <th scope="col" className="is-num">Amount</th>
                                <th scope="col">Status</th>
                                <th scope="col">Razorpay IDs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items?.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {formatDate(item.paid_at || item.created_at)}
                                        {!item.paid_at && <small>Applied</small>}
                                    </td>
                                    <td>
                                        <strong>{item.name}</strong>
                                        <a href={`mailto:${item.email}`}>{item.email}</a>
                                    </td>
                                    <td>
                                        <a href={`tel:${item.phone}`}>{item.phone}</a>
                                    </td>
                                    <td>
                                        {backgroundLabel(item.background)}
                                        {item.institution && <small>{item.institution}</small>}
                                    </td>
                                    <td className="is-num">{item.amount != null ? rupees(item.amount) : "—"}</td>
                                    <td>
                                        <span className={`mb-admin__badge is-pay-${item.payment_status}`}>
                                            {STATUS_LABELS[item.payment_status]}
                                        </span>
                                    </td>
                                    <td className="mb-admin__ids">
                                        {item.razorpay_payment_id && <code>{item.razorpay_payment_id}</code>}
                                        <code>{item.razorpay_order_id}</code>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {items?.length === 5000 && (
                        <p className="mb-admin__table-note">Showing the latest 5,000 payments. Narrow the date range to see older ones.</p>
                    )}
                </div>
            )}
        </>
    )
}
