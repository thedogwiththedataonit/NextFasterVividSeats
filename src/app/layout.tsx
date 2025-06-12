import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buy and Sell Tickets: Concerts, Sports & Theater | Vivid Seats",
  description: "Online ticket marketplace where fans can buy and sell tickets to sports, concerts, and theater events nationwide.",
  keywords: "concert tickets, sports tickets, theater tickets, vivid seats, ticket marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
