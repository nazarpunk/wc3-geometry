import {Canvas} from '../draw/canvas.mjs';
import {clamp} from "../math/clamp.mjs";

Canvas.observe(document.querySelector('.canvas-distance-line'), c => {
    const p = 40;

    const cx = c.width * .5;
    const cy = c.height - 80;
    const ah = (c.width - p * 2) / 20;
    const num = 5;

    for (let i = 0; i <= 10; i++) {
        let x = cx + i * ah;

        if (i !== num) c.lineY(x, cy - 5, cy + 5)
        c.text(i.toString(), x, cy + 10);

        if (i > 0) {
            let x = cx - i * ah;
            if (i !== num) c.lineY(x, cy - 5, cy + 5)
            c.text(`-${i}`, x, cy + 10);
        }
    }
    c.lineX(cy, p, c.width - p)

    const point = (x, name) => {
        c.text(name, x, cy + 30, 0, 'center', c.color.point.dot);
        let xx = (x - cx) / ah;

        c.text(xx.toFixed(1), x, cy + 50, 0, 'center', c.color.point.dot)
            .dot(x, cy, 5)
    }

    const pa = cx - num * ah;
    const pb = cx + num * ah;
    const px = clamp(c.mouseX, cx - 10 * ah, cx + 10 * ah)
    const aty = cy - 100;
    const bty = cy - 50

    c.lineX(aty, pa, px, c.color.point.line);
    c.lineY(pa, cy, aty, c.color.point.line)

    const av = -num;
    const bv = num;
    const xv = (px - cx) / ah;

    c.lineX(bty, pb, px, c.color.point.line);
    c.lineY(pb, cy, bty, c.color.point.line);
    c.lineY(px, cy, cy - 100, c.color.point.line)

    point(pa, 'A')
    point(pb, 'B')
    point(px, 'X')


    c.text(`AX = |A - X| = |${av.toFixed(1)} - ${xv.toFixed(1)}| = ${Math.abs(av - xv).toFixed(1)}`, pa + 5, aty + 5, 0, 'left', c.color.point.text);
    c.text(`XB = |X - B| = |${xv.toFixed(1)} - ${bv.toFixed(1)}| = ${Math.abs(xv - bv).toFixed(1)}`, pb - 5, bty + 5, 0, 'right', c.color.point.text);
})