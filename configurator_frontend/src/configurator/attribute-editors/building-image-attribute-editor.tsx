import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BuildingImageAttribute } from "@/payload-types";
import { BuildingIcon, ChevronLeftIcon, ImageIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { resizeImage } from "../utils/resize-image";
import { uploadBase64Image } from "@/useruploads/api";
import { ImageMeasureCallback, MeasureImage } from "./measure-image";
import { getAssetUrl } from "@/lib/utils/getAssetUrl";
import { BuildingImageValue } from "../config-value";
import { useSimpleConfigurator } from "../context";

export function BuildingImageAttributeEditor({ attribute }: { attribute: BuildingImageAttribute }) {
    const [open, setOpen] = useState(false);
    const { values } = useSimpleConfigurator();
    const value = values[attribute.code] as BuildingImageValue | null;

    return <div>
        {
            value?.value?.url && <img
                className="max-w-[300px] h-auto mb-4 rounded-lg"
                src={value.value.url}
            />
        }
        <Button 
            className="w-[300px] max-w-full"
            variant={"outline"} 
            onClick={() => setOpen(true)}>
            <BuildingIcon className='mr-2 w-4 h-4' />
            {
                value?.value 
                    ? 'Change Your Building Image'
                    : 'Your Building Image'
            }
        </Button>
        <BuildingImageModal
            attribute={attribute}
            open={open}
            setOpen={setOpen}
        />
    </div>
}

function BuildingImageModal({ attribute, open, setOpen }: { attribute: BuildingImageAttribute, open: boolean, setOpen: (open: boolean) => void }) {
    // upload, measure
    const { setValue } = useSimpleConfigurator();
    const [state, setState] = useState<'upload' | 'measure'>('upload');
    const [image, setImage] = useState<string | null>(null);
    const [widthPx, setWidthPx] = useState<number | null>(null);
    const [heightPx, setHeightPx] = useState<number | null>(null);

    const onImageUploaded : ImageUploadedCallback = ({ url, width, height }) => {
        setImage(url);
        setWidthPx(width);
        setHeightPx(height);
        setState('measure');
    }

    const onImageMeasured : ImageMeasurementDoneCallback = ({ widthMeters, heightMeters }) => {
        if (!image || !widthPx || !heightPx) {
            return
        }
        const value : BuildingImageValue = {
            type: 'buildingImage',
            value: {
                url: image!,
                imageWidthMeters: widthMeters,
                imageHeightMeters: heightMeters,
                imageWidthPixels: widthPx,
                imageHeightPixels: heightPx,
            }
        }
        setValue(attribute.code, value);
        setOpen(false);
    }

    const onChangeImage = () => {
        setState('upload');
    }


    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            {
                open && state === 'upload' && (
                    <ImageUploadStep onDone={onImageUploaded} />
                )
            }
            {
                open && state === 'measure' && (!!image && !!widthPx && !!heightPx) && (
                    <MeasureImageStep 
                        image={image} 
                        width={widthPx} 
                        height={heightPx} 
                        onDone={onImageMeasured}
                        onChangeImage={onChangeImage}
                    />
                )
            }
        </DialogContent>
    </Dialog>
}

type ImageMeasurementDoneCallback = (params: { widthMeters: number, heightMeters: number }) => void | Promise<void>

function MeasureImageStep({ 
    image, 
    width, 
    height, 
    onDone,
    onChangeImage,
} : { 
    image: string, 
    width: number, 
    height: number, 
    onDone: ImageMeasurementDoneCallback, 
    onChangeImage: () => void | Promise<void>  
}) {

    const onMeasurementDone : ImageMeasureCallback = (start, end, distance) => {
        const startPx = { x: start.x * width, y: start.y * height };
        const endPx = { x: end.x * width, y: end.y * height };
        const distancePx = Math.sqrt(
          Math.pow(endPx.y - startPx.y, 2) + Math.pow(endPx.x - startPx.x, 2)
        );

        const pixelsPerMeter = Math.round(distancePx / distance);

        const widthMeters = width / pixelsPerMeter;

        const heightMeters = height / pixelsPerMeter;

        onDone({ widthMeters, heightMeters });
    }

    return <div>
        <Button variant='outline' onClick={() => onChangeImage()}>
            <ChevronLeftIcon />{' '} Change Image
        </Button>
        <MeasureImage
            image={image}
            onDone={onMeasurementDone} 
        />
  </div>
}

type ImageUploadedCallback = (params: { url: string, width: number, height: number }) => void | Promise<void> 

function ImageUploadStep({ onDone }: { onDone: ImageUploadedCallback }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const onImageChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (!e.target.files || e.target.files.length <= 0) {
            return;
        }
        
        const resizedImage = await resizeImage(e.target.files[0]);

        try {

            setUploading(true);

            setError(null);

            const result = await uploadBase64Image(resizedImage.base64URL);

            onDone({ 
                url: getAssetUrl(result.doc.url!), 
                width: result.doc!.width!,
                height: result.doc!.height!  
            })

        } catch(e) {

            console.error(e);
            setError("could not upload imae");

        } finally {

            setUploading(false);

        }

    }

    return <div>
        <h1 className='font-bold text-3xl'>
            Photo of your building
        </h1>
        <p className='text-lg mt-2'>
            Take a straight photo of your building.
        </p>
        {
            error && <div className="bg-destructive text-destructive-foreground p-2 mb-2">
                { error }
            </div>
        }
        <div className='mt-8'>
            <div>
                {
                    uploading && (
                        <span>
                            <Loader2Icon className="animate-spin" />
                        </span>
                    )
                }
                <label htmlFor="image">
                    <div className='
                            rounded w-full py-12 flex justify-center bg-slate-300
                            border-dashed border-4 border-slate-400
                            text-slate-400
                            '>
                        <ImageIcon
                            size={50}
                        />
                    </div>
                </label>
            </div>
            <div>
                <input
                    className='hidden'
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    type="file"
                    name="image"
                    id="image"
                    onChange={onImageChange}
                />
            </div>
        </div>
    </div>
}