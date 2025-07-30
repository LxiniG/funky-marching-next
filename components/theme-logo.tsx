"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function ThemeLogo() {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Link href="/" style={{ display: 'inline-block' }}>
                <Image
                    src="/logo-with-music-school.png"
                    alt="FMB Band Logo"
                    width={500}
                    height={250}
                    style={{
                        objectFit: "contain",
                        width: "min(120vw, 800px)",
                        height: "auto",
                        maxWidth: "100%",
                        transition: "width 0.2s"
                    }}
                    priority
                />
            </Link>
        )
    }

    const logoSrc = resolvedTheme === 'dark'
        ? "/logo-with-music-school.png"
        : "/logo-with-music-school-white.png"

    return (
        <Link href="/" style={{ display: 'inline-block' }}>
            <Image
                src={logoSrc}
                alt="FMB Band Logo"
                width={500}
                height={250}
                style={{
                    objectFit: "contain",
                    width: "min(120vw, 800px)",
                    height: "auto",
                    maxWidth: "100%",
                    transition: "width 0.2s"
                }}
                priority
            />
        </Link>
    )
}
