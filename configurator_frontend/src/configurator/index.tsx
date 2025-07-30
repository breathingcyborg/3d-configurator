import { Model } from "@/payload-types";
import { Suspense, useState } from "react";
import { ConfiguratorProvider } from "./context";
import { ConfigEditor, ConfigEditorMobileDrawer } from "./config-editor";
import { Scene } from "./scene";
import { Button } from "@/components/ui/button";
import { SunIcon, WrenchIcon } from "lucide-react";
import { EnvironmentSettingsPopup } from "./environment/environment-settings-popup";
import { EnvContextProvider } from "./environment/context";
import { ConfiguratorStateJson } from "./configurator-state-json";
import { FullPageLoader } from "../components/ui/full-page-loader";
import { useInIframe } from "@/hooks/useInIframe";
import { cn } from "@/lib/utils/cn";

export function Configurator({ 
    model,
    savedState 
}: { 
    model: Model,
    savedState?: ConfiguratorStateJson 
}) {

    const [open, setOpen] = useState(false);
    const [envSettingsOpen, setEnvSettingsOpen] = useState(false);
    const inIframe = useInIframe();

    return <ConfiguratorProvider initialValues={savedState?.values} model={model}>
        <EnvContextProvider initialValues={savedState?.env}>
            <ConfigEditorMobileDrawer open={open} setOpen={setOpen} />
            <EnvironmentSettingsPopup open={envSettingsOpen} setOpen={setEnvSettingsOpen} />
            <div className={cn({ "bg-gray-200": !inIframe })}>
                <div className={cn("flex flex-row items-stretch w-full h-screen", { "h-[calc(100dvh-100px)]": !inIframe } )}>
                    <div className="hidden basis-[400px] flex-shrink-0 lg:flex items-stretch p-4">
                        <ConfigEditor className="rounded-xl shadow"/>
                    </div>
                    <div className="flex-1 relative overflow-hidden flex flex-col items-stretch">
                        <Suspense fallback={<FullPageLoader text='Downloading 3d assets' />}>
                            <Scene />
                        </Suspense>
                        <div className="absolute right-8 bottom-8 flex gap-3">
                            <Button className="lg:hidden" size='icon' onClick={() => setOpen(true)}>
                                <WrenchIcon />
                            </Button>
                        
                            <Button size='icon' onClick={() => setEnvSettingsOpen(true)}>
                                <SunIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </EnvContextProvider>
    </ConfiguratorProvider>
}

