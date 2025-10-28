import { useEffect, useState } from "react";

export function useIsMobile() {
    const mql = window.matchMedia("(width <= 600px)");
    const [isMobile, setIsMobile] = useState(mql.matches);
    useEffect(() => {
        const mql = window.matchMedia("(width <= 600px)");
        mql.addEventListener("change", (e) => {
            setIsMobile(e.matches);
        });
        setIsMobile(mql.matches);
    }, [mql]);
    return isMobile;
}