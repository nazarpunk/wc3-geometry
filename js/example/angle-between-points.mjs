import {Canvas} from "../draw/canvas.mjs";
import {round} from "../math/round.mjs";
import {Axis} from "../draw/axis.mjs";

const preD = document.querySelector('.canvas-angle-between-points-pre-diff');
const preA = document.querySelector('.canvas-angle-between-points-pre-angle');

const axis = new Axis();
Canvas.observe(document.querySelector('.canvas-angle-between-points'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    const ax = 2.5;
    const ay = 4.5;

    const bx = axis.mouseX
    const by = axis.mouseY

    const b1x = bx - ax
    const b1y = by - ay

    const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
    const rad = Math.atan2(b1y, b1x);

    const b2x = ax + dist
    const b2y = ay

    const [r1, r2] = rad > 0 ? [0, rad] : [rad, 0]

    axis
        .line(ax, ay, bx, by, {color: c.color.point.dot})
        .line(ax, ay, b2x, b2y, {color: c.color.axis.line, dash: [5]})
        .line(0, 0, b1x, b1y, {color: c.color.point.dot, dash: [5]})
        .arc(0, 0, dist, r1, r2, {color: c.color.point.dot, dash: [5]})
        .point(ax, ay, {name: 'A'})
        .point(0, 0, {name: 'A1', track: false})
        .point(bx, by, {
            name: ['B', `deg: ${(rad * 180 / Math.PI).toFixed(2)}`, `rad: ${rad.toFixed(2)}`]
        })
        .point(b1x, b1y, {name: 'B1', dash: [5]})
        .point(b2x, b2y, {name: 'B2', track: false, color: c.color.axis.line})

    preD.querySelector('[data-v=bx]').innerHTML = `${round(bx).toFixed(2)} - ${round(ax).toFixed(2)} = ${round(bx - ax).toFixed(2)}`
    preD.querySelector('[data-v=by]').innerHTML = `${round(by).toFixed(2)} - ${round(ay).toFixed(2)} = ${round(by - ay).toFixed(2)}`
    preA.querySelector('[data-v=a]').innerHTML = `<i>Atan2</i>(${round(by).toFixed(2)}, ${round(bx).toFixed(2)}) = ${round(rad).toFixed(2)}`

});
