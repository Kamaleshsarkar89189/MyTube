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
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { MobileSidebarMenu } from "@/components/MobileSidebarMenu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const categories = [
    {
        name: "🎧 Dual Audio",
        href: "/?categoryId=3d430af7-6cc7-4c11-ba5d-8fb9f9a67b4e",
    },
    {
        name: "Anime",
        href: "/?categoryId=74fcebb6-dc84-4464-a742-ceb73acd9d83",
    },
    {
        name: "Web Series",
        href: "/?categoryId=02cf64dc-4a4f-4f58-ae21-af40cf4efbba",
    },
    {
        name: "🖥️ TV Shows",
        href: "/?categoryId=0582ae98-c136-42e9-a84a-337fe44943df",
    },
];

export const HomeNavbar = () => {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [showSearch, setShowSearch] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const utils = trpc.useUtils();
    const isAdmin = user?.publicMetadata?.role === "admin";

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

    // ✅ Scroll to top and focus input when search is opened on mobile
    useEffect(() => {
        if (showSearch) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100); // Wait for scroll
        }
    }, [showSearch]);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const [visibleCount, setVisibleCount] = useState(categories.length);

    // Adjust visible categories based on screen size
    useEffect(() => {
        const updateVisible = () => {
            if (window.innerWidth >= 1280) {
                setVisibleCount(categories.length); // xl
            } else if (window.innerWidth >= 1024) {
                setVisibleCount(3); // lg
            } else if (window.innerWidth >= 768) {
                setVisibleCount(2); // md
            } else {
                setVisibleCount(1); // sm
            }
        };

        updateVisible();
        window.addEventListener("resize", updateVisible);
        return () => window.removeEventListener("resize", updateVisible);
    }, []);

    const visibleLinks = categories.slice(0, visibleCount);
    const hiddenLinks = categories.slice(visibleCount);

    return (
//         <>
//             {/* NAVIGATION BAR */}
//             <nav className={`fixed top-0 left-0 right-0 h-16 flex items-center px-2 pr-5 z-50 transition-all duration-300 ${scrolled ? "bg-background/70 shadow-sm border-border" : "bg-background border-transparent"}
// `}>
//                 <div className="flex items-center justify-between w-full">
//                     {/* Left: Sidebar + Logo */}
//                     <div className="flex items-center gap-2">
//                         <SidebarTrigger className="hidden md:block" />
//                         <MobileSidebarMenu />
//                         <Link prefetch href="/" className="">
//                             <div className="p-4 flex items-center gap-1">
//                                 <h1 className="text-3xl font-bold">
//                                     <span className="text-yellow-500">MOVIE</span>HUB
//                                 </h1>
//                             </div>
//                         </Link>
//                     </div>

//                     {/* Right: Buttons */}
//                     <div className="flex items-center gap-4 md:gap-53">
//                         {/* Search Toggle (Button) */}
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="md:hidden"
//                             onClick={() => setShowSearch(prev => !prev)}
//                         >
//                             {showSearch ? <XIcon className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
//                         </Button>

//                         {/* Desktop Search Input */}
//                         <div className="hidden md:flex max-w-[720px] mx-auto w-full">
//                             <SearchInput />
//                         </div>

//                         {/* Upload Video */}
//                         <ResponsiveModal
//                             title="Upload a video"
//                             open={!!create.data?.url}
//                             onOpenChange={() => create.reset()}
//                         >
//                             {create.data?.url
//                                 ? <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
//                                 : <Loader2Icon />
//                             }
//                         </ResponsiveModal>

//                         {isLoaded && user && isAdmin && (
//                             <Button
//                                 variant="secondary"
//                                 onClick={() => create.mutate()}
//                                 disabled={create.isPending}
//                                 className="hidden md:flex items-center gap-2"
//                             >
//                                 {create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
//                                 Create
//                             </Button>
//                         )}

//                         {/* <ThemeToggle /> */}
//                         {isLoaded && user && <AuthButton />}
//                     </div>
//                 </div>
//             </nav>

//             {/* Mobile Search Input (shown below nav when open) */}
//             {showSearch && (
//                 <div className="md:hidden mt-16 px-4 -mb-16">
//                     <SearchInput inputRef={inputRef} />
//                 </div>
//             )}
//         </>


        <>
            {/* NAVIGATION BAR / Conditional Rendering for Extra links*/}
            <nav
                className={`fixed top-0 left-0 right-0 h-16 flex items-center px-2 pr-5 z-50 transition-all duration-300 ${scrolled
                        ? "bg-background/70 shadow-sm border-border"
                        : "bg-background border-transparent"
                    }`}
            >
                <div className="flex items-center justify-between w-full">
                    {/* Left: Sidebar + Logo */}
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="hidden md:block" />
                        <MobileSidebarMenu />
                        <Link prefetch href="/" className="">
                            <div className="p-4 flex items-center gap-1">
                                <h1 className="text-3xl font-bold">
                                    <span className="text-yellow-500">MOVIE</span>HUB
                                </h1>
                            </div>
                        </Link>
                    </div>
                    {/* Middle: Categories + See More */}
                    <div className="hidden md:flex items-center gap-6">
                        {visibleLinks.map((cat) => (
                            <Link
                                key={cat.href}
                                href={cat.href}
                                className="flex items-center gap-2"
                            >
                                {cat.name}
                            </Link>
                        ))}

                        {hiddenLinks.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        See More
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {hiddenLinks.map((cat) => (
                                        <DropdownMenuItem asChild key={cat.href}>
                                            <Link href={cat.href}>{cat.name}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>


                    {/* Right: Buttons */}
                    <div className="flex items-center gap-4 md:gap-5">
                        {/* Search Toggle (Button) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setShowSearch((prev) => !prev)}
                        >
                            {showSearch ? (
                                <XIcon className="w-5 h-5" />
                            ) : (
                                <SearchIcon className="w-5 h-5" />
                            )}
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
                            {create.data?.url ? (
                                <StudioUploader
                                    endpoint={create.data.url}
                                    onSuccess={onSuccess}
                                />
                            ) : (
                                <Loader2Icon />
                            )}
                        </ResponsiveModal>

                        {isLoaded && user && isAdmin && (
                            <Button
                                variant="secondary"
                                onClick={() => create.mutate()}
                                disabled={create.isPending}
                                className="hidden md:flex items-center gap-2"
                            >
                                {create.isPending ? (
                                    <Loader2Icon className="animate-spin" />
                                ) : (
                                    <PlusIcon />
                                )}
                                Create
                            </Button>
                        )}

                        {isLoaded && user && <AuthButton />}
                    </div>
                </div>
            </nav>

            {/* Mobile Search Input */}
            {showSearch && (
                <div className="md:hidden mt-16 px-4 -mb-16">
                    <SearchInput inputRef={inputRef} />
                </div>
            )}
        </>
    );
};
