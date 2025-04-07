import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./Auth/Components/auth";
import Providers from "./redux/Providers";
// import ChildComponent from "./main/Components/ChildComponent";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WorkSpace",
  description: "easy way to manage your work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>
        <AuthContextProvider>
          {/* <ChildComponent /> */}
          <Providers>{children}</Providers>
          {/* {children} */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
