const configured = process.env.SITE_URL || "https://mudbeaversikkim.in"
const url = new URL(configured)
if (!["https:", "http:"].includes(url.protocol)) throw new Error("SITE_URL must be an http or https website address.")
export const SITE_URL = url.origin
export const BRAND = "Mud Beavers Sikkim"
export const absoluteUrl = path => new URL(path, `${SITE_URL}/`).toString()
export const jsonLd = data => JSON.stringify(data).replace(/</g, "\\u003c")
