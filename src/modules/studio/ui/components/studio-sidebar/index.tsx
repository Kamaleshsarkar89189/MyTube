"use client";

import Link from "next/link";
import { LogOutIcon, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { StudioSidebarHeader } from "./studio-sidebar-header";

export const StudioSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar className="pt-16 z-40" collapsible="icon">
            <SidebarContent className="bg-background">
                <SidebarGroup>
                    <SidebarMenu>
                        <StudioSidebarHeader />

                        <SidebarMenuItem>
                            <SidebarMenuButton
                                isActive={pathname === "/studio"}
                                tooltip="Content"
                                asChild
                            >
                                <Link prefetch href="/studio" className="flex items-center gap-2">
                                    <VideoIcon className="size-5" />
                                    <span className="text-sm">Content</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <Separator />

                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Exit studio" asChild>
                                <Link prefetch href="/" className="flex items-center gap-3">
                                    <LogOutIcon className="size-5" />
                                    <span className="text-sm">Exit studio</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};
