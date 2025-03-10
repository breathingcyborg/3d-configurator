import { createContext, useContext, useState } from "react"

export type EnvContextType = {
    // coordinates
    coords: { lat: number, lng: number },
    setCoords: (coords: { lat: number, lng: number }) => void,

    // Date in browsers timezone (ignore time part of this date)
    date: Date | null,
    setDate: (date: Date | null) => void,

    // Time in timezone of location specified by coords
    time: string | null,
    setTime: (time: string | null) => void,

    groundVisible: boolean;
    setGroundVisible: (visible: boolean) => void 

    skyVisible: boolean;
    setSkyVisible: (visible: boolean) => void 
}


const EnvContext = createContext<EnvContextType>({
    coords: { lat: 40.68686443179774, lng:  -73.87806890742739  },
    setCoords: () => {},

    date: new Date(),
    setDate: () => {},

    time: "13:00",
    setTime: () => {},

    groundVisible: false,
    setGroundVisible: ()  => {},

    skyVisible: false,
    setSkyVisible: () => {},
})

type InitialEnvValues = {
    coords: { lat: number, lng: number },
    date: string | null,
    time: string | null,
    groundVisible: boolean,
    skyVisible: boolean,
}

export const EnvContextProvider = ({ children, initialValues } : { children: React.ReactNode, initialValues?: InitialEnvValues }) => {
    // new york coordinates
    const [coords, setCoords] = useState(initialValues?.coords || { lat: 40.68686443179774, lng:  -73.87806890742739 });

    // date in browsers timezone (ignore time part of this date)
    const [date, setDate] = useState<Date | null>(initialValues?.date ? new Date(initialValues.date) : new Date());

    // time in timezone specified by coords
    const [time, setTime] = useState<string | null>(initialValues?.time || "13:00");

    // grounds visibility
    const [groundVisible, setGroundVisible] = useState<boolean>(initialValues?.groundVisible || true);

    // skys visiblity
    const [skyVisible, setSkyVisible] = useState<boolean>(initialValues?.skyVisible || true);

    const value : EnvContextType = {
        coords,
        setCoords,
        date,
        setDate,
        time,
        setTime,
        groundVisible,
        setGroundVisible,
        skyVisible,
        setSkyVisible,
    }

    return <EnvContext.Provider value={value}>
        { children }
    </EnvContext.Provider>
}

export const useEnvContext = () => useContext(EnvContext);
