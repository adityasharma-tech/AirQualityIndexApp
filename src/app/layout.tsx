import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Air Quality Index Measurement",
    template: "%s | AQI Monitor",
  },
  description:
    "Real-time air quality monitoring dashboard with interactive Google Maps visualization. Track CO₂ levels, temperature, humidity, and pressure using clustered sensor data and dynamic analytics charts.",
  keywords: [
    "Air Quality Index",
    "AQI Monitor",
    "CO2 Monitoring",
    "Environmental Sensors",
    "Temperature Monitoring",
    "Humidity Tracking",
    "Pressure Sensors",
    "Google Maps Visualization",
    "Environmental Dashboard",
  ],
  authors: [
    { name: "Aditya Sharma", url: "https://adityasharma.tech" },
    { name: "Aryan Srivastava" },
    { name: "Alok Upadhayay" },
    { name: "Vanshika Saraswat" },
    { name: "Sakshi Jaiswal" },
    { name: "Shambhavi Verma" },
  ],
  creator: "Your Name or Organization",
  metadataBase: new URL("https://air-evs.vercel.app"),
  openGraph: {
    title: "Air Quality Index Measurement Dashboard",
    description:
      "Interactive air quality dashboard with real-time CO₂, temperature, humidity, and pressure visualization on Google Maps.",
    url: "https://air-evs.vercel.app",
    siteName: "AQI Monitor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Quality Index Measurement Dashboard",
    description:
      "Monitor real-time air quality metrics with interactive clustering and visual analytics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
