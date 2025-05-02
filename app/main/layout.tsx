import Navbar from "@/components/commonUI/Navbar";
import { UserLevel } from "@prisma/client";
import { NavigationProvider } from "@/contexts/NavigationContext";

export default function MainLayout({children,}: Readonly<{children: React.ReactNode;}>)
{
    return (
        <NavigationProvider>
            <div className="block h-svh">
                <Navbar level={UserLevel.MASTER} options={["Events", "Users", "Archives"]}/>
                <main className="flex h-[85%] w-full">
                    {children}
                </main>
            </div>
        </NavigationProvider>
    )
}