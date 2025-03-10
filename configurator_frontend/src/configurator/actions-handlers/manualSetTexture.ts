import { Color, ColorSpace, LinearMipMapLinearFilter, NearestFilter, NoColorSpace, SRGBColorSpace, Texture, TextureLoader } from "three";
import { ActionHandler, isManualSetTextureAction } from "../types";
import { matchPattern } from "../utils/match-pattern";
import { getAssetUrl } from "@/lib/utils/getAssetUrl";
import { SetTextureAction } from "@/payload-types";
import { isMedia } from "@/payload-other-types";
import { supportsAoMap, supportsBumpMap, supportsColorMap, supportsDisplacementMap, supportsEmissiveMap, supportsMetalnessMap, supportsNormalMap, supportsRoughnessMap, wrapMap } from "./utils/materialMapUtils";


export const manualSetTextureHandler: ActionHandler = async (gltf, action, _) => {
    if (!isManualSetTextureAction(action)) {
        return;
    }

    const materialNamePatterns = (action.materials || []).map(m => m.name);
    const materialsInScene = Object.keys(gltf.materials);

    for (let materialNamePattern of materialNamePatterns) {

        for (let materialInSceneName of materialsInScene) {

            const matches = matchPattern(materialNamePattern, materialInSceneName);

            // name does not match pattern
            if (!matches) {
                continue;
            }


            const mat = gltf.materials[materialInSceneName];

            let needsUpdate = false;

            /**
             * apply color map
             * 
             */
            if (supportsColorMap(mat)) {

                if (action.color) {
                    mat.color = new Color(action.color);
                    mat.map = null;
                    mat.map = null;
                    needsUpdate = true;

                }

                if (action.colorMap && isMedia(action.colorMap) && action.colorMap.url) {
                    const map = await loadTexture(action.colorMap.url, action, SRGBColorSpace);
                    mat.map = map;
                    mat.color = new Color("transparent");
                    needsUpdate = true;
                }
            }

            /**
             * apply ao map
             * 
             */
            if (supportsAoMap(mat)) {
                if (isMedia(action.aoMap) && action.aoMap.url) {
                    const map = await loadTexture(action.aoMap.url, action);
                    mat.aoMap = map;
                    needsUpdate = true;
                }


                if (action.aoIntensity !== null && action.aoIntensity !== undefined) {
                    mat.aoMapIntensity = action.aoIntensity;
                    needsUpdate = true;
                }
            }

            /**
             * apply displacement map
             * 
             */
            if (supportsDisplacementMap(mat)) {

                if (isMedia(action.displacementMap) && action.displacementMap.url) {

                    const map = await loadTexture(action.displacementMap.url, action);
                    mat.displacementMap = map;
                    needsUpdate = true;

                }

                if (action.displacementScale !== null && action.displacementScale !== undefined) {
                    mat.displacementScale = action.displacementScale
                    needsUpdate = true;

                }

            }
    
            /**
             * apply normal map
             * 
             */
            if (supportsNormalMap(mat)) {

                if (isMedia(action.normalMap) && action.normalMap.url) {

                    const map = await loadTexture(action.normalMap.url, action);
                    mat.normalMap = map;
                    needsUpdate = true;
                }


                if (typeof action?.normalScaleX === 'number' && typeof action?.normalScaleY === 'number') {
                    mat.normalScale.set(action.normalScaleX, action.normalScaleY);
                    needsUpdate = true;
                }

            }

            /**
             * apply roughness map
             * 
             */
            if (supportsRoughnessMap(mat)) {
                if (isMedia(action.roughnessMap) && action.roughnessMap.url) {

                    const map = await loadTexture(action.roughnessMap.url, action);
                    mat.roughnessMap = map;
                    needsUpdate = true;

                }

                if (action.roughness !== null && action.roughness !== undefined) {
                    mat.roughness = action.roughness;
                    needsUpdate = true;
                }

            }

            /**
             * apply metalness map
             * 
             */
            if (supportsMetalnessMap(mat)) {
                if (isMedia(action.metalnessMap) && action.metalnessMap.url) {

                    const map = await loadTexture(action.metalnessMap.url, action);
                    mat.metalnessMap = map;
                    needsUpdate = true;
                }

                if (action.metalness !== null && action.metalness !== undefined) {
                    mat.metalness = action.metalness;
                    needsUpdate = true;

                }

                mat.transparent = true;
                mat.needsUpdate = true;
            }

            /**
             * apply emissive map
             * 
             */
            if (supportsEmissiveMap(mat)) {
                if (isMedia(action.emissiveMap) && action.emissiveMap.url) {
                    const map = await loadTexture(action.emissiveMap.url, action, SRGBColorSpace);
                    mat.emissiveMap = map;
                    needsUpdate = true;

                }

                if (typeof action.emissiveIntensity === 'number') {
                    mat.emissiveIntensity = action.emissiveIntensity;
                    needsUpdate = true;

                }

                if (action.emissiveColor) {
                    mat.emissive = new Color(action.emissiveColor);
                    needsUpdate = true;

                }

            }

            /**
             * apply bump map
             * 
             */
            if (supportsBumpMap(mat)) {
                if (isMedia(action.bumpMap) && action.bumpMap.url) {
                    const map = await loadTexture(action.bumpMap.url, action);
                    mat.bumpMap = map;
                    needsUpdate = true;
                }

                if (typeof action.bumpScale === 'number') {
                    mat.bumpScale = action.bumpScale;
                    needsUpdate = true;
                }
            }

            // update material
            if (needsUpdate) {
                mat.transparent = true;
                mat.needsUpdate = true;
            }
        }
    }
}

type CommonTextureParams = Pick<SetTextureAction, 'wrapS' | 'wrapT' | 'offsetX' | 'offsetY' | 'repeatX' | 'repeatY'>;

async function loadTexture(url: string, params: CommonTextureParams, colorSpace: ColorSpace = NoColorSpace) {
    const loader = new TextureLoader();

    const colorMapUrl = getAssetUrl(url);

    const colorMap = await loader.loadAsync(colorMapUrl);

    applyCommonParams(colorMap, params, colorSpace);

    return colorMap;
}

function applyCommonParams(texture: Texture, params: CommonTextureParams, colorSpace: ColorSpace) {

    const { wrapS, wrapT, repeatX, repeatY, offsetX, offsetY } = params;

    texture.wrapS = wrapMap[wrapS]
    texture.wrapT = wrapMap[wrapT]

    texture.repeat.set(repeatX, repeatY);
    texture.offset.set(offsetX, offsetY);

    texture.colorSpace = colorSpace;

    // should these be customizable from admin?
    // or should they be different depending on type of map.
    texture.magFilter = NearestFilter;
    texture.minFilter = LinearMipMapLinearFilter;
}