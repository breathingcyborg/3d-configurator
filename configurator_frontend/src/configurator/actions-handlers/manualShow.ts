import { ActionHandler, isManualShowAction } from "../types";
import { matchPatterns } from "../utils/match-pattern";

export const manualShowHandler : ActionHandler = (gltf, action, _) => {
    if (!isManualShowAction(action)) {
        return;
    }
    const nodesToHide = (action.nodes || []).map(n => n.name);

    gltf.scene.traverse(function(node) {
        const matches = matchPatterns(nodesToHide, node.name)
        if (matches) {
            node.visible = true;
        }
    });
}
