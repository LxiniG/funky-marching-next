import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // We\'ll replace Inter with Bricolage Grotesque
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] }); // Remove or comment out Inter

// Load the Bricolage Grotesque font
const bricolage = localFont({
  src: [
    {
      path: "./fonts/bricolage-grotesque/BricolageGrotesque_24pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/bricolage-grotesque/BricolageGrotesque_24pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    // You can add more font files here for other weights and styles
    // Example for Medium weight:
    // {
    //   path: "./fonts/bricolage-grotesque/BricolageGrotesque_24pt-Medium.ttf",
    //   weight: "500",
    //   style: "normal",
    // },
  ],
  variable: "--font-bricolage", // Optional: for using as a CSS variable
});

export const metadata: Metadata = {
  title: "Funky Marching Band Freiburg",
  description: "Seite der Funky Marching Band Freiburg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${bricolage.className} ${bricolage.variable}`}> {/* Apply the font class and variable */}
        <header className="band-header">
          <Link href="/" style={{ display: 'inline-block' }}>
            <Image
              src="/logo-with-music-school.png"
              alt="FMB Band Logo"
              width={500}
              height={250}
              style={{ objectFit: "contain", width: "min(120vw, 800px)", height: "auto", maxWidth: "100%", transition: "width 0.2s" }}
              priority
            />
          </Link>

          <nav className="tab-bar">
            <Link href="/gigs">Gigs</Link>
            <Link href="/cast">Besetzung</Link>
            <Link href="/band-leader">Bandleader</Link>
            <Link href="/gallery">Galerie</Link>
            <Link href="/contact">Kontakt</Link>
            <Link href="/impressum">Impressum</Link>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer className="footer">
          <p>© 2025 Funky Marching Band | Made with ❤️ by Linus</p>
        </footer>
      </body>

    </html >
  );
}
