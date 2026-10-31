"use client"

import { useRef, useState } from "react"
import ApiForm from "@/components/ApiForm"
import FileDrop from "@/components/FileDrop"

// Project enquiry form as a 3-step guided wizard, with the animated beaver as a guide.
// Field names, labels and hints are unchanged; shown inside RequirementsModal.

const STEPS = [
    {
        title: "About you",
        intro: "Hello! 👋 Let's start with a little about you.",
    },
    {
        title: "Your project",
        intro: "Now the fun part — tell me about your project! 🏡",
    },
    {
        title: "Final details",
        intro: "Almost done! Anything else I should know?",
    },
]

// What the beaver says while each field is being filled in
const TIPS = {
    "req-name": "Hi there! What should we call you?",
    "req-email": "We'll use this to share details about your estimate.",
    "req-address": "Where are you based?",
    "req-phone": "Our team will call you to brief you on your project. 📞",
    "req-site": "Is your land flat or sloped? Soft or hard ground?",
    "req-category":
        "Cottage, homestay, farmhouse, resort… what are we building?",
    "req-area": "Roughly how big? Just the number in Sq.Ft.",
    "req-budget": "A rough budget in ₹ — just the number — helps us plan.",
    "req-services":
        "Design, consultancy, construction — or the full turnkey job?",
    "req-drawings": "Have architectural drawings? Attach them as a PDF.",
    "req-message": "Dreams, timelines, ideas — tell me everything! ✍️",
}

const LAST = STEPS.length - 1

function Field({ id, label, icon, wide, hint, children }) {
    return (
        <div className={`mb-field${wide ? " mb-field--wide" : ""}`}>
            <label htmlFor={id} className="mb-field__label">
                <i className={`fas ${icon}`} aria-hidden="true"></i>
                {label}
            </label>
            {children}
            {hint && (
                <small id={`${id}-hint`} className="mb-field__hint">
                    {hint}
                </small>
            )}
        </div>
    )
}

export default function RequirementsForm({ onDone, onClose }) {
    const [step, setStep] = useState(0)
    const [tip, setTip] = useState(STEPS[0].intro)
    const [doneMessage, setDoneMessage] = useState("")
    const steps = useRef([])
    const headings = useRef([])

    const goTo = (index) => {
        setStep(index)
        setTip(STEPS[index].intro)
        // Move focus to the new step's heading (keeps the step intro tip showing)
        requestAnimationFrame(() =>
            headings.current[index]?.focus({ preventScroll: true }),
        )
    }

    // Check only the fields on the current step before moving on
    const validStep = (index) => {
        for (const field of steps.current[index].querySelectorAll(
            "input, textarea",
        )) {
            if (!field.checkValidity()) {
                field.reportValidity()
                return false
            }
        }
        return true
    }

    const next = () => validStep(step) && goTo(step + 1)

    // Enter in a text field moves to the next step instead of submitting early
    const onKeyDown = (event) => {
        if (
            event.key === "Enter" &&
            event.target.tagName === "INPUT" &&
            step < LAST
        ) {
            event.preventDefault()
            next()
        }
    }

    const onFocus = (event) => {
        const fieldTip = TIPS[event.target.id]
        if (fieldTip) setTip(fieldTip)
    }

    const onResult = (ok, message) => {
        if (ok) {
            setDoneMessage(message)
            setTip("Thank you! Talk to you soon. 🌱")
            onDone?.()
        } else {
            setTip(`Hmm, something's not right: ${message}`)
        }
    }

    const stepState = (index) => {
        if (doneMessage || index < step) return "is-done"
        return index === step ? "is-active" : ""
    }

    return (
        <div className="mb-wizard">
            <aside className="mb-wizard__aside">
                <span className="mb-wizard__bar" aria-hidden="true"></span>
                <h2 id="mb-modal-title" className="mb-wizard__title">
                    LET'S BE SPECIFIC ABOUT YOUR REQUIREMENTS
                </h2>
                <ol className="mb-wizard__steps">
                    {STEPS.map(({ title }, index) => (
                        <li
                            key={title}
                            className={stepState(index)}
                            aria-current={
                                index === step && !doneMessage
                                    ? "step"
                                    : undefined
                            }
                        >
                            <span className="mb-wizard__dot">
                                {stepState(index) === "is-done" ? (
                                    <i
                                        className="fas fa-check"
                                        aria-hidden="true"
                                    ></i>
                                ) : (
                                    index + 1
                                )}
                            </span>
                            <span className="mb-wizard__step-title">
                                {title}
                            </span>
                        </li>
                    ))}
                </ol>
                <div className="mb-guide" aria-live="polite">
                    <p className="mb-guide__bubble" key={tip}>
                        {tip}
                    </p>
                    <img
                        className="mb-guide__beaver"
                        src="/img/beaver/beaver-talker.webp"
                        alt=""
                        width="216"
                        height="240"
                    />
                </div>
            </aside>

            <div className="mb-wizard__main">
                {doneMessage ? (
                    <div className="mb-wizard__done">
                        {/* The builder beaver, ready to get started */}
                        <span
                            className="mb-wizard__done-art"
                            aria-hidden="true"
                        >
                            <img
                                src="/img/beaver/beaver-builder.webp"
                                alt=""
                                width="144"
                                height="240"
                            />
                            <span className="mb-wizard__done-check">
                                <i className="fas fa-check"></i>
                            </span>
                        </span>
                        <h3>{doneMessage}</h3>
                        <p>
                            A dedicated member of our team will get in touch
                            with you to brief and help you prepare an actual
                            estimation of your project.
                        </p>
                        <button
                            type="button"
                            className="mb-btn mb-btn--primary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <ApiForm
                        action="/requirements"
                        method="post"
                        className="mb-req__form"
                        onResult={onResult}
                        onKeyDown={onKeyDown}
                        onFocus={onFocus}
                    >
                        <p className="mb-wizard__count">
                            Step {step + 1} of {STEPS.length}
                        </p>

                        <fieldset
                            hidden={step !== 0}
                            ref={(el) => (steps.current[0] = el)}
                        >
                            <legend
                                className="mb-wizard__legend"
                                tabIndex={-1}
                                ref={(el) => (headings.current[0] = el)}
                            >
                                {STEPS[0].title}
                            </legend>
                            <div className="mb-req__fields">
                                <Field
                                    id="req-name"
                                    label="Name"
                                    icon="fa-user"
                                >
                                    <input
                                        type="name"
                                        className="mb-input"
                                        id="req-name"
                                        placeholder="Name"
                                        name="username"
                                        required
                                    />
                                </Field>
                                <Field
                                    id="req-email"
                                    label="Email"
                                    icon="fa-envelope"
                                >
                                    <input
                                        type="email"
                                        className="mb-input"
                                        id="req-email"
                                        placeholder="Email"
                                        name="email"
                                        required
                                    />
                                </Field>
                                <Field
                                    id="req-address"
                                    label="Address"
                                    icon="fa-map-marker-alt"
                                >
                                    <input
                                        type="text"
                                        className="mb-input"
                                        id="req-address"
                                        placeholder="Address"
                                        name="address"
                                        required
                                    />
                                </Field>
                                <Field
                                    id="req-phone"
                                    label="Phone No"
                                    icon="fa-phone-alt"
                                >
                                    <input
                                        type="number"
                                        className="mb-input"
                                        id="req-phone"
                                        placeholder="Phone No"
                                        name="phone"
                                        required
                                    />
                                </Field>
                            </div>
                        </fieldset>

                        <fieldset
                            hidden={step !== 1}
                            ref={(el) => (steps.current[1] = el)}
                        >
                            <legend
                                className="mb-wizard__legend"
                                tabIndex={-1}
                                ref={(el) => (headings.current[1] = el)}
                            >
                                {STEPS[1].title}
                            </legend>
                            <div className="mb-req__fields">
                                <Field
                                    id="req-site"
                                    label="SITE DETAILS"
                                    icon="fa-mountain"
                                    hint="Ex: FLAT LAND, SLOPED LAND, SOFT SURFACE, HARD SURFACE"
                                >
                                    <input
                                        type="text"
                                        className="mb-input"
                                        id="req-site"
                                        aria-describedby="req-site-hint"
                                        name="site_details"
                                        required
                                    />
                                </Field>
                                <Field
                                    id="req-category"
                                    label="CATEGORY"
                                    icon="fa-home"
                                    hint="Ex: COTTAGE, HOMESTAY, FARMHOUSE, RESORTS, OTHERS"
                                >
                                    <input
                                        type="text"
                                        className="mb-input"
                                        id="req-category"
                                        aria-describedby="req-category-hint"
                                        name="category"
                                        required
                                    />
                                </Field>
                                <Field
                                    id="req-area"
                                    label="BUILTUP AREA"
                                    icon="fa-ruler-combined"
                                    hint="Ex: 500-1000 Sq.Ft, 1000-2000 Sq.Ft, 1000-2000 Sq.Ft, 5000+ Sq.Ft"
                                >
                                    <input
                                        type="number"
                                        className="mb-input"
                                        id="req-area"
                                        aria-describedby="req-area-hint"
                                        name="area"
                                        required
                                    />
                                </Field>
                                <Field
                                    id="req-budget"
                                    label="PROJECT BUDGET"
                                    icon="fa-rupee-sign"
                                    hint="Ex: 15-20 LAKH, 20-50 LAKH, 50-90 LAKH, 1.CR PLUS"
                                >
                                    <input
                                        type="number"
                                        className="mb-input"
                                        id="req-budget"
                                        aria-describedby="req-budget-hint"
                                        name="budget"
                                        required
                                    />
                                </Field>
                                <Field
                                    id="req-services"
                                    label="SERVICES REQUIRED"
                                    icon="fa-tools"
                                    wide
                                    hint="Ex: DESIGN, CONSULTANCY, CONSTRUCTION, TURNKEY"
                                >
                                    <input
                                        type="text"
                                        className="mb-input"
                                        id="req-services"
                                        aria-describedby="req-services-hint"
                                        name="services"
                                        required
                                    />
                                </Field>
                            </div>
                        </fieldset>

                        <fieldset
                            hidden={step !== 2}
                            ref={(el) => (steps.current[2] = el)}
                        >
                            <legend
                                className="mb-wizard__legend"
                                tabIndex={-1}
                                ref={(el) => (headings.current[2] = el)}
                            >
                                {STEPS[2].title}
                            </legend>
                            <div className="mb-req__fields">
                                <div className="mb-field mb-field--wide">
                                    <p
                                        className="mb-field__label"
                                        id="req-drawings-label"
                                    >
                                        <i
                                            className="fas fa-file-pdf"
                                            aria-hidden="true"
                                        ></i>
                                        PLEASE ATTACH ARCHITECTURAL DRAWINGS FOR
                                        THE PROJECT
                                    </p>
                                    <FileDrop
                                        id="req-drawings"
                                        accept=".pdf"
                                        labelledBy="req-drawings-label"
                                    />
                                </div>
                                <Field
                                    id="req-message"
                                    label="GIVE DETAILED DESCRIPTION IN MESSAGE BOX"
                                    icon="fa-comment-dots"
                                    wide
                                >
                                    <textarea
                                        className="mb-input"
                                        id="req-message"
                                        placeholder="Information About Your Project"
                                        name="message"
                                        rows="5"
                                        required
                                    ></textarea>
                                </Field>
                            </div>
                        </fieldset>

                        <div className="mb-wizard__nav">
                            {step > 0 && (
                                <button
                                    type="button"
                                    className="mb-btn mb-btn--outline"
                                    onClick={() => goTo(step - 1)}
                                >
                                    <i
                                        className="bi bi-arrow-left"
                                        aria-hidden="true"
                                    ></i>
                                    Back
                                </button>
                            )}
                            {step < LAST ? (
                                <button
                                    type="button"
                                    className="mb-btn mb-btn--primary mb-wizard__next"
                                    onClick={next}
                                >
                                    Next
                                    <i
                                        className="bi bi-arrow-right"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="mb-btn mb-btn--primary mb-wizard__next"
                                >
                                    Submit
                                    <i
                                        className="bi bi-arrow-right"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            )}
                        </div>
                    </ApiForm>
                )}
            </div>
        </div>
    )
}
