import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { MainSection } from "./main-section"
import { Separator } from "@/components/ui/separator"
import { PersonalSection } from "./personal-section"
import { SignedIn } from "@clerk/nextjs"
import { SubscriptionsSection } from "./subscriptions-section"

export const HomeSidebar = () => {
    return (
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
            <SidebarContent className="bg-[#181818] text-white">
                <MainSection />
                <Separator />
                <PersonalSection />
                <SignedIn>
                    <>
                     <Separator />
                     <SubscriptionsSection />
                    </>
                </SignedIn>
            </SidebarContent>
        </Sidebar>
    )
}

