import * as React from "react";
import './Background.css';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function MouseShadow() {
    const [{x,y,width,height}, setShadow] = useState({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    });
    const [visible, setVisible] = useState(true);

    const onMouseMove = useCallback((e: MouseEvent) => {
        setVisible(true);
        setShadow({x: e.clientX, y: e.clientY, width: 100, height: 100});
    }, [setVisible, setShadow]);
    const onMouseOut = useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseout', onMouseOut);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseout', onMouseOut);
        }
    }, [onMouseMove, onMouseOut]);

    const mouseShadowStyle = {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${x}px, ${y}px)`,
        opacity: visible ? '1' : '0'
    };
    return <div className="mouse-shadow" style={mouseShadowStyle}></div>;
}

function PulsateShadow() {
    const [lastPulse, setLastPulse] = useState(0);
    const shadowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = () => {
            if ((Date.now() - lastPulse) < 4000) {
                return;
            }
            shadowRef.current.classList.remove("pulse");
            window.requestAnimationFrame(() => {
                shadowRef.current.classList.add("pulse");
            });
            setLastPulse(Date.now());
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, [lastPulse, setLastPulse]);
    return <div ref={shadowRef} className={"big-shadow"}></div>
}

export function Background(props: React.PropsWithChildren) {
    const [mode, setMode] = useState<"follow-mouse" | "pulsate">("follow-mouse");
    useEffect(() => {
        const mql = window.matchMedia("(width <= 600px)");
        mql.addEventListener("change", (e) => {
            setMode(e.matches ? "pulsate" : "follow-mouse");
        });
        setMode(mql.matches ? "pulsate" : "follow-mouse");
    });
    console.log("bg rerendering");
    return <div className="container">
        <div className="background">
            {mode === "follow-mouse" ? <MouseShadow/> : <PulsateShadow/>}
        </div>
        <main>
           {props.children}
        </main>
    </div>
}