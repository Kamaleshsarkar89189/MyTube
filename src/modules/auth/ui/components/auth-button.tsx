"use client";

import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClapperboardIcon, ListIcon, UserCircleIcon, UserIcon } from "lucide-react"

export const AuthButton = () => {
    return (
        <>
            <SignedIn>
                {/* If you want to customize more.. */}
                {/* <Button asChild variant="secondary">
                    <Link prefetch  href="/studio">
                        <ClapperboardIcon />
                        Studio
                    </Link>
                </Button> */}
                {/* <ThemeToggle /> */}
                <UserButton>
                    <UserButton.MenuItems>
                        {/* Add menu item for Studio and User profile */}
                        <UserButton.Link
                            label="My profile"
                            href="/users/current"
                            labelIcon={<ClapperboardIcon className="size-4" />}
                        />
                        <UserButton.Link
                            label="Studio"
                            href="/studio"
                            labelIcon={<UserIcon className="size-4" />}
                        />
                        <UserButton.Link
                            label="All subscriptions"
                            href="/subscriptions"
                            labelIcon={<ListIcon className="size-4" />}
                        />
                        <UserButton.Action label="manageAccount" />
                    </UserButton.MenuItems>
                </UserButton>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button
                        variant="outline"
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
                    >
                        <UserCircleIcon />
                        {/* Sign in */}
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    )
}