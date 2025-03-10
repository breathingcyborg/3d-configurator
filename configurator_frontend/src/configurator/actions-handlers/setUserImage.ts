import { CanvasTexture, ClampToEdgeWrapping, Material, MeshBasicMaterial, MeshStandardMaterial, SRGBColorSpace } from "three";
import { ActionHandler, isSetUserImageAction } from "../types";
import { matchPattern } from "../utils/match-pattern";
import { isUserIageValue } from "../config-value";

export const setUserImage : ActionHandler = async (gltf, action, meta) => {
    console.log(gltf.materials);

    if (!isSetUserImageAction(action)) {
        return;
    }

    const { value } = meta;
    const materialName = action.material;
    const { width, height } = action;

    if (!value || !isUserIageValue(value)) {
        return;
    }

    const materialsInScene = Object.keys(gltf.materials);
    
    // draw image using texture
    const image = await loadImage(value.value.url);
    const texture = getImageTexture({
        image,
        height,
        width,
        offsetX: value.value.offsetX,
        offsetY: value.value.offsetY,
    })

    if (texture === null) {
        console.debug("empty canvas texture");
        return;
    }

    for (let materialNameInScene of materialsInScene) {

        if (!matchPattern(materialName, materialNameInScene)) {
            continue;
        }

        const material = gltf.materials[materialNameInScene];
        
        if(!isImageMaterial(material)) {
            continue;
        }

        material.map = texture;

        if (material instanceof MeshStandardMaterial) {
             // Keep the image texture unaffected by material color
            material.emissiveMap = texture;
            material.emissive.set(0xffffff);
        }

        material.transparent = true;
        material.needsUpdate = true;
    }
}

export type ImageMaterial = MeshBasicMaterial | MeshStandardMaterial;

export function isImageMaterial(material: Material) : material is ImageMaterial {
    const imageMaterialClasses = [ MeshStandardMaterial, MeshBasicMaterial ];
    return imageMaterialClasses.some(cls => material instanceof cls);
}

export function getImageTexture({
    image, 
    width, 
    height, 
    offsetX, 
    offsetY
} : {
    image: HTMLImageElement,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
}) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
        return null;
    }


    // Fill the canvas with a transparent background
    context!.fillStyle = 'rgba(0, 0, 0, 0)';
    context!.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate available space for the logo with padding
    const availableWidth = canvas.width - 2; // 1px padding on each side
    const availableHeight = canvas.height - 2; // 1px padding on each side

    // Calculate scaling factor to fit the image within the available space
    const scale = Math.min(Math.min(
        availableWidth / image.width, 
        availableHeight / image.height
    ), 1);

    // Calculate the new dimensions of the image
    const imageWidth = image.width * scale;
    const imageHeight = image.height * scale;

    // Postion image according to offset values
    const offsetXValue = offsetX * (canvas.width - imageWidth);
    const offsetYValue = offsetY * (canvas.height - imageHeight);

    const x = 1 + offsetXValue;
    const y = 1 + offsetYValue;

    // Draw the scaled image on the canvas
    context.drawImage(image, x, y, imageWidth, imageHeight);
    
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;

    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;

    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);

    return texture;
}

export function loadImage(src: string) : Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = ""
        img.src = src;
        img.onload = () => {
            resolve(img);
        };
        img.onerror = reject;
    });
}