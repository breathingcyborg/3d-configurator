import { useLoader } from "@react-three/fiber";
import { BuildingImageValue } from "./config-value";
import { useSimpleConfigurator } from "./context"
import { isBuildingImageAttribute } from "./types";
import { TextureLoader } from "three";

export function BuildingImage() {
    const { model, values } = useSimpleConfigurator();
    const attribute = model?.steps?.flatMap(step => step?.attributes || []).find(attr => isBuildingImageAttribute(attr));
    const value = !!attribute
        ? values[attribute.code] as BuildingImageValue | null
        : null;
    
    if (!value) {
        return null;
    }

    return <BuildingImageMesh value={value} />
}

function BuildingImageMesh({
    value
} : {
    value: BuildingImageValue
}) {
    const { url, imageWidthMeters, imageHeightMeters } = value.value;
    const texture = useLoader(TextureLoader, url);
    return <mesh receiveShadow position={[ 0, imageHeightMeters/2, 0 ]}>
        <planeGeometry args={[imageWidthMeters, imageHeightMeters]} />
        <meshBasicMaterial map={texture} />
    </mesh>
}