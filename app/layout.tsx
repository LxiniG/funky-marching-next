import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // We\'ll replace Inter with Bricolage Grotesque
import { ThemeLogo } from "@/components/theme-logo";
import localFont from "next/font/local";
import { ThemeProvider } from "../components/theme-provider";
import Navigation from "./components/Navigation";
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
    <html lang="de" suppressHydrationWarning>
      <body className={`${bricolage.className} ${bricolage.variable}`}> {/* Apply the font class and variable */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="band-header">
            {/* Uncomment if you want to show the theme switch on the top right. */}
            <div className="header-top">
              <ThemeLogo />
              {/* <ThemeToggle /> */}
            </div>

            <Navigation></Navigation>
          </header>
          <main>
            {children}
          </main>
          <footer className="footer">
            <p>© 2025 Funky Marching Band | Made with ❤️ by Linus</p>
          </footer>
        </ThemeProvider>
      </body>

    </html >
  );
}
