import Mouse from "./mouse.mjs";
import {Canvas} from "./canvas.mjs";

Canvas.observe(document.querySelector('.canvas-distance'), canvas => {
    const dpr = canvas.dpr;
    const rect = canvas.div.getBoundingClientRect();
    const cw = canvas.canvas.width = rect.width * dpr;
    const ch = canvas.canvas.height = rect.height * dpr;
    const cx = cw * .5;
    const cy = 60 * dpr;

    const ctx = canvas.ctx;

    ctx.fillStyle = ctx.strokeStyle = "#9de5d9";
    ctx.lineJoin = 'miter'
    ctx.lineWidth = dpr;
    ctx.font = `${12 * dpr}px Arial`;
    ctx.textAlign = 'center'
    const px = 40 * dpr;
    const py = 30 * dpr;

    const aw = 30 * dpr;

    ctx.beginPath()
    const cntW = Math.floor((cw - px) / aw);
    for (let i = 0; i < cntW; i++) {
        const x = px + aw * i;
        ctx.moveTo(x, py);
        ctx.lineTo(x, py + 10 * dpr);
        ctx.fillText(i.toString(), x, py - 10 * dpr)
    }
    ctx.moveTo(px, py);
    ctx.lineTo(px + aw * (cntW - 1), py);

    ctx.textAlign = 'end'
    const cntH = Math.ceil((ch - py) / aw);
    for (let i = 1; i < cntH; i++) {
        const y = py + aw * i;
        ctx.moveTo(px, y);
        ctx.lineTo(px + 10 * dpr, y);
        ctx.fillText(i.toString(), px - 10 * dpr, y)
    }
    ctx.moveTo(px, py);
    ctx.lineTo(px, py + aw * (cntH - 1));

    ctx.stroke();
    ctx.closePath();

});


export {}
