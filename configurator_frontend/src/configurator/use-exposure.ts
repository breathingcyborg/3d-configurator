import { useSunEuclidianPosition } from "./environment/utils";

export function useExposure() {
    const position = useSunEuclidianPosition();
    if (!position) {
        return null;
    }

    if (position.y <= 0) {
        return 2;
    }

    return 0.5;
}

export function useSkyParams() {
    const position = useSunEuclidianPosition();
    if (!position) {
        return {}
    }

    if (position.y <= 0) {
        return { rayleigh: 3, mieCoefficient: 0.005, mieDirectionalG: 0.7, turbidity: 10 };
    }

    return { rayleigh: 3, mieCoefficient: 0.005, mieDirectionalG: 0.7, turbidity: 10 };
}