import Mouse from "./mouse.mjs";

const div = document.querySelector('.canvas-001');
let visible = false;
let canvas, ctx;

const draw = () => {
    const dpr = devicePixelRatio ?? 1;
    const rect = div.getBoundingClientRect();
    const cw = canvas.width = rect.width * dpr;
    const ch = canvas.height = rect.height * dpr;
    const hcw = cw * .5;
    const hch = ch * .5;
    const p = 16 * dpr;

    ctx.fillStyle = ctx.strokeStyle = "#9de5d9";
    ctx.lineJoin = 'miter'
    ctx.lineWidth = dpr;
    const aw = 20 * dpr;
    const ah = 5 * dpr;

    // === axis
    ctx.beginPath();
    // axis: x
    ctx.moveTo(p, hch);
    ctx.lineTo(cw - aw - p, hch);

    // arrow: x
    ctx.moveTo(cw - p, hch);
    ctx.lineTo(cw - aw - p, hch - ah)
    ctx.lineTo(cw - aw - p, hch + ah)
    ctx.lineTo(cw - p, hch);

    // axis: y
    ctx.moveTo(hcw, ch - p);
    ctx.lineTo(hcw, p + aw);

    // arrow: y
    ctx.moveTo(hcw, p);
    ctx.lineTo(hcw - ah, aw + p);
    ctx.lineTo(hcw + ah, aw + p);
    ctx.lineTo(hcw, p);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // == cell
    ctx.font = `${12 * dpr}px Arial`;
    ctx.beginPath();
    const cs = 30 * dpr;
    // cell : x right
    let n = hcw + cs;
    let i = 0;
    const tp = 12 * dpr;

    ctx.textAlign = 'left'
    ctx.fillText(`ось X`, p, hch + tp * 2);
    ctx.save();
    ctx.translate(hcw + tp * 2, ch - p);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`ось Y`, 0, 0);
    ctx.restore();

    ctx.textAlign = 'center'
    while (n < cw - aw - p) {
        i += 1;
        ctx.moveTo(n, hch - ah);
        ctx.lineTo(n, hch + ah);
        ctx.fillText(`${i}`, n, hch - tp);

        const x = cw - n;
        ctx.moveTo(x, hch - ah);
        ctx.lineTo(x, hch + ah);
        ctx.fillText(`${-i}`, x, hch - tp);
        n += cs;
    }

    n = hch + cs;
    i = 0;
    while (n < ch - aw - p) {
        i += 1;

        ctx.moveTo(hcw - ah, n);
        ctx.lineTo(hcw + ah, n);

        ctx.save();
        ctx.translate(hcw - tp, n);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${-i}`, 0, 0);
        ctx.restore();

        ctx.moveTo(hcw - ah, ch - n);
        ctx.lineTo(hcw + ah, ch - n);

        ctx.save();
        ctx.translate(hcw - tp, ch - n);
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

    ctx.moveTo(mx, hch)
    ctx.lineTo(mx, my)

    ctx.moveTo(hcw, my)
    ctx.lineTo(mx, my)

    ctx.closePath();
    ctx.stroke();

    // == cordinates
    ctx.textAlign = 'left'
    const ux = (mx - hcw) / cs;
    const uy = (my - hch) / cs;

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
