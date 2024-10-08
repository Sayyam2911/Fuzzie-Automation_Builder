import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import React from "react";
import ModalProvider from "@/providers/modal-provider";
import {Toaster} from "@/components/ui/sonner";

require('dotenv').config({ path: './.env' });

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Fuzzie",
    description: "Automate Your Workflows With Fuzzie",
};
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {

    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <html lang="en">
            <body className={font.className}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <ModalProvider>
                    {children}
                    <Toaster/>
                </ModalProvider>
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}