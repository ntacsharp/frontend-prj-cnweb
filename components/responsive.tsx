import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import ServerSidebar from "./server/server-sidebar";
import NavigationSidebar from "./navigation/navigation-sidebar";

export const MobileToggle = React.memo(({ serverID }: { serverID: string }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="p-0 flex gap-0" side="left">
                <div className="w-[72px]">
                    <NavigationSidebar/>
                    <p className="px-2 text-sm text-zinc-600 dark:text-zinc-200">
                    </p>
                </div>
                <ServerSidebar serverId={serverID}/>
            </SheetContent>
        </Sheet>
    );
});

export default MobileToggle;
