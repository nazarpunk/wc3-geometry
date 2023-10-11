import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";
import {AngleNormalize} from "../math/angle-normalize.mjs";
import {round} from "../math/round.mjs";
import {AngleDistance} from "../math/angle-distance.mjs";

const axis = new Axis();

let ax = -1.5
let ay = -2.2
let bx = 2.5
let by = 1.5

const prea = document.querySelector('.canvas-angle-distance-pre-a')
const preb = document.querySelector('.canvas-angle-distance-pre-b')

Canvas.observe(document.querySelector('.canvas-angle-distance'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    });

    if (axis.mouseLeftX !== null) {
        ax = axis.mouseLeftX
        ay = axis.mouseLeftY
    }

    if (axis.mouseRightX !== null) {
        bx = axis.mouseRightX
        by = axis.mouseRightY
    }

    const AB = round(Math.atan2(by - ay, bx - ax))
    const abD = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2)

    const ab1A = AB - AB

    const b1x = Math.cos(ab1A) * abD + ax
    const b1y = Math.sin(ab1A) * abD + ay

    const cx = axis.mouseX
    const cy = axis.mouseY

    const AC = round(Math.atan2(cy - ay, cx - ax))
    const acD = Math.sqrt((cx - ax) ** 2 + (cy - ay) ** 2)

    const AC1 = round(AC - AB);

    const c1x = Math.cos(AC1) * acD + ax
    const c1y = Math.sin(AC1) * acD + ay

    axis
        .line(ax, ay, bx, by, {color: c.color.point.dot})
        .line(ax, ay, cx, cy, {color: c.color.point.dot})
        .line(ax, ay, b1x, b1y, {dash: [5]})
        .line(ax, ay, c1x, c1y, {dash: [5]})
        .arc(ax, ay, Math.min(abD, acD) * .75, AB, AC, {color: c.color.point.dot})
        .arc(ax, ay, Math.min(abD, acD) * .5, ab1A, AC1, {color: c.color.point.line, dash: [5]})
        .point(ax, ay, {name: 'A', track: false})
        .point(bx, by, {name: ['B', AB.toFixed(2)], track: false})
        .point(b1x, b1y, {name: ['B1', ab1A.toFixed(2)], track: false})
        .point(cx, cy, {name: ['C', AC.toFixed(2)], track: false})
        .point(c1x, c1y, {name: ['C1', AngleNormalize(AC1).toFixed(2)], track: false})

    const D = round(AngleNormalize(AC1));
    const ABS = round(AB).toFixed(2)

    prea.querySelector('[data-v=ac1]').innerHTML = `${round(AC).toFixed(2)} - ${ABS} = ${AC1.toFixed(2)}`
    prea.querySelector('[data-v=d]').innerHTML = `<i>AngleNormalize</i>(${AC1.toFixed(2)}) = ${D.toFixed(2)}`
    preb.innerHTML = `<i>AngleNormalize</i>(<b>AC</b> - <b>D</b>) == <b>AB</b>
<i>AngleNormalize</i>(${round(AC).toFixed(2)} - ${D.toFixed(2)}) == ${ABS}
<i>AngleNormalize</i>(${round(AC - D).toFixed(2)}) == ${ABS}
${round(AngleNormalize(AC - D)).toFixed(2)} == ${ABS}`
})
