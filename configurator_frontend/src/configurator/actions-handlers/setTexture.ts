import { Color, LinearMipMapLinearFilter, NearestFilter, SRGBColorSpace, TextureLoader } from "three";
import { isTextureValue } from "../config-value";
import { ActionHandler, isSetTextureAction } from "../types";
import { matchPatterns } from "../utils/match-pattern";
import { isImageMaterial } from "./setUserImage";
import { wrapMap } from "./utils/materialMapUtils";


export const setTexture : ActionHandler = async (gltf, action, meta) => {
    console.debug(gltf.materials);

    if (!isSetTextureAction(action)) {
        return;
    }

    const { value } = meta;
    const materialNames = (action.materials || []).map(m => m.name);
    const { wrapS, wrapT, repeatX, repeatY, offsetX, offsetY } = action;

    if (!value || !isTextureValue(value)) {
        return;
    }

    const { imageUrl } = value.value;

    const materialsInScene = Object.keys(gltf.materials);
    const loader = new TextureLoader();
    const texture = await loader.loadAsync(imageUrl);

    texture.wrapS = wrapMap[wrapS];
    texture.wrapT = wrapMap[wrapT];
    texture.repeat.set(repeatX, repeatY);
    texture.offset.set(offsetX, offsetY);

    // should these be customizable from admin?
    texture.magFilter = NearestFilter;
    texture.minFilter = LinearMipMapLinearFilter;
    texture.colorSpace = SRGBColorSpace


    for (let materialNameInScene of materialsInScene) {
        if (!matchPatterns(materialNames, materialNameInScene)) {
            continue;
        }

        const material = gltf.materials[materialNameInScene];
        if (!isImageMaterial(material)) {
            continue;
        }

        material.map = texture;
        material.color = new Color("transparent");

        // if (material instanceof MeshStandardMaterial) {
        //      // Keep the image texture unaffected by material color
        //     material.emissiveMap = texture;
        //     // material.emissive.set(0xffffff);
        // }

        material.transparent = true;
        material.needsUpdate = true;
    }
}