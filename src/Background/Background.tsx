import * as React from "react";
import './Background.css';
import { useCallback, useEffect, useMemo, useState } from "react";

export function Background(props: React.PropsWithChildren) {
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
    return <div className="container">
        <div className="background">
            <div className="mouse-shadow" style={mouseShadowStyle}></div>
        </div>
        <main>
           {props.children}
        </main>
    </div>
}