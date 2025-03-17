import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import { useEnvContext } from "./context";
import { getPublicUrl } from "@/lib/utils/urlUtils";

export function GroundPlane() {

    const { groundVisible } = useEnvContext();

    const [ambientMap, colorMap, displacementMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
        getPublicUrl('/3d/concrete_texture/ao.jpg'),
        getPublicUrl('/3d/concrete_texture/diff.jpg'),
        getPublicUrl('/3d/concrete_texture/disp.jpg'),
        getPublicUrl('/3d/concrete_texture/nor_dx.jpg'),
        getPublicUrl('/3d/concrete_texture/rough.jpg'),
    ]);

    colorMap.repeat.set(10, 10);
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;

    roughnessMap.repeat.set(10, 10);
    roughnessMap.wrapS = RepeatWrapping;
    roughnessMap.wrapT = RepeatWrapping;

    displacementMap.repeat.set(10, 10);
    displacementMap.wrapS = RepeatWrapping;
    displacementMap.wrapT = RepeatWrapping;

    ambientMap.repeat.set(10, 10);
    ambientMap.wrapS = RepeatWrapping;
    ambientMap.wrapT = RepeatWrapping;

    normalMap.repeat.set(10, 10);
    normalMap.wrapS = RepeatWrapping;
    normalMap.wrapT = RepeatWrapping;

    if (!groundVisible) {
        return null;
    }

    return <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[10, 200]} />
        <meshStandardMaterial
            metalness={0}
            roughnessMap={roughnessMap}
            map={colorMap}
            displacementMap={displacementMap}
            displacementScale={0.1}
            normalMap={normalMap}
            aoMap={ambientMap} />
    </mesh>;
}
