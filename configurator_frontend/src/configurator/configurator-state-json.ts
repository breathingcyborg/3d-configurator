import { ConfigValue } from "./config-value";

export type ConfiguratorStateJson = {
    values: Record<string, ConfigValue | null>;
    env: {
        coords: { lat: number; lng: number; };
        date: string | null;
        time: string | null;
        groundVisible: boolean;
        skyVisible: boolean;
    };
};
