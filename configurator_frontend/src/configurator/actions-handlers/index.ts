import { Action, ActionHandler } from "../types";
import { manualHideHandler } from "./manualHide";
import { manualSetColorHandler } from "./manualSetColor";
import { setColor } from "./setColor";
import { setTexture } from "./setTexture";
import { setUserImage } from "./setUserImage";
import { manualShowHandler } from "./manualShow";
import { shorPartHandler } from "./showPart";
import { manualSetTextureHandler } from "./manualSetTexture";
import { unsetAttribute } from "./unsetAttribute";

const handlers : Record<Action['blockType'], ActionHandler> = {
    manualHide: manualHideHandler,
    manualSetColor: manualSetColorHandler,
    manualShow: manualShowHandler,
    setUserImage: setUserImage,
    setTexture: setTexture,
    setColorAction: setColor,
    showPart: shorPartHandler,
    manualSetTextureAction: manualSetTextureHandler,
    unsetAttributeAction: unsetAttribute,
}

export default handlers;