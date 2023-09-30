import {Canvas} from "./canvas.mjs";
import {clamp} from "./clamp.mjs";

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

    const ax = Math.floor(cntW * .5) * ah;
    const ay = Math.floor(cntH * .5) * ah
    const bx = clamp(c.mouseX, px, xwidth)
    const by = clamp(c.mouseY, py, ywidth)

    const cx = bx
    const cy = ay

    /**
     * @param {number} num
     * @return {number}
     */
    const f = num => Math.round(num * 100) / 100

    /**
     * @param {number} x
     * @param {number} y
     */
    const point = (x, y) => {
        c
            .lineX(y, x, px - 20, c.colorAxisHelper)
            .text(f((y - py) / ah).toString(), px - 25, y - 4, 0, 'right', c.colorAxisHelper)
            .lineY(x, y, py - 20, c.colorAxisHelper)
            .text(f((x - px) / ah).toString(), x, py - 32, 0, 'center', c.colorAxisHelper)
            .dot(x, y, 5)
    }

    point(ax, ay)
    point(bx, by)

    c
        .lineX(py, px, xwidth)
        .lineY(px, py, ywidth)
        .text('0', px - 14, py - 14)
        .dot(cx, cy, 5)
        .line(ax, ay, bx, by, c.colorDot)
        .line(ax, ay, cx, cy, c.colorDot)
        .line(bx, by, cx, cy, c.colorDot)
        .text('A', ax, ay + 10, 0, 'center', c.colorHelp)
        .text('B', bx, by + 10, 0, 'center', c.colorHelp)
        .text('C', cx, cy + 10, 0, 'center', c.colorHelp)

    {

        const Ax = f((ax - px) / ah);
        const Ay = f((ay - py) / ah);
        const Bx = f((bx - px) / ah);
        const By = f((by - py) / ah);
        const AC = f(Ax - Bx);
        const BC = f(By - Ay);
        const AC2 = f(AC ** 2);
        const BC2 = f(BC ** 2);
        const AB2 = f(AC2 + BC2);

        const pre = document.querySelector('.canvas-distance-pre');
        pre.querySelector('[data-v=ac]').innerHTML = `${Ax} - ${Bx} = ${AC}`
        pre.querySelector('[data-v=bc]').innerHTML = `${By} - ${Ay} = ${BC}`
        pre.querySelector('[data-v=acbc]').innerHTML = `${AC}<sup>2</sup> + ${BC.toFixed(1)}<sup>2</sup> = ${AC2} + ${BC2} = ${AB2}`
        pre.querySelector('[data-v=ab]').innerHTML = `<i>SquareRoot</i>(${AB2}) = ${f(Math.sqrt(AB2))}`

    }

});


export {}
