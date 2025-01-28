const settings = {
    ballAcceleration: 5
};
function setupMouseWatcher() {
    const mousePos = {
        x: 0,
        y: 0
    };
    let mouseInScreen = true;
    const ball = {
        pos: {
            x: 0,
            y: 0
        },
        size: {
            width: 100,
            height: 100
        }
    };
    const shadow = document.querySelector('.mouse-shadow');
    document.addEventListener('mousemove', (e)=>{
        mouseInScreen = true;
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
    });
    document.addEventListener('mouseout', (e)=>{
        mouseInScreen = false;
    });
    const tick = ()=>{
        if (mouseInScreen) {
            ball.pos.x = mousePos.x;
            ball.pos.y = mousePos.y;
        }
        shadow.style.opacity = !mouseInScreen ? '0' : '1';
        shadow.style.transform = `translate(${ball.pos.x}px, ${ball.pos.y}px)`;
        shadow.style.width = `${ball.size.width}px`;
        shadow.style.height = `${ball.size.height}px`;
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}
function init() {
    setupMouseWatcher();
}
window.addEventListener('DOMContentLoaded', init);

//# sourceMappingURL=index.377278e2.js.map
