import { Media, PartsAttribute } from "@/payload-types";
import { useSimpleConfigurator } from "../context";
import { RadioGroup, RadioGroupItemImage } from "@/components/ui/radio-group";
import { isPartValue, PartValue } from "../config-value";
import { getMediaUrl } from "@/lib/utils/getMediaUrl";

export function PartsAttributeEditor({ attribute } : { attribute: PartsAttribute })  {

    const { values, setValue } = useSimpleConfigurator();    
    const value = values[attribute.code] as PartValue | null;
    const parts = attribute.parts || [];

    if (value && !isPartValue(value)) {
        return;
    }

    return <RadioGroup
        className="flex flex-wrap gap-2"
        id={attribute.code}
        value={value?.value?.code || ''}
        onValueChange={(partCode) => {
            const part = parts.find(p => p.code === partCode);
            if (!part) {
                setValue(attribute.code, null);
                return;
            }
            setValue(attribute.code, {
                type: 'part',
                value: {
                    code: part.code,
                    name: part.name
                },
            });
        }}
    >
        {parts.map(part => (
            <RadioGroupItemImage
                className="w-[150px]"
                key={part.code}
                value={part.code}
            >
                <div className="flex flex-col gap-2">
                    {
                        part.image && (
                            <img src={getMediaUrl(part.image as Media, true)} />
                        )
                    }
                    { part.name }
                </div>
            </RadioGroupItemImage>
        ))}
    </RadioGroup>
}