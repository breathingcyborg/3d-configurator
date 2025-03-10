import { useGLTF } from "@react-three/drei";
import { ActionsExecutor } from "./actions-executor";
import { useSimpleConfigurator } from "./context";
import { Media } from "@/payload-types";
import { getAssetUrl } from "@/lib/utils/getAssetUrl";
import { useEffect, useState } from "react";
import { SelectiveBloom, EffectComposer } from '@react-three/postprocessing';
import { Object3D } from 'three';

export function Model() {
    const { model } = useSimpleConfigurator();
    const modelUrl = getAssetUrl((model.file as Media).url as string);
    
    const [glowObjs, setGlowObjs] = useState<Object3D[] | null>(null);

    // TODO: we should give position offset in admin
    // Position offset should be such that, 
    // model is placed correctly over building image
    // Building image is placed at 
    // images center in x axis (-modelWidth / 2)
    // 0 in y axis
    // 0 in z axis

    // positionOffset
    // x -> right +ve, left -ve
    // y -> top +ve, bottom -ve
    // x -> out of screen +ve, into the screen -ve
    const positionOffset = [0, 0.1205, 0.5] as const;

    const gltf = useGLTF(modelUrl);

    useEffect(() => {
        const glowObjs : Object3D[] = [];
        if (gltf.scene) {

          gltf.scene.traverse((node) => {
                // @ts-ignore
                // make every object cast and receive shadows
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
                
                // Bloom effect will be applied to this object
                // as it needs to glow
                if (node.userData && node.userData.glow) {
                  glowObjs.push(node);
                }
          });
        }
        setGlowObjs(glowObjs);
      }, [gltf.scene, modelUrl]);

    return <>
      <group castShadow position={positionOffset}>
          <ActionsExecutor gltf={gltf}  />
          <primitive object={gltf.scene} />
      </group>

      {
        glowObjs && glowObjs.length > 0 && <EffectComposer>
          <SelectiveBloom
            selection={glowObjs}
            intensity={10}
            ignoreBackground={true}
          />
        </EffectComposer>
      }
    </>
}
