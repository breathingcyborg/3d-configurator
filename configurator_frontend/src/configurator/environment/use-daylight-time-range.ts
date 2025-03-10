import { useEnvContext } from "./context";
import { getDaylightTimeRange } from "./utils";

export function useDaylightTimeRange() {
    const { date, coords } = useEnvContext();

    if (!date || !coords) {
        return null;
    }

    return getDaylightTimeRange({ date, coords })
}