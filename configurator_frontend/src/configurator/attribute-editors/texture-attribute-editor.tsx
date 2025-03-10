import { Media, Tag, TextureAttribute } from "@/payload-types";
import { useSimpleConfigurator } from "../context";
import { RadioGroup, RadioGroupItemImage } from "@/components/ui/radio-group";
import { TextureValue } from "../config-value";
import { getAssetUrl } from "@/lib/utils/getAssetUrl";
import { getMediaUrl } from "@/lib/utils/getMediaUrl";

export function TextureAttributeEditor({ attribute } : { attribute: TextureAttribute })  {

    const { textures, values, setValue } = useSimpleConfigurator();
    
    const value = values[attribute.code] as TextureValue | null;

    const attributeTags = ((attribute['tags'] || []) as Tag[]).map(tag => tag.tag);
    
    const filteredTextures = textures.filter(t => {
        const textureTags = ((t.tags || []) as Tag[]).map(tag => tag.tag);
        return textureTags.some(textureTag => attributeTags.includes(textureTag));
    })

    return <RadioGroup
        className="flex flex-wrap gap-2"
        id={attribute.code}
        value={value?.value?.code || ''}
        onValueChange={(textureCode) => {
            const texture = textures.find(t => t.code == textureCode);
            if (!texture) {
                setValue(attribute.code, null);
                return;
            }
            setValue(attribute.code, {
                type: 'texture',
                value: {
                    code: texture.code,
                    imageUrl: getAssetUrl((texture.image as Media).url!),
                },
            });
        }}
    >
        {filteredTextures.map(texture => (
            <RadioGroupItemImage
                className="w-[150px]"
                key={texture.id}
                value={texture.code}
            >
                <div className="flex flex-col gap-2">
                    <img src={getMediaUrl(texture.image as Media, true)} />
                    { texture.title }
                </div>
            </RadioGroupItemImage>
        ))}
    </RadioGroup>
}