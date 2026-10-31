"use client"

import { openRequirements } from "@/components/RequirementsModal"

// Button that opens the requirements form popup
export default function OpenRequirementsButton({ className, children }) {
    return (
        <button
            type="button"
            className={className}
            onClick={openRequirements}
            aria-haspopup="dialog"
        >
            {children}
        </button>
    )
}
