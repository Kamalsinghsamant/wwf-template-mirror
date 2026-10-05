import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { openSans, wwfFont } from "@/lib/fonts";

export const metadata = {
  title: "Support WWF-India | Official Donation Platform",
  description:
    "Help us create a brighter future for nature & humans. Donate now to WWF-India. Contributions are 50% Tax Exempt under Section 80G.",
  keywords: [
    "WWF India",
    "Donate WWF",
    "Save Tigers",
    "Snow Leopard",
    "Wildlife Extinction",
    "Climate Change India",
    "Workplace Giving",
    "Section 80G Tax Exemption",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${openSans.variable} ${wwfFont.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="font-sans antialiased text-wwf-black bg-white flex flex-col min-h-screen">
        {/* Skip to Content for WCAG 2.2 AA Keyboard Accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Global Accessible Header */}
        <Header />

        {/* Main Content Surface */}
        <main id="main-content" className="flex-grow focus:outline-none">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
