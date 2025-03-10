import { Color, ColorAttribute } from "@/payload-types";
import { useSimpleConfigurator } from "../context";
import { RadioGroup, RadioGroupItemColor } from "@/components/ui/radio-group";
import { ColorValue } from "../config-value";
import { SketchPicker } from 'react-color'

export function ColorAttributeEditor({ attribute }: { attribute: ColorAttribute }) {

    const { values, setValue } = useSimpleConfigurator();

    const value = values[attribute.code] as ColorValue | null;

    const colors = (attribute.colors || []) as Color[];

    const customColors = attribute.customColors === true;

    return <div>
        {
            customColors && (
                <SketchPicker
                    styles={{
                        default: {
                            picker: {
                                width: '100%',
                                maxWidth: 300,
                                boxShadow: 'none',
                            },
                        }
                    }}
                    disableAlpha
                    color={value?.value?.colorCode || '#0000000'}
                    presetColors={colors.map(color => ({ color: color.colorCode, title: color.name }))}
                    onChange={(color) => {
                        const builtInColor = colors.find(c => c.colorCode === color.hex)
                        const colorValue: ColorValue = builtInColor
                            ? {
                                type: "color",
                                value: {
                                    colorCode: builtInColor.colorCode,
                                    name: builtInColor.name,
                                }
                            }
                            : {
                                type: "color",
                                value: {
                                    colorCode: color.hex,
                                    name: 'Custom'
                                }
                            };

                        setValue(attribute.code, colorValue);
                    }}
                />

            )
        }
        {
            !customColors && (
                <RadioGroup
                    className="flex flex-wrap gap-2"
                    id={attribute.code}
                    value={value?.value?.name || ''}
                    onValueChange={(colorName) => {
                        const color = colors.find(c => c.name == colorName);
                        if (!color) {
                            setValue(attribute.code, null);
                            return;
                        }
                        setValue(attribute.code, {
                            type: 'color',
                            value: {
                                colorCode: color.colorCode,
                                name: color.name,
                            },
                        });
                    }}
                >
                    {colors.map(color => (
                        <RadioGroupItemColor
                            color={color.colorCode}
                            key={color.name}
                            value={color.name}
                        >
                            {color.name}
                        </RadioGroupItemColor>
                    ))}
                </RadioGroup>
            )
        }
    </div>
}