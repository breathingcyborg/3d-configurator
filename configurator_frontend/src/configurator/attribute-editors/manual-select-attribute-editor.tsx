import { Media, ManualSelectAttribute } from "@/payload-types";
import { useSimpleConfigurator } from "../context";
import { StringValue } from "../config-value";
import { RadioGroup, RadioGroupItemColor, RadioGroupItemImage } from "@/components/ui/radio-group";
import { isColorOption, isTextOption, Option } from "../types";
import { getMediaUrl } from "@/lib/utils/getMediaUrl";

export function ManualSelectAttributeEditor({ attribute } : { attribute: ManualSelectAttribute }) {
    const { setValue, values } = useSimpleConfigurator();
    const attributeValue = values[attribute.code] as StringValue | null;
    const value = attributeValue?.value || '';

    return <RadioGroup
        className="flex flex-wrap gap-2"
        id={attribute.code}
        value={value}
        onValueChange={(optionCode) => {
            setValue(attribute.code, {
                type: 'string',
                value: optionCode,
            });
        }}
    >
        {attribute.options.map(option => (
            <SelectOption option={option} />
        ))}
    </RadioGroup>
}

function SelectOption({ option } : { option: Option  }) {

    if (isTextOption(option)) {
        return <RadioGroupItemImage
            key={option.code}
            value={option.code}
        >
            <div className="flex flex-col gap-2">
            { 
                option.image && (
                    <img
                        className="w-[150px]" 
                        src={getMediaUrl(option.image as Media, true)} />
                ) 
            }
            {option.name}
            </div>
        </RadioGroupItemImage>
    }

    if (isColorOption(option)) {
        return <RadioGroupItemColor
            color={option.colorCode}
            key={option.code}
            value={option.code}
        >
            {option.name}
        </RadioGroupItemColor>
    }

    return null;
}