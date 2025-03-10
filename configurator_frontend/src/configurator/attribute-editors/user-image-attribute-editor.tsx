import { UserImageAttribute } from "@/payload-types";
import { useSimpleConfigurator } from "../context";
import { UserImageValue } from "../config-value";
import { useState } from "react";
import { uploadImage } from "@/useruploads/api";
import { getAssetUrl } from "@/lib/utils/getAssetUrl";
import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function UserImageAttributeEditor({ attribute } : { attribute: UserImageAttribute }) {
    const { values, setValue } = useSimpleConfigurator();

    const value = values[attribute.code] as UserImageValue | null;
    
    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    // show current image
    // add button to upload file
    // upload image
    const onChangeHandler : React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        const files = e.target.files;
        if (!files || files.length <= 0) {
            return;
        }
    
        try {
            setError(null);
            const file = files[0]
            setUploading(true);
            const response = await uploadImage(file);
            const url = getAssetUrl(response.doc.url as string);
            setValue(attribute.code, {
                type: 'userImage',
                value: {
                    url: url,
                    offsetX: 0,
                    offsetY: 0,
                }
            })

        } catch (e) {
            console.debug(error);
            setError("Could not upload image");
        } finally {
            setUploading(false);
        }
    }

    return <div className="flex flex-col gap-2">
        {
            error && <div className="bg-destructive text-destructive-foreground p-2 mb-2">
                { error }
            </div>
        }
        <div className="flex items-center gap-2">
            {
                uploading && (
                    <span>
                        <Loader2Icon className="animate-spin" />
                    </span>
                )
            }
            <Input
                disabled={uploading} 
                type="file" 
                name="Image" 
                accept="image/jpeg,image/jpg,image/png"
                onChange={onChangeHandler}
            />

        </div>
        {
                value !== null && <div className="flex flex-col gap-4">
                    <img src={value.value.url} className="w-full max-w-[300px] h-auto" />
                    <div className="flex flex-col gap-3">
                        <Label className="font-normal">Horizontal Offset</Label>
                        <Slider 
                            value={[value.value.offsetX]}
                            min={0}
                            max={1} step={0.01} 
                            onValueChange={(v) => {
                                const newValue : UserImageValue = {
                                    type: 'userImage',
                                    value: {
                                        ...value.value,
                                        offsetX: v.length > 0 ? v[0] : 0,
                                    }
                                }
                                setValue(attribute.code, newValue);
                            }}    
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label className="font-normal">Vertical Offset</Label>
                        <Slider 
                            value={[value.value.offsetY]}
                            min={0}
                            max={1} step={0.01} 
                            onValueChange={(v) => {
                                const newValue : UserImageValue = {
                                    type: 'userImage',
                                    value: {
                                        ...value.value,
                                        offsetY: v.length > 0 ? v[0] : 0,
                                    }
                                }
                                setValue(attribute.code, newValue);
                            }}    
                        />
                    </div>
                </div>
            }

    </div>
}
