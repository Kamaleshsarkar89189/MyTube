"use client";

import Link from "next/link";

export const Footer = () => {
    return (
        <>
            <footer className="bg-muted text-foreground border-t border-border py-8 px-4">
                <div className="max-w-5xl mx-auto text-center space-y-4">
                    <h1 className="text-3xl font-bold">
                        <span className="text-yellow-500">MOVIE</span>HUB
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Copyright © 2025. Created by <span className="text-red-500">❤️</span> MovieHub Team
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
                        <Link href="/contact" className="hover:underline">Contact Us</Link>
                        <Link href="/request" className="hover:underline">Request Us</Link>
                        <Link href="/dmca" className="hover:underline">DMCA</Link>
                        <Link href="/about" className="hover:underline">About Us</Link>
                    </div>

                    <div className="mt-6">
                        <Link href="/membership"
                            className="inline-block px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
                                border border-yellow-500 text-yellow-500
                                hover:bg-yellow-500 hover:text-black
                                dark:hover:text-white dark:hover:bg-yellow-600"
                        >
                            Become a Member of our Team
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
};
