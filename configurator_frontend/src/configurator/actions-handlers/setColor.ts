import { Color } from "three";
import { isColorValue } from "../config-value";
import { ActionHandler, isSetColorAction } from "../types";
import { matchPatterns } from "../utils/match-pattern";
import { hasColor } from "./manualSetColor";
import { unsetTextureMaps } from "./utils/unsetTextureMaps";

export const setColor : ActionHandler = async (gltf, action, meta) => {

    if (!isSetColorAction(action)) {
        return;
    }

    const { value } = meta;
    const materialNames = (action.materials || []).map(m => m.name);

    if (!value || !isColorValue(value)) {
        return;
    }

    const { colorCode } = value.value;

    const materialsInScene = Object.keys(gltf.materials);

    for (let materialNameInScene of materialsInScene) {
        if (!matchPatterns(materialNames, materialNameInScene)) {
            console.debug("setSimpleColor", "pattern does not match", materialNames, materialNameInScene)
            continue;
        }
        
        const mat = gltf.materials[materialNameInScene];

        // unset texture maps if applied
        unsetTextureMaps(mat);

        // material not in scene or material does not support color
        if (!mat || !hasColor(mat)) {
            continue;
        }

        // assign color
        mat.color = new Color(colorCode);

    }
}