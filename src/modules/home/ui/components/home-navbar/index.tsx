"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { ResponsiveModal } from "@/components/responsive-modal";
import { StudioUploader } from "@/modules/studio/ui/components/studio-uploader";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useUser } from "@clerk/nextjs";

export const HomeNavbar = () => {

    const router = useRouter();
    const { user, isLoaded } = useUser();
    const utils = trpc.useUtils();
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("Video created")
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
        <nav className="fixed top-0 left-0 right-0 h-16 bg-muted flex items-center px-2 pr-5 z-50">
            <div className="flex items-center gap-4 w-full">
                {/* Menu and logo */}
                <div className="flex items-center flex-shrink-0">
                    <SidebarTrigger />
                    <Link prefetch href="/" className="hidden md:block">
                        <div className="p-4 flex items-center gap-1">
                            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                            <p className="text-xl font-semibold tracking-tight text-foreground">MyTube</p>
                        </div>
                    </Link>
                </div>
                {/* Search bar */}
                <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
                    <SearchInput />
                </div>
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
                <div className="flex-shrink-0 items-center flex gap-4">
                    <ThemeToggle />
                    <AuthButton />
                </div>
            </div>
        </nav>
    );
};