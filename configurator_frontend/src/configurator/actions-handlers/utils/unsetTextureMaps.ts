import { Material } from "three";
import { supportsColorMap, supportsAoMap, supportsDisplacementMap, supportsNormalMap, supportsRoughnessMap, supportsMetalnessMap, supportsEmissiveMap, supportsBumpMap } from "./materialMapUtils";

export function unsetTextureMaps(mat: Material) {
    let needsUpdate = false;
    if (supportsColorMap(mat) && mat.map !== null) {
        mat.map = null;
        needsUpdate = true;
    }
    if (supportsAoMap(mat) && mat.aoMap !== null) {
        mat.aoMap = null;
        needsUpdate = true;
    }
    if (supportsDisplacementMap(mat) && mat.displacementMap !== null) {
        mat.displacementMap = null;
        needsUpdate = true;
    }
    if (supportsNormalMap(mat) && mat.normalMap !== null) {
        mat.normalMap = null;
        needsUpdate = true;
    }
    if (supportsRoughnessMap(mat) && mat.roughnessMap !== null) {
        mat.roughnessMap = null;
        needsUpdate = true;
    }
    if (supportsMetalnessMap(mat) && mat.metalnessMap !== null) {
        mat.metalnessMap = null;
        needsUpdate = true;
    }
    if (supportsEmissiveMap(mat) && mat.emissiveMap !== null) {
        mat.emissiveMap = null;
        needsUpdate = true;
    }
    if (supportsBumpMap(mat) && mat.bumpMap !== null) {
        mat.bumpMap = null;
        needsUpdate = true;
    }
    if (needsUpdate) {
        mat.needsUpdate = true;
        mat.transparent = true;
    }
}
