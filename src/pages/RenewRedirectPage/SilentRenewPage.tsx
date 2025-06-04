// src/pages/SilentRenew.tsx
import { useEffect } from "react"
import { userManager } from "../../app/services/auth.service"

export default function SilentRenewPage() {
    useEffect(() => {
        userManager.signinSilentCallback().catch((err) => {
            console.error("Silent renew error:", err)
        })
    }, [])

    return null
}
