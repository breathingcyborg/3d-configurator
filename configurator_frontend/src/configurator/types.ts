import { BuildingImageAttribute, ColorAttribute, ColorOption, ManualHideAction, ManualSelectAttribute, ManualSetColorAction, ManualSetTextureAction, ManualShowAction, PartsAttribute, SetColorAction, SetTextureAction, SetUserImageAction, ShowPartAction, TextOption, TextureAttribute, UnsetAttributeAction, UserImageAttribute } from "@/payload-types";
import type { useGLTF } from "@react-three/drei";
import { ConfigValue } from "./config-value";

export type Attribute = ManualSelectAttribute | UserImageAttribute | TextureAttribute | ColorAttribute | PartsAttribute | BuildingImageAttribute;
export type Option = TextOption | ColorOption;
export type Action = ManualShowAction | ManualHideAction | ManualSetColorAction | SetColorAction | SetUserImageAction | SetTextureAction | SetColorAction | ShowPartAction | ManualSetTextureAction | UnsetAttributeAction;

export type ActionHandlerMeta = {
    attribute: Attribute,
    value: ConfigValue | null,
    values: Record<string, ConfigValue | null>,
    option?: Option,
    unsetValue: (code: string) => void,
}

export type GLTFType = ReturnType<typeof useGLTF<string>>;

export type ActionHandler = (gltf: GLTFType, action: Action, meta: ActionHandlerMeta) => void | Promise<void>

export function isManualHideAction(action: Action) : action is ManualHideAction {
    return action.blockType === 'manualHide';
}

export function isManualShowAction(action: Action) : action is ManualShowAction {
    return action.blockType === 'manualShow';
}

export function isManualSetColorAction(action: Action) : action is ManualSetColorAction {
    return action.blockType === 'manualSetColor';
}

export function isManualSetTextureAction(action: Action) : action is ManualSetTextureAction {
    return action.blockType === 'manualSetTextureAction';
}

export function isSetUserImageAction(action: Action) : action is SetUserImageAction {
    return action.blockType === 'setUserImage';
}

export function isSetTextureAction(action: Action) : action is SetTextureAction {
    return action.blockType === 'setTexture';
}

export function isSetColorAction(action: Action) : action is SetColorAction {
    return action.blockType === 'setColorAction';
}


export function isUnsetAttributeHandler(action: Action) : action is UnsetAttributeAction {
    return action.blockType === 'unsetAttributeAction';
}


export function isShowPartAction(action: Action) : action is ShowPartAction {
    return action.blockType === 'showPart';
}

export function isManualSelectAttribute(attribute: Attribute) : attribute is ManualSelectAttribute {
    return attribute.blockType === 'manualSelectAttribute';
}

export function isUserImageAttribute(attribute: Attribute) : attribute is UserImageAttribute {
    return attribute.blockType === 'userImage';
}

export function isTextureAttribute(attribute: Attribute) : attribute is TextureAttribute {
    return attribute.blockType === 'textureAttribute';
}

export function isColorAttribute(attribute: Attribute) : attribute is ColorAttribute {
    return attribute.blockType === 'colorAttribute';
}

export function isPartsAttribute(attribute: Attribute) : attribute is PartsAttribute {
    return attribute.blockType === 'partsAttribute';
}

export function isBuildingImageAttribute(attribute: Attribute) : attribute is BuildingImageAttribute {
    return attribute.blockType === 'buildingImage';
}

export function isTextOption(option: Option) : option is TextOption {
    return option.blockType === 'text';
}

export function isColorOption(option: Option) : option is ColorOption {
    return option.blockType === 'color';
}