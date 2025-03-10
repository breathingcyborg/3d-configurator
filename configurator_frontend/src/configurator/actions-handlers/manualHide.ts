import { ActionHandler, isManualHideAction } from "../types";
import { matchPatterns } from "../utils/match-pattern";

export const manualHideHandler : ActionHandler = (gltf, action, _) => {
    if (!isManualHideAction(action)) {
        return;
    }
    const nodesToHide = (action.nodes || []).map(n => n.name);

    gltf.scene.traverse(function(node) {
        const matches = matchPatterns(nodesToHide, node.name);
        if (matches) {
            node.visible = false;
        }
    });
}
