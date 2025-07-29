"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
    { href: "/", label: "Über uns" },
    { href: "/gigs", label: "Gigs" },
    { href: "/cast", label: "Besetzung" },
    { href: "/band-leader", label: "Bandleader" },
    { href: "/gallery", label: "Galerie" },
    { href: "/contact", label: "Kontakt" },
    { href: "/impressum", label: "Impressum" },

];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="tab-bar">
            {navigationLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={pathname === link.href ? "active" : ""}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}
