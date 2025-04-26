import Navbar from "@/components/commonUI/Navbar";
import { UserLevel } from "@/entities/UserLevel";

export default function MainLayout({children,}: Readonly<{children: React.ReactNode;}>)
{
    return (
        <>
            <Navbar level={UserLevel.MASTER} options={["Events", "Users", "Archives"]}/>
            <main className="md:flex-1 md:h-screen p-5">
                {children}
            </main>
        </>
    )
}