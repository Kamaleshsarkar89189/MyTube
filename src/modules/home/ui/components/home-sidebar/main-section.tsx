"use client";

import { SidebarGroup,
    SidebarGroupContent, 
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const items = [
    {
        title: "Home",
        url: "/",
        icon: HomeIcon,
    },
    {
        title: "Subscriptions",
        url: "/feed/subscriptions",
        icon: PlaySquareIcon,
        auth: true,
    },
    {
        title: "Trending",
        url: "/feed/trending",
        icon: FlameIcon,
    },
];

export const MainSection = () => {
    const clerk = useClerk();
    const { isSignedIn } = useAuth();
    const pathname = usePathname();
    
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const Wrapper = isMobile ? SheetClose : "div";

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                             tooltip={item.title}
                             asChild
                             isActive={pathname === item.url}
                             onClick={(e) => {
                                if (!isSignedIn && item.auth) {
                                    e.preventDefault();
                                    return clerk.openSignIn();
                                } 
                             }}
                            >
                                <Wrapper asChild>
                                {/* <SheetClose asChild> */}
                                <Link prefetch  href={item.url} className="flex items-center gap-4">
                                <item.icon />
                                <span className="text-sm">{item.title}</span>
                                </Link>
                                {/* </SheetClose> */}
                                </Wrapper>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}