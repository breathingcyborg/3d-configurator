import { useEffect, useState } from "react";

export function useInIframe() {
    const [inIframe, setInIframe] = useState(window.top != window.self);

    useEffect(() => {

        const checkIframe = () => {
            setInIframe(window.top != window.self);
        }

        const timeoutId = setTimeout(checkIframe, 1000);

        return () => clearTimeout(timeoutId)
    }, [])

    return inIframe;
}