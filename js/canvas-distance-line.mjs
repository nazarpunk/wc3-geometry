import Mouse from "./mouse.mjs";

const div = document.querySelector('.canvas-distance-line');
let visible = false;
let canvas, ctx;

const draw = () => {
    const dpr = devicePixelRatio ?? 1;
    const rect = div.getBoundingClientRect();
    const cw = canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const cx = cw * .5;
    const cy = 60 * dpr;

    ctx.fillStyle = ctx.strokeStyle = "#9de5d9";
    ctx.lineJoin = 'miter'
    ctx.lineWidth = dpr;
    ctx.font = `${12 * dpr}px Arial`;
    ctx.textAlign = 'center'

    ctx.beginPath();

    const p = 40 * dpr;
    ctx.moveTo(p, cy);
    ctx.lineTo(cw - p, cy);

    const aw = (cw - p * 2) / 20;
    const num = 5;

    for (let i = 0; i <= 10; i++) {
        let x = cx + i * aw;

        if (i !== num) {
            ctx.moveTo(x, cy - 5 * dpr);
            ctx.lineTo(x, cy + 5 * dpr);
        }
        ctx.fillText(i.toString(), x, cy - 10 * dpr);

        if (i > 0) {
            let x = cx - i * aw;
            if (i !== num) {
                ctx.moveTo(x, cy - 5 * dpr);
                ctx.lineTo(x, cy + 5 * dpr);
            }
            ctx.fillText(`-${i}`, x, cy - 10 * dpr);
        }
    }

    ctx.stroke();
    ctx.closePath()

    // ====
    ctx.beginPath();
    ctx.fillStyle = ctx.strokeStyle = '#e7b622'

    const point = (x, name) => {
        ctx.fillText(name, x, cy - 30 * dpr);

        let xx = (x - cx) / aw;

        ctx.fillText(xx.toFixed(1), x, cy - 50 * dpr);
        ctx.moveTo(x, cy)
        ctx.arc(x, cy, 5 * dpr, 0, 2 * Math.PI);
    }


    const mx = (Mouse.clientX - rect.x) * dpr;
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const pa = cx - num * aw;
    point(pa, 'A')

    const pb = cx + num * aw;
    point(pb, 'B')

    const px = clamp(mx, cx - 10 * aw, cx + 10 * aw)
    point(px, 'X')

    ctx.textAlign = 'start'
    const aty = cy + 100 * dpr;
    ctx.moveTo(pa, cy)
    ctx.lineTo(pa, aty)
    ctx.moveTo(pa, aty)
    ctx.lineTo(px, aty)

    const av = -num;
    const bv = num;
    const xv = (px - cx) / aw;

    const bty = cy + 50 * dpr
    ctx.moveTo(pb, cy)

    ctx.lineTo(pb, bty)
    ctx.moveTo(pb, bty)
    ctx.lineTo(px, bty)


    ctx.moveTo(px, cy)
    ctx.lineTo(px, cy + 100 * dpr)
    ctx.moveTo(px, cy + 100 * dpr)
    ctx.lineTo(px, cy + 100 * dpr)

    ctx.textAlign = 'left';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath()
    ctx.fillStyle = '#faf'
    ctx.fillText(`AX = |A - X| = |${av.toFixed(1)} - ${xv.toFixed(1)}| = ${Math.abs(av - xv).toFixed(1)}`, pa + 5 * dpr, aty - 5 * dpr);
    ctx.fillText(`XB = |X - B| = |${xv.toFixed(1)} - ${bv.toFixed(1)}| = ${Math.abs(xv - bv).toFixed(1)}`, pb + 5 * dpr, bty - 5 * dpr);
    ctx.fill();
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
            ctx = canvas.getContext('2d');
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
