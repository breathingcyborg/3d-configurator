import { ActionHandler, isUnsetAttributeHandler } from "../types";

export const unsetAttribute : ActionHandler = async (_, action, meta) => {

    if (!isUnsetAttributeHandler(action)) {
        return;
    }

    /**
     * Early return if the attribute has no value.
     * 
     * Often, `unsetAttribute` is applied to two attributes in a pair.
     * When the first attribute's value changes, it triggers the unset
     * of the second attribute. Since the second attribute's value has
     * now changed, it triggers the unset of the first attribute again.
     * 
     * This can result in both attributes being unintentionally unset.
     * By checking if the attribute already has no value, we avoid this loop
     * and prevent both attributes from being unset.
     */
    if (!meta.value) {
        return
    }

    meta.unsetValue(action.attributeCode);
}