"use client";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ListIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SheetClose } from "@/components/ui/sheet";

export const LoadingSkeleton = () => {
    return (
        <>
            {[1, 2, 3, 4].map((i) => (
                <SidebarMenuItem key={i}>
                    <SidebarMenuButton disabled>
                        <Skeleton className="size-6 rounded-full shrink-0" />
                        <Skeleton className="h-4 w-full" />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    );
};

export const SubscriptionsSection = () => {
    const pathname = usePathname();
    const { data, isLoading } = trpc.subscriptions.getMany.useInfiniteQuery(
        { limit: DEFAULT_LIMIT },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 568);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {isLoading && <LoadingSkeleton />}
                    {!isLoading &&
                        data?.pages
                            .flatMap((page) => page.items)
                            .map((subscription) => {
                                const link = (
                                    <Link
                                        prefetch
                                        href={`/users/${subscription.user.id}`}
                                        className="flex items-center gap-4"
                                    >
                                        <UserAvatar
                                            size="xs"
                                            imageUrl={subscription.user.imageUrl}
                                            name={subscription.user.name}
                                        />
                                        <span className="text-sm">
                                            {/* {subscription.user.name} */}
                                            MovieHub Team
                                        </span>
                                    </Link>
                                );

                                return (
                                    <SidebarMenuItem key={`${subscription.creatorId}-${subscription.viewerId}`}>
                                        <SidebarMenuButton
                                            tooltip={subscription.user.name}
                                            asChild
                                            isActive={pathname === `/users/${subscription.user.id}`}
                                        >
                                            {isMobile ? (
                                                <SheetClose asChild>{link}</SheetClose>
                                            ) : (
                                                link
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                    {!isLoading && (
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === "/subscriptions"}
                            >
                                {isMobile ? (
                                    <SheetClose asChild>
                                        <Link prefetch href="/subscriptions" className="flex items-center gap-4">
                                            <ListIcon className="size-4" />
                                            <span className="text-sm">All subscriptions</span>
                                        </Link>
                                    </SheetClose>
                                ) : (
                                    <Link prefetch href="/subscriptions" className="flex items-center gap-4">
                                        <ListIcon className="size-4" />
                                        <span className="text-sm">All subscriptions</span>
                                    </Link>
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
