import { Color, Material, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial } from "three";
import { ActionHandler, isManualSetColorAction } from "../types";
import { matchPattern } from "../utils/match-pattern";
import { unsetTextureMaps } from "./utils/unsetTextureMaps";

export type ColorMaterial = MeshBasicMaterial | MeshLambertMaterial | MeshPhongMaterial | MeshStandardMaterial;

export function hasColor(material: Material): material is ColorMaterial {
    return (material as ColorMaterial).color !== undefined;
}

export const manualSetColorHandler : ActionHandler = (gltf, action, _) => {
    if (!isManualSetColorAction(action)) {
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

            // material not in scene or material does not support color
            if (!mat || !hasColor(mat)) {
                continue;
            }

            unsetTextureMaps(mat);

            // assign color
            mat.color = new Color(action.colorCode)
        }
    }
}
