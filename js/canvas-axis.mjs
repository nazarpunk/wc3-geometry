import Mouse from "./mouse.mjs";

const div = document.querySelector('.canvas-axis');
let visible = false;
let canvas, ctx;

const draw = () => {
    const dpr = devicePixelRatio ?? 1;
    const rect = div.getBoundingClientRect();
    const cw = canvas.width = rect.width * dpr;
    const ch = canvas.height = rect.height * dpr;
    const cx = cw * .5;
    const cy = ch * .5;
    const p = 16 * dpr;

    ctx.fillStyle = ctx.strokeStyle = "#9de5d9";
    ctx.lineJoin = 'miter'
    ctx.lineWidth = dpr;
    const aw = 20 * dpr;
    const ah = 5 * dpr;

    // === axis
    ctx.beginPath();
    // axis: x
    ctx.moveTo(p, cy);
    ctx.lineTo(cw - aw - p, cy);

    // arrow: x
    ctx.moveTo(cw - p, cy);
    ctx.lineTo(cw - aw - p, cy - ah)
    ctx.lineTo(cw - aw - p, cy + ah)
    ctx.lineTo(cw - p, cy);

    // axis: y
    ctx.moveTo(cx, ch - p);
    ctx.lineTo(cx, p + aw);

    // arrow: y
    ctx.moveTo(cx, p);
    ctx.lineTo(cx - ah, aw + p);
    ctx.lineTo(cx + ah, aw + p);
    ctx.lineTo(cx, p);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // == cell
    ctx.font = `${12 * dpr}px Arial`;
    ctx.beginPath();
    const cs = 30 * dpr;
    // cell : x right
    let n = cx + cs;
    let i = 0;
    const tp = 12 * dpr;

    ctx.textAlign = 'left'
    ctx.fillText(`ось X`, p, cy + tp * 2);
    ctx.save();
    ctx.translate(cx + tp * 2, ch - p);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`ось Y`, 0, 0);
    ctx.restore();

    ctx.textAlign = 'center'
    while (n < cw - aw - p) {
        i += 1;
        ctx.moveTo(n, cy - ah);
        ctx.lineTo(n, cy + ah);
        ctx.fillText(`${i}`, n, cy - tp);

        const x = cw - n;
        ctx.moveTo(x, cy - ah);
        ctx.lineTo(x, cy + ah);
        ctx.fillText(`${-i}`, x, cy - tp);
        n += cs;
    }

    n = cy + cs;
    i = 0;
    while (n < ch - aw - p) {
        i += 1;

        ctx.moveTo(cx - ah, n);
        ctx.lineTo(cx + ah, n);

        ctx.save();
        ctx.translate(cx - tp, n);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${-i}`, 0, 0);
        ctx.restore();

        ctx.moveTo(cx - ah, ch - n);
        ctx.lineTo(cx + ah, ch - n);

        ctx.save();
        ctx.translate(cx - tp, ch - n);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${i}`, 0, 0);
        ctx.restore();

        n += cs;
    }

    ctx.closePath();
    ctx.stroke();

    // == cursor
    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle = '#e7b622'

    const mx = (Mouse.clientX - rect.x) * dpr;
    const my = (Mouse.clientY - rect.y) * dpr;

    ctx.moveTo(mx, cy)
    ctx.lineTo(mx, my)

    ctx.moveTo(cx, my)
    ctx.lineTo(mx, my)

    ctx.closePath();
    ctx.stroke();

    // == cordinates
    ctx.textAlign = 'left'
    const ux = (mx - cx) / cs;
    const uy = (my - cy) / cs;

    ctx.fillText(`x:${ux.toFixed(2)}, y:${-uy.toFixed(2)}`, mx + tp, my - tp);

}

let raf = 0;
const redraw = () => {
    if (!visible) return;
    draw();
    raf = requestAnimationFrame(redraw);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const v = entry.intersectionRatio > 0
        if (visible) {
            if (v) return
        } else {
            if (!v) return
        }
        visible = v

        if (visible) {
            canvas = document.createElement('canvas');
            ctx = canvas.getContext("2d");
            div.appendChild(canvas);
            redraw();
        } else {
            canvas.remove();
            canvas = null;
            cancelAnimationFrame(raf)
        }


    });
}, {
    threshold: [1, .1, 0]
});
observer.observe(div);


export {}
