import { SetTextureAction } from "@/payload-types";
import { ClampToEdgeWrapping, Material, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MirroredRepeatWrapping, RepeatWrapping, Wrapping } from "three";

export const wrapMap : Record<SetTextureAction['wrapS'], Wrapping> = {
    "clampToEdge": ClampToEdgeWrapping,
    "mirroredRepeat": MirroredRepeatWrapping,
    "repeat": RepeatWrapping,
}

export type ColorMaterial = MeshBasicMaterial 
    | MeshLambertMaterial 
    | MeshPhongMaterial 
    | MeshStandardMaterial;

export type AoMapMaterial = MeshBasicMaterial 
    | MeshLambertMaterial 
    | MeshStandardMaterial;

export type DisplacementMapMaterial =  MeshDepthMaterial
    | MeshDistanceMaterial
    | MeshLambertMaterial
    | MeshMatcapMaterial
    | MeshNormalMaterial
    | MeshPhongMaterial
    | MeshPhysicalMaterial
    | MeshStandardMaterial
    | MeshToonMaterial

export type NormalMapMaterial = MeshStandardMaterial
    | MeshLambertMaterial
    | MeshMatcapMaterial
    | MeshNormalMaterial
    | MeshPhongMaterial
    | MeshPhysicalMaterial
    | MeshToonMaterial;

export type RoughnessMapMaterial = MeshStandardMaterial
    | MeshPhysicalMaterial;


export type MetalnessMapMaterial = MeshStandardMaterial
    | MeshPhysicalMaterial;

export type EmissiveMapMaterial = MeshStandardMaterial
    | MeshLambertMaterial
    | MeshPhongMaterial
    | MeshPhysicalMaterial
    | MeshToonMaterial

export type BumpMapMaterial = MeshStandardMaterial
    | MeshLambertMaterial
    | MeshMatcapMaterial
    | MeshNormalMaterial
    | MeshPhongMaterial
    | MeshPhysicalMaterial
    | MeshToonMaterial

export function supportsColorMap(material: Material): material is ColorMaterial {
    return (material as ColorMaterial).color !== undefined;
}

export function supportsAoMap(material: Material): material is AoMapMaterial {
    return (material as AoMapMaterial).aoMap !== undefined;
}

export function supportsDisplacementMap(material: Material): material is DisplacementMapMaterial {
    return (material as DisplacementMapMaterial).displacementMap !== undefined;
}


export function supportsNormalMap(material: Material): material is NormalMapMaterial {
    return (material as NormalMapMaterial).normalMap !== undefined;
}

export function supportsRoughnessMap(material: Material): material is RoughnessMapMaterial {
    return (material as RoughnessMapMaterial).roughnessMap !== undefined;
}

export function supportsMetalnessMap(material: Material): material is MetalnessMapMaterial {
    return (material as MetalnessMapMaterial).metalnessMap !== undefined;
}

export function supportsEmissiveMap(material: Material): material is EmissiveMapMaterial {
    return (material as EmissiveMapMaterial).emissiveMap !== undefined;
}

export function supportsBumpMap(material: Material): material is BumpMapMaterial {
    return (material as BumpMapMaterial).bumpMap !== undefined;
}


/**
 * Uncomment this code during development to test material properties.
 * This approach helps identify which materials support a specific property, such as `bumpMap`.
 * You can modify the property in the loop to test for other properties as well.
 * 
 * Steps
 *  
 * Step 1: Uncomment the code below.
 * Step 2: Change bumpMap to the property you want to test support.
 * Step 3: Uncomment the material classes one by one. (Import them if required)
 * Step 4: After uncommenting a material, if there is no TypeScript error (red underline) when accessing the property (e.g., `bumpMap`), 
 * that means the material supports the property.
 * Step 5: If you get a TypeScript error, it indicates that the material does not support the property. 
 * You can comment out or remove that material from the list.
 * 
 */

// () => {
//     let classes = [
//         // MeshStandardMaterial,
//         // MeshBasicMaterial,
//         // MeshDepthMaterial,
//         // MeshDistanceMaterial,
//         // MeshLambertMaterial,
//         // MeshMatcapMaterial,
//         // MeshNormalMaterial,
//         // MeshPhongMaterial,
//         // MeshPhysicalMaterial,
//         // MeshToonMaterial,
//         // PointsMaterial,
//         // RawShaderMaterial,
//         // ShaderMaterial,
//         // ShaderMaterial,
//         // SpriteMaterial
//     ]
//     for (let c of classes) {
//         let m = {} as Material;
//         if(m instanceof c) {
//             m.bumpMap
//         }
//     }
// }