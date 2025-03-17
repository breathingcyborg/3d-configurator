import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, DragControls, Environment } from "@react-three/drei";
import { Model } from "./model";
import { useSimpleConfigurator } from './context';
import { BuildingImage } from './building-image';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { GroundPlane } from './environment/ground-plane';
import { Lights } from './lights';
import { useEnvContext } from './environment/context';
import { NoToneMapping } from 'three';
import { getPublicUrl } from '@/lib/utils/urlUtils';


export function Scene() {
    const { model, } = useSimpleConfigurator();
    const orbitControlsRef = useRef<OrbitControlsImpl>(null);
    const [key, setKey] = useState(1);
    const { skyVisible } = useEnvContext();

    useEffect(() => {
        setKey(k => k + 1)
    }, [model]);

    return <Canvas
        gl={{
            // Tone mapping needs to be disable for lights to work correctly
            // 
            // By default toneMapping is set to ACESFilmicToneMapping, 
            // but emissive materials dont work with this toneMapping.
            // 
            // For lights we need to use emissive materials and set its emissive intensity.
            // This is because we apply bloom filter to the light source to make it glow,
            // and emissive materials are the simplest approach to do this as they dont need any addional light sources
            toneMapping: NoToneMapping,
        }}
        shadows
        camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 2, 5]
        }}
    >
        {/* <axesHelper args={[5]} />
        <gridHelper args={[10, 10]} /> */}
        <OrbitControls
            ref={orbitControlsRef} />
        <BuildingImage/>
            
        {/* <CustomSky /> */}
        <Environment
            background={skyVisible}
            files={getPublicUrl("/hdr/kloofendal_48d_partly_cloudy_puresky_2k.hdr")}
        >
        </Environment>

        <group position={[0, -0.5, -6]}>
            <GroundPlane />
        </group>
        
        <Lights />

        <DragControls
            key={key}
            onDragStart={() => {
                if (orbitControlsRef?.current) {
                    orbitControlsRef.current.enabled = false;
                }
            }}
            onDragEnd={() => {
                if (orbitControlsRef.current) {
                    orbitControlsRef.current.enabled = true;
                }
            }}
            dragLimits={[undefined, undefined, [0, 0]]}
            // // TODO: save and restore local matrix
            // onDrag={(local, delta) => {
            // 
            // }}
        >
            <Model />
        </DragControls>
    </Canvas>
}