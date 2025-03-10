import { isPartValue } from "../config-value";
import { ActionHandler, isPartsAttribute, isShowPartAction } from "../types";
import { matchPatterns } from "../utils/match-pattern";

export const shorPartHandler : ActionHandler = (gltf, action, meta) => {

    if (!isShowPartAction(action)) {
        return;
    }

    if (!isPartsAttribute(meta.attribute)) {
        return;
    }
    
    if (!meta.value || !isPartValue(meta.value)) {
        return
    }

    const value = meta.value;
    const parts = (meta.attribute.parts || [])
    
    const selectedPart = parts.find(part => part.code == value.value.code) || null;
    const otherParts = parts.filter(part => part.code != value.value.code);

    const nodesToHide = otherParts.flatMap(part => part.nodes || []).map(node => node.name)
    const nodesToShow = selectedPart === null 
        ? []
        : (selectedPart.nodes || []).map(node => node.name);


    gltf.scene.traverse(function(node) {
        const shouldHide = matchPatterns(nodesToHide, node.name);
        const shouldShow = matchPatterns(nodesToShow, node.name);
        
        // hide part
        // but dont hide if it should be shown as well
        if (shouldHide && !shouldShow) {
            node.visible = false;
        }

        // show part
        if (shouldShow) {
            node.visible = true;
        }
    });
}
