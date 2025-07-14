"use client";

import Link from "next/link";
import { FlameIcon, HistoryIcon, ListVideoIcon, LogInIcon, MenuIcon, PlaySquareIcon, ThumbsUpIcon, UserPlusIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SubscriptionsSection } from "@/modules/home/ui/components/home-sidebar/subscriptions-section";
import { SignedIn, useUser } from "@clerk/nextjs";

export const MobileSidebarMenu = () => {
    const { isSignedIn } = useUser();
    const [open, setOpen] = useState(false);
    
    const handleClose = () => setOpen(false);

    return (
        <div className="block md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MenuIcon className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="w-[260px] sm:w-[300px] p-4 bg-background text-foreground"
                >
                    {!isSignedIn && (
                        <div className="flex items-center justify-start gap-4 mt-6 mb-4">
                            <Link
                                href="/sign-in"
                                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
                                onClick={handleClose}
                            >
                                <LogInIcon className="w-4 h-4" />
                                Login
                            </Link>
                            <Link
                                href="/sign-up"
                                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
                                onClick={handleClose}
                            >
                                <UserPlusIcon className="w-4 h-4" />
                                Sign Up
                            </Link>
                        </div>
                    )}
                    <nav className="flex flex-col gap-4 mt-6 text-sm font-medium">
                        <Link href="/" className="font-semibold" onClick={handleClose}>HOME</Link>
                        <Link href="/?categoryId=c4459e46-d2c9-4c6c-a878-922b3db79662" onClick={handleClose}>Bollywood</Link>
                        <Link href="/?categoryId=6ef6af5b-ba7c-42d2-a7fa-ae5daa8a755e" onClick={handleClose}>Hollywood</Link>
                        <Link href="/?categoryId=3d430af7-6cc7-4c11-ba5d-8fb9f9a67b4e" onClick={handleClose} className="flex items-center gap-2">
                            <span>🎧</span> Dual Audio
                        </Link>
                        <Link href="/?categoryId=74fcebb6-dc84-4464-a742-ceb73acd9d83" onClick={handleClose}>Anime</Link>
                        <Link href="/?categoryId=02cf64dc-4a4f-4f58-ae21-af40cf4efbba" onClick={handleClose}>Web Series</Link>
                        <Link href="/?categoryId=0582ae98-c136-42e9-a84a-337fe44943df" onClick={handleClose} className="flex items-center gap-2">
                            <span>🖥️</span> TV Shows
                        </Link>
                        <hr />

                        <Link href="/feed/subscriptions" onClick={handleClose} className="flex items-center gap-2">
                            <span><PlaySquareIcon className="h-4 w-4" /></span>
                            Subscriptions
                        </Link>
                        <Link href="/feed/trending" onClick={handleClose} className="flex items-center gap-2">
                            <span><FlameIcon className="h-4 w-4" /></span>
                            Trending
                        </Link>
                        <hr />
                        <Link href="/playlists/history" onClick={handleClose} className="flex items-center gap-2">
                            <span><HistoryIcon className="h-4 w-4" /></span>
                            History
                        </Link>
                        <Link href="/playlists/liked" onClick={handleClose} className="flex items-center gap-2">
                            <span><ThumbsUpIcon className="h-4 w-4" /></span>
                            Liked videos
                        </Link>
                        <Link href="/playlists" onClick={handleClose} className="flex items-center gap-2">
                            <span><ListVideoIcon className="h-4 w-4" /></span>
                            All playlists
                        </Link>
                        <hr />
                        <Link href="/subscriptions" onClick={handleClose}>
                        <SignedIn>
                            <>
                                <SubscriptionsSection />
                            </>
                        </SignedIn>
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
};
