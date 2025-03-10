import { Sky } from '@react-three/drei';
import { radToDeg } from 'three/src/math/MathUtils.js';
import { useSunAngularPosition, useSunEuclidianPosition } from './utils';
import { useSkyParams } from '../use-exposure';


export function CustomSky() {
    const angularPosition = useSunAngularPosition();
    const position = useSunEuclidianPosition();

    const params = useSkyParams()

    if (angularPosition === null) {
        return null;
    }

    let { altitude, azimuth } = angularPosition;
    altitude = Math.max(altitude, 0.49)

    console.debug(radToDeg(altitude), radToDeg(azimuth));
    console.debug(altitude, azimuth);
    console.debug(position)
    console.debug("")

    return <Sky
        azimuth={azimuth}
        inclination={altitude}
        // turbidity={1}
        {...params}
        // rayleigh={0.5} // Moderate blue sky
        // mieCoefficient={0.01} // Low haze
        // mieDirectionalG={0.8} // More forward scattering
        // distance={150*1000000*1000}
        distance={450000}
        // rayleigh={1}
        // mieCoefficient={0.010}
        // mieDirectionalG={0.26}
        // inclination={0.49}
        // azimuth={0.25}
        // turbidity={8}
        // mieCoefficient={0.005}
        // mieDirectionalG={0.8}
        // rayleigh={1}
    />
}
