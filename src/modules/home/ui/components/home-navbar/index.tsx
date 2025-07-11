"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon, SearchIcon, XIcon } from "lucide-react";
import { ResponsiveModal } from "@/components/responsive-modal";
import { StudioUploader } from "@/modules/studio/ui/components/studio-uploader";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export const HomeNavbar = () => {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [showSearch, setShowSearch] = useState(false);
    const utils = trpc.useUtils();

    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("Video created");
            utils.studio.getMany.invalidate();
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    const onSuccess = () => {
        if (!create.data?.video.id) return;
        create.reset();
        router.push(`/studio/videos/${create.data.video.id}`);
    }

    return (
        <>
            {/* NAVIGATION BAR */}
            <nav className="fixed top-0 left-0 right-0 h-16 bg-background flex items-center px-2 pr-5 z-50 border-b border-border">
                <div className="flex items-center justify-between w-full">
                    {/* Left: Sidebar + Logo */}
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <Link prefetch href="/" className="">
                            <div className="p-4 flex items-center gap-1">
                                <h1 className="text-3xl font-bold">
                                    <span className="text-yellow-500">MOVIE</span>HUB
                                </h1>
                            </div>
                        </Link>
                    </div>

                    {/* Right: Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Search Toggle (Button) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setShowSearch(prev => !prev)}
                        >
                            {showSearch ? <XIcon className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
                        </Button>

                        {/* Desktop Search Input */}
                        <div className="hidden md:flex max-w-[720px] mx-auto w-full">
                            <SearchInput />
                        </div>

                        {/* Upload Video */}
                        <ResponsiveModal
                            title="Upload a video"
                            open={!!create.data?.url}
                            onOpenChange={() => create.reset()}
                        >
                            {create.data?.url
                                ? <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
                                : <Loader2Icon />
                            }
                        </ResponsiveModal>

                        {isLoaded && user && (
                            <Button
                                variant="secondary"
                                onClick={() => create.mutate()}
                                disabled={create.isPending}
                                className="hidden md:flex items-center gap-2"
                            >
                                {create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
                                Create
                            </Button>
                        )}

                        <ThemeToggle />
                        {isLoaded && user && <AuthButton />}
                    </div>
                </div>
            </nav>

            {/* Mobile Search Input (shown below nav when open) */}
            {showSearch && (
                <div className="md:hidden mt-16 px-4 -mb-16">
                    <SearchInput />
                </div>
            )}
        </>
    );
};
