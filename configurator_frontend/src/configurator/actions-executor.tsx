import { useCallback, useEffect } from "react";
import { useSimpleConfigurator } from "./context";
import { usePrevious } from "@uidotdev/usehooks";
import actionHandlers from "./actions-handlers";
import { ManualSelectAttribute, Model } from "@/payload-types";
import { type Attribute, type Option, type Action, type GLTFType, isManualSelectAttribute, ActionHandlerMeta, isUserImageAttribute, isTextureAttribute, isColorAttribute, isPartsAttribute, isBuildingImageAttribute } from './types'
import { ConfigValue, isStringValue } from "./config-value";
import isEqual from 'lodash.isequal';

export function ActionsExecutor({ gltf } : { gltf: GLTFType }) {

    const { model, values, setValue } = useSimpleConfigurator();
    const previousValues = usePrevious(values);

    const unsetValue = useCallback((code: string) => {
        setValue(code, null);
    }, [setValue])
    
    useEffect(() => {
        console.debug("effect diff")
        const diff = computeDiff(values, previousValues);
        console.debug(diff)

        for (const change of diff) {
            console.debug("change", change);

            const { attribute: attributeCode, newValue } = change;
            const attribute = findAttributeByCode(model, attributeCode);

            console.debug("attributeDetails", attribute);
            if (attribute === null) {
                continue;
            }

            if (isManualSelectAttribute(attribute)) {
                console.debug("isSelectAttribute")
                
                if (!newValue || !isStringValue(newValue)) {
                    console.debug("not a string value")
                    continue;
                }
                
                const optionCode = newValue.value;
                const option = findOptionByCode(attribute, optionCode);
                console.debug("optionDetails", option);

                if (option === null) {
                    continue;
                }
    
                if (option.actions && option.actions.length > 0) {
                    const meta : ActionHandlerMeta = {
                        attribute: attribute,
                        value: newValue,
                        values: values,
                        option: option,
                        unsetValue,
                    }
                    console.debug("calling executionActions");
                    execute(gltf, option.actions, meta);
                }
            }

            if (isUserImageAttribute(attribute)) {
                console.debug("isUserImageAttribute");
                const actions = attribute.actions || [];
                const meta : ActionHandlerMeta = {
                    attribute: attribute,
                    value: newValue,
                    values: values,
                    unsetValue,
                }
                console.debug("calling executionActions");
                execute(gltf, actions, meta);
            }

            if (isTextureAttribute(attribute)) {
                console.debug("isTextureAttribute");
                const actions = attribute.actions || [];
                const meta : ActionHandlerMeta = {
                    attribute: attribute,
                    value: newValue,
                    values: values,
                    unsetValue,
                }
                console.debug("calling executionActions");
                execute(gltf, actions, meta);
            }

            if (isColorAttribute(attribute)) {
                console.debug("isColorAttribute");
                const actions = attribute.actions || [];
                const meta : ActionHandlerMeta = {
                    attribute: attribute,
                    value: newValue,
                    values: values,
                    unsetValue,
                }
                console.debug("calling executionActions");
                execute(gltf, actions, meta);
            }

            if (isPartsAttribute(attribute)) {
                console.debug("isPartsAttribute");
                const actions = attribute.actions || [];
                const meta : ActionHandlerMeta = {
                    attribute: attribute,
                    value: newValue,
                    values: values,
                    unsetValue,
                }
                console.debug("calling executionActions");
                execute(gltf, actions, meta);
            }

            if (isBuildingImageAttribute(attribute)) {
                console.debug("isBuildingImageAttribute");
                const actions = attribute.actions || [];
                const meta : ActionHandlerMeta = {
                    attribute: attribute,
                    value: newValue,
                    values: values,
                    unsetValue,
                }
                console.debug("calling executionActions");
                execute(gltf, actions, meta);
            }
        }

    }, [values, previousValues, model, unsetValue, gltf]);

    return null;
}

function execute(gltf: GLTFType, actions: Action[], meta: ActionHandlerMeta) {
    console.debug("execute");
    for (const action of actions) {
        console.debug("action", action);   
        if (action.blockType in actionHandlers) {
            const executor = actionHandlers[action.blockType];
            console.debug("executor func", executor);   
            executor(gltf, action, meta);
        }
    }
}

function findOptionByCode(attributeDetails: ManualSelectAttribute, optionCode: string | null) : Option | null {
    for (const option of attributeDetails.options) {
        if (option.code === optionCode) {
            return option;
        }
    }
    return null;
}

function findAttributeByCode(model: Model, code: string | null) : Attribute | null {
    if (code === null) {
        return null;
    }
    for (const step of model.steps) {
        for (const attribute of step.attributes) {
            if (attribute.code === code) {
                return attribute;
            }
        }
    }
    return null;
}

function computeDiff(values: Record<string, ConfigValue | null>, previousValues: Record<string, ConfigValue | null>) {
    const changes = [];
    for (const attributeCode in values) {

        const newValue = values[attributeCode];

        const oldValue = !previousValues 
            ? null
            : previousValues[attributeCode];

        const changed = !isEqual(newValue, oldValue);
        if (changed) {
            changes.push({
                attribute: attributeCode,
                newValue: newValue,
                oldValue: oldValue
            }) 
        }
    }

    return changes;
}