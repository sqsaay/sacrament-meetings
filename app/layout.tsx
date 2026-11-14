import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "The application helps bishoprics and branch leaders plan and review meeting agendas. It also allows members to view and print current and past programs. The application tracks announcements, prayers, ward business, hymns, musical numbers, and speakers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body>
        <div className="site-shell">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}