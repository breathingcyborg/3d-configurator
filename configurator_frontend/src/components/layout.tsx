import { useInIframe } from "@/hooks/useInIframe"
import { cn } from "@/lib/utils/cn"
import { Link } from "react-router-dom";

export function Layout({
    children,
    configuratorMode = false,
} : { 
    children: React.ReactNode,
    configuratorMode?: boolean
}) {
    const inIframe = useInIframe();

    return <div style={{ minHeight: '100vh' }}>
        {
            !inIframe && (
                <div className="w-screen h-[100px] bg-white shadow">
                    <div className={
                        cn(
                            "h-full flex items-center",
                            {
                                "px-4": configuratorMode,
                                "container ": !configuratorMode
                            }
                        )
                    }>
                        <div className="text-2xl text-gray-500">
                            <Link to='/'>
                                3d Configurator
                            </Link>
                        </div>
                    </div>
                </div>    
            )
        }
        { children }
    </div>
}