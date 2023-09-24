import Mouse from "./mouse.mjs";

const div = document.querySelector('.canvas-002');
let visible = false;
let canvas, ctx;

const draw = () => {
    const dpr = devicePixelRatio ?? 1;
    const rect = div.getBoundingClientRect();
    const cw = canvas.width = rect.width * dpr;
    const ch = canvas.height = rect.height * dpr;
    const cx = cw * .5;
    const cy = ch * .5;
    const radius = Math.min(cx, cy) - 120 * dpr;

    ctx.fillStyle = ctx.strokeStyle = "#9de5d9";
    ctx.lineJoin = 'miter'
    ctx.lineWidth = dpr;
    ctx.font = `${12 * dpr}px Arial`;
    ctx.textAlign = 'center'


    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);

    // deg
    for (let a = 0; a < 360; a += 10) {
        const rad = a * (Math.PI / 180);

        ctx.save();
        ctx.translate(cx + radius * Math.cos(rad), cy + radius * Math.sin(rad));
        ctx.rotate(rad);

        ctx.moveTo(0, 0);
        ctx.lineTo(dpr * -20, 0);

        ctx.rotate(Math.PI * .5)

        ctx.fillText((360 - a).toString(), 0, 40 * dpr);
        ctx.restore();
    }

    // rad
    for (let rad = 0; rad < 6.29; rad += .1) {
        ctx.save();
        ctx.translate(cx + radius * Math.cos(rad), cy + radius * Math.sin(rad));
        ctx.rotate(rad);

        ctx.moveTo(0, 0);
        ctx.lineTo(dpr * 20, 0);

        ctx.rotate(Math.PI * .5)

        ctx.fillText((Math.PI * 2 - rad).toFixed(1), 0, -40 * dpr);
        ctx.restore();
    }


    ctx.stroke();
    ctx.closePath()

    // === cursor
    ctx.beginPath();
    ctx.strokeStyle = '#e7b622'

    const mx = (Mouse.clientX - rect.x) * dpr;
    const my = (Mouse.clientY - rect.y) * dpr;

    const rad = Math.atan2(cy - my, cx - mx) + Math.PI;

    ctx.moveTo(cx, cy)
    const nx = cx + radius * Math.cos(rad);
    const ny = cy + radius * Math.sin(rad);
    ctx.lineTo(nx, ny)

    ctx.closePath()
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#797975'
    const dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
    if (dist > radius) {
        ctx.moveTo(nx, ny)
        ctx.lineTo(mx, my)
    }
    ctx.closePath()
    ctx.stroke();

    ctx.save();
    ctx.translate(cx + radius * Math.cos(rad), cy + radius * Math.sin(rad));
    ctx.rotate(rad);
    ctx.rotate(Math.PI * .5)

    const nrad = Math.PI * 2 - rad;
    ctx.textAlign = 'start'
    ctx.fillText((nrad * (180 / Math.PI)).toFixed(1), 10 * dpr, 80 * dpr);
    ctx.fillText(nrad.toFixed(1), 10 * dpr, -80 * dpr);
    ctx.textAlign = 'end'
    ctx.fillText('радианы', -10 * dpr, -80 * dpr);
    ctx.fillText('градусы', -10 * dpr, 80 * dpr);

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
