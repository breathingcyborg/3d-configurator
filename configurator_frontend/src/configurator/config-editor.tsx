import { useEffect, useState } from "react";
import { useSimpleConfigurator } from "./context";
import { cn } from "@/lib/utils/cn";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { Attribute, isColorAttribute, isPartsAttribute, isManualSelectAttribute, isTextureAttribute, isUserImageAttribute, isBuildingImageAttribute } from "./types";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import 'react-horizontal-scrolling-menu/dist/styles.css';
// import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
// import { Button } from "@/components/ui/button";
import './tabs.css';
import { ManualSelectAttributeEditor } from "./attribute-editors/manual-select-attribute-editor";
import { UserImageAttributeEditor } from "./attribute-editors/user-image-attribute-editor";
import { TextureAttributeEditor } from "./attribute-editors/texture-attribute-editor";
import { ColorAttributeEditor } from "./attribute-editors/color-attribute-editor";
import { PartsAttributeEditor } from "./attribute-editors/parts-attribute-editor";
import { BuildingImageAttributeEditor } from "./attribute-editors/building-image-attribute-editor";
import { useInIframe } from "@/hooks/useInIframe";
// import { EnvContextType } from "./environment/context";
// import { Model } from "@/payload-types";
// import { ConfigValue } from "./config-value";

// export type State = {
//     model: Model
//     values: Record<string, ConfigValue | null>,
//     env: Pick<EnvContextType, 'coords' | 'groundVisible' | 'time' | 'skyVisible'> & {
//         date: string | null,
//     }
// }

export function ConfigEditorMobileDrawer({ open, setOpen } : { open: boolean, setOpen: (open: boolean) => void }) {
    return <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
        <DrawerContent className="max-h-[60vh]" overlayClassName="bg-transparent">
            <ConfigEditor />
        </DrawerContent>
    </Drawer>
}

// function Tabs({ children } : { children: any[] }) {
//     return <ScrollMenu 
//         LeftArrow={LeftArrow}
//         RightArrow={RightArrow}
//     >
//         { children }
//     </ScrollMenu>
// }

// const LeftArrow = () => {

//     const visibility = useContext<publicApiType >(VisibilityContext);
//     const isFirstItemVisible = visibility.useIsVisible('first', true);

//     return <Button 
//         className={cn({
//             "opacity-50": isFirstItemVisible
//         })}
//         disabled={isFirstItemVisible} 
//         size={'icon'} 
//         variant='ghost'>
//             <ChevronLeft/>
//     </Button>
// }

// const RightArrow = () => {
//     const visibility = useContext<publicApiType>(VisibilityContext);
//     const isLastItemVisible = visibility.useIsVisible('last', false);

//     return <Button 
//         className={cn({
//             "opacity-50": isLastItemVisible
//         })}
//         disabled={isLastItemVisible} 
//         size={'icon'} 
//         variant='ghost'>
//             <ChevronRight />
//     </Button>
// }

export function ConfigEditor({
    className
} : {
    className?: string,
}) {
    const { model } = useSimpleConfigurator();

    const [currentStep, setCurrentStep] = useState('');
    const inIframe = useInIframe();

    useEffect(() => {
        setCurrentStep(model.steps[0].name);
    }, [model.steps]);

    return <div 
        className={cn(
            "bg-white flex max-h-[55vh] lg:max-h-none flex-col items-stretch w-full lg:border-4",
            { "border-transparent": inIframe },
            className
        )}
    >
        <div className={cn('flex-shrink-0 border-b lg:border-b-0 py-0 px-1 ', { "lg:border-r border-gray-200": !inIframe })}>
            <div>
                <div className="flex flex-wrap">
                {
                    model.steps.map(step => (
                        <button
                            key={step.id}
                            onClick={() => {
                                setCurrentStep(step.name);
                            }}
                            className={cn(
                                "w-max flex flex-col items-center gap-2 text-foreground py-4 text-lg px-4 border-b-4 border-b-gray-200",
                                { "text-primary border-b-primary": step.name === currentStep },
                            )}
                        >
                            {step.name}
                        </button>
                    ))
                }
                </div>
            </div>
        </div>
        <div className='flex-grow px-4 py-4 overflow-y-auto'>
            {
                model.steps.map(step => {
                    if (step.name !== currentStep) {
                        return null;
                    }
                    return <div key={step.id} className='flex flex-col divide-y'>
                        {step.attributes.map(attribute => (
                            <div key={`${step.id}-${attribute.id}`} className="py-4">
                                <AttributeEditor attribute={attribute} />
                            </div>
                        ))}
                    </div>
                })
            }
        </div>
    </div>
}

function AttributeEditor({ attribute } : { attribute: Attribute }) {
    const isSelect = isManualSelectAttribute(attribute);
    const isUserImage = isUserImageAttribute(attribute);
    const isTexture = isTextureAttribute(attribute);
    const isColor = isColorAttribute(attribute);
    const isPart = isPartsAttribute(attribute);
    const isBuildingAttribute = isBuildingImageAttribute(attribute);

    return <div className='flex flex-col gap-4'>
        <Label htmlFor={attribute.code}>
            {attribute.name}
        </Label>
        {
            isSelect && <ManualSelectAttributeEditor attribute={attribute} />
        }
        {
            isUserImage && <UserImageAttributeEditor attribute={attribute} />
        }
        {
            isTexture && <TextureAttributeEditor attribute={attribute} />
        }
        {
            isColor && <ColorAttributeEditor attribute={attribute} />
        }
        {
            isPart && <PartsAttributeEditor attribute={attribute}/>
        }
        {
            isBuildingAttribute && <BuildingImageAttributeEditor attribute={attribute} />
        }
    </div>
}