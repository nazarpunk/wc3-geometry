import {Canvas} from "../canvas.mjs";
import {round} from "../math/round.mjs";

const preD = document.querySelector('.canvas-angle-between-points-pre-diff');
const preA = document.querySelector('.canvas-angle-between-points-pre-angle');
Canvas.observe(document.querySelector('.canvas-angle-between-points'), c => {
    const aw = 4;
    const ah = 30;
    const p = 7;

    const cx = c.width * .5;
    const cy = c.height * .5;

    const xc = Math.floor((c.width * .5 - p) / ah);
    const yc = Math.floor((c.height * .5 - p) / ah);

    const xs = cx - ah * xc;
    const xe = cx + ah * (xc - 1);
    const ys = cy - ah * yc;
    const ye = cy + ah * (yc - 1);

    c
        .lineX(cy, xs, xe) // axis: x
        .arrow(xe, cy, aw * 2, ah, Math.PI * .5)
        .lineY(cx, ys, ye) // Y axis
        .arrow(cx, ye, aw * 2, ah, 0)
        .text('ось X', xs, cy - 20, 0, 'left', c.colorHelp)
        .text('ось Y', cx + 20, ys, Math.PI * -.5, 'left', c.colorHelp)


    for (let i = 1; i <= xc; i++) {
        if (i < xc - 1) {
            const x = cx + ah * i;
            c
                .lineY(x, cy - aw, cy + aw, c.colorAxisMark)
                .text(i.toString(), x, cy + 7, 0)
        }
        const x = cx - ah * i;
        c
            .lineY(x, cy - aw, cy + aw, c.colorAxisMark)
            .text((-i).toString(), x, cy + 7, 0);

    }

    for (let i = 1; i <= yc; i++) {
        if (i < yc - 1) {
            const y = cy + ah * i;
            c
                .lineX(y, cx - aw, cx + aw, c.colorAxisMark)
                .text(i.toString(), cx - 7, y - 4, 0, 'right')
        }
        const y = cy - ah * i;
        c
            .lineX(y, cx - aw, cx + aw, c.colorAxisMark)
            .text((-i).toString(), cx - 7, y - 4, 0, 'right');
    }

    const ax = Math.floor(ah * 2.5 + cx);
    const ay = Math.floor(ah * 4.5 + cy);
    const bx = c.mouseX
    const by = c.mouseY

    /**
     * @param {number} x
     * @param {number} y
     * @param {number[]} dash
     * @return {number[]}
     */
    const mark = (x, y, dash = []) => {
        const vx = (x - cx) / ah;
        const vy = (y - cy) / ah;

        c
            .lineY(x, cy + (y > cy ? -15 : 25), y, c.colorAxisHelper, dash)
            .text(round(vx).toString(), x, cy + (y > cy ? -30 : 30), 0, 'center', c.colorAxisHelper)
            .lineX(y, cx + (x > cx ? -25 : 20), x, c.colorAxisHelper, dash)
            .text(round(vy).toString(), cx + (x > cx ? -30 : 25), y - 3, 0, x > cx ? 'right' : 'left', c.colorAxisHelper)

        return [vx, vy];
    }

    const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);

    const [vax, vay] = mark(ax, ay);
    const [vbx, vby] = mark(bx, by);

    const dx = (vbx - vax) * ah + cx;
    const dy = (vby - vay) * ah + cy;

    const [vdx, vdy] = mark(dx, dy, [5])

    const rad = Math.atan2(vdy, vdx);

    if (rad > 0) c.arc(cx, cy, dist, 0, rad, c.colorDot, [5]);
    else c.arc(cx, cy, dist, rad, 0, c.colorDot, [5]);

    c
        .lineX(ay, ax, ax + dist, c.colorLine, [5])
        .text('B2', ax + dist, ay + 10, 0, 'center', c.colorHelp)
        .dot(ax, ay, 5)
        .text('A', ax, ay + 10, 0, 'center', c.colorHelp)
        .line(ax, ay, bx, by, c.colorDot)
        .text(`deg: ${(rad * 180 / Math.PI).toFixed(2)}`, bx, by + 40, 0, 'center', c.colorHelp)
        .text(`rad: ${rad.toFixed(2)}`, bx, by + 25, 0, 'center', c.colorHelp)
        .text('B', bx, by + 10, 0, 'center', c.colorHelp)
        .dot(bx, by, 5)
        .dot(cx, cy, 5)
        .text('A1', cx + 10, cy + 10, 0, 'left', c.colorHelp)
        .dot(dx, dy, 5)
        .line(cx, cy, dx, dy, c.colorDot, [5])
        .text('B1', dx + 10, dy + 10, 0, 'left', c.colorHelp)
        .dot(ax + dist, ay, 5, c.colorLine);

    preD.querySelector('[data-v=bx]').innerHTML = `${round(vbx)} - ${round(vax)} = ${round(vbx - vax)}`
    preD.querySelector('[data-v=by]').innerHTML = `${round(vby)} - ${round(vay)} = ${round(vby - vay)}`
    preA.querySelector('[data-v=a]').innerHTML = `<i>Atan2</i>(${round(vby)}, ${round(vbx)}) = ${round(rad)}`

})
