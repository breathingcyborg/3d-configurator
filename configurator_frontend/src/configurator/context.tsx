import { Color, Media, Model } from "@/payload-types";
import { createContext, useContext, useEffect, useState } from "react";
import { ConfigValue } from "./config-value";
import { isColorAttribute, isPartsAttribute, isManualSelectAttribute, isTextureAttribute, isUserImageAttribute } from "./types";
import { Texture } from '@/payload-types';
import useSWR from "swr";
import { getAllTextures } from "@/textures/api";
import { getMediaUrl } from "@/lib/utils/getMediaUrl";

export type ConfiguratorContextType = {
    values: Record<string, ConfigValue | null>,
    setValue: (key: string, value: ConfigValue | null) => void,
    model: Model,
    textures: Texture[],
}

const ConfiguratorContext = createContext<ConfiguratorContextType>({
    values: {},
    model: {} as Model,
    setValue: () => {},
    textures: [],
});

export function ConfiguratorProvider({ 
    model, 
    children, 
    initialValues,
} : { 
    model: Model, 
    children: React.ReactNode, 
    initialValues?: Record<string, ConfigValue | null>,
}) {

    const [values, setValues] = useState<Record<string, ConfigValue | null>>(initialValues || {})
    const { data: textures } = useSWR('/textures', getAllTextures);
    console.debug("current Values", values)

    useEffect(() => {

        // apply defaults only when initial values are not specified
        if (initialValues !== undefined) {
            return;
        }

        const values : Record<string, ConfigValue | null> = {}

        for(const step of model.steps) {
            for (const attribute of step.attributes) {

                if (isManualSelectAttribute(attribute)) {
                    let defaultValue = null;
                    for (const option of attribute.options) {
                        if (option.default === true) {
                            defaultValue = option.code;
                        }
                    }
                    if (defaultValue === null) {
                        values[attribute.code] = null;
                        continue
                    } 
                    values[attribute.code] = {
                        value: defaultValue,
                        type: 'string',
                    }
                }

                if (isTextureAttribute(attribute)) {
                    const defaultTexture = attribute.defaultValue as Texture | null;
                    if (!defaultTexture) {
                        values[attribute.code] = null;
                        continue
                    }
                    values[attribute.code] = {
                        type: 'texture',
                        value: {
                            code: defaultTexture.code,
                            imageUrl: getMediaUrl(defaultTexture.image as Media, false)
                        }
                    }
                }

                if (isColorAttribute(attribute)) {
                    const defaultColor = attribute.defaultValue as Color | null;
                    if (!defaultColor) {
                        values[attribute.code] = null;
                        continue
                    }
                    values[attribute.code] = {
                        type: 'color',
                        value: {
                            colorCode: defaultColor.colorCode,
                            name: defaultColor.name,
                        }
                    }
                }

                if (isUserImageAttribute(attribute)) {
                    values[attribute.code] = null;
                }

                if (isPartsAttribute(attribute)) {
                    const defaultPart = (attribute.parts || []).find(p => p.default);
                    if (defaultPart) {
                        values[attribute.code] = {
                            type: 'part',
                            value: {
                                code: defaultPart.code,
                                name: defaultPart.name,
                            }
                        }
                    }
                }
            }
        }

        setValues(values);

    }, [model, initialValues]);

    const setValue = (attributeCode: string, value: ConfigValue | null) => {
        setValues(attrs => ({
            ...attrs,
            [attributeCode]: value,
        }))
    }

    const value : ConfiguratorContextType = { 
        values, 
        setValue, 
        model,
        textures: textures || [],
    }

    return <ConfiguratorContext.Provider value={value}>
        { children }
    </ConfiguratorContext.Provider>
}

export const useSimpleConfigurator = () => useContext(ConfiguratorContext);