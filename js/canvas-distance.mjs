import {Canvas} from "./canvas.mjs";

Canvas.observe(document.querySelector('.canvas-distance'), c => {

    const dpr = c.dpr;
    if (dpr > 0) return;

    const cw = c.canvas.width;
    const ch = c.canvas.height;

    const ctx = c.ctx;
    const px = 40;
    const py = 30;
    const aw = 30;

    const cntW = Math.floor((cw - px) / aw);
    for (let i = 0; i < cntW; i++) {
        c.lineY(px + aw * i, py + 10 * dpr, py)
        //ctx.fillText(i.toString(), x,)
    }

    ctx.beginPath()
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
