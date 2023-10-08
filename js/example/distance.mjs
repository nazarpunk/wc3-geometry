import {Canvas} from "../draw/canvas.mjs";
import {clamp} from "../math/clamp.mjs";
import {round} from "../math/round.mjs";
const pre = document.querySelector('.canvas-distance-pre');
Canvas.observe(document.querySelector('.canvas-distance'), c => {
    const px = 55;
    const py = 40;
    const ah = 30;

    const cntW = Math.floor((c.width - px) / ah);
    const cntH = Math.floor((c.height - py) / ah);

    for (let i = 1; i < cntW; i++) {
        const x = px + ah * i
        c
            .lineY(x, py, py + 10)
            .text(i.toString(), x, py - 14)
    }
    for (let i = 1; i < cntH; i++) {
        const y = py + ah * i;
        c
            .lineX(y, px, px + 10)
            .text(i.toString(), px - 4, y - 4, 0, 'right')
    }

    const xwidth = px + ah * (cntW - 1);
    const ywidth = py + ah * (cntH - 1);

    const ax = Math.floor(cntW * .5) * ah - ah * .5 + px;
    const ay = Math.floor(cntH * .5) * ah - ah * .5 + py
    const bx = clamp(c.mouseX, px, xwidth)
    const by = clamp(c.mouseY, py, ywidth)

    const cx = bx
    const cy = ay


    /**
     * @param {number} x
     * @param {number} y
     */
    const point = (x, y) => {
        c
            .lineX(y, x, px - 20, c.color.point.line)
            .text(round((y - py) / ah).toString(), px - 25, y - 4, 0, 'right', c.color.point.line)
            .lineY(x, y, py - 20, c.color.point.line)
            .text(round((x - px) / ah).toString(), x, py - 32, 0, 'center', c.color.point.line)
            .dot(x, y, 5)
    }

    point(ax, ay)
    point(bx, by)

    c
        .lineX(py, px, xwidth)
        .lineY(px, py, ywidth)
        .text('0', px - 14, py - 14)
        .dot(cx, cy, 5)
        .line(ax, ay, bx, by, c.color.point.dot)
        .line(ax, ay, cx, cy, c.color.point.dot)
        .line(bx, by, cx, cy, c.color.point.dot)
        .text('A', ax, ay + 10, 0, 'center', c.color.point.text)
        .text('B', bx, by + 10, 0, 'center', c.color.point.text)
        .text('C', cx, cy + 10, 0, 'center', c.color.point.text)

    {

        const Ax = round((ax - px) / ah);
        const Ay = round((ay - py) / ah);
        const Bx = round((bx - px) / ah);
        const By = round((by - py) / ah);
        const AC = round(Ax - Bx);
        const BC = round(By - Ay);
        const AC2 = round(AC ** 2);
        const BC2 = round(BC ** 2);
        const AB2 = round(AC2 + BC2);

        pre.querySelector('[data-v=ac]').innerHTML = `${Ax} - ${Bx} = ${AC}`
        pre.querySelector('[data-v=bc]').innerHTML = `${By} - ${Ay} = ${BC}`
        pre.querySelector('[data-v=acbc]').innerHTML = `${AC}<sup>2</sup> + ${BC.toFixed(1)}<sup>2</sup> = ${AC2} + ${BC2} = ${AB2}`
        pre.querySelector('[data-v=ab]').innerHTML = `<i>SquareRoot</i>(${AB2}) = ${round(Math.sqrt(AB2))}`
    }

});
