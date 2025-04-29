import Navbar from "@/components/commonUI/Navbar";
import { UserLevel } from "../generated/prisma";

export default function MainLayout({children,}: Readonly<{children: React.ReactNode;}>)
{
    return (
        <div className="block h-svh">
            <Navbar level={UserLevel.MASTER} options={["Events", "Users", "Archives"]}/>
            <main className="flex h-[85%] w-full">
                {children}
            </main>
        </div>
    )
}