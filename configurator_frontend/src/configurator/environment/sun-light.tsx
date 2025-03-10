import { useSunEuclidianPosition } from "./utils";

export function SunLight() {
    const position = useSunEuclidianPosition();

    if (!position) {
        return null;
    }
    return <directionalLight
        position={position.multiplyScalar(10)}
        color={'#fffffd'}
        intensity={10}
        castShadow={true}
        shadow-intensity={1}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
    />
}