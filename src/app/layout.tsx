import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import React from "react";

require('dotenv').config({ path: './.env.local' });


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
        <ClerkProvider publishableKey={"pk_test_dW5jb21tb24tbXVzdGFuZy01LmNsZXJrLmFjY291bnRzLmRldiQ"}>
            <html lang="en">
            <body className={font.className}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}