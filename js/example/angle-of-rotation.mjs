import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";
import {round} from "../math/round.mjs";
import {AngleOfRotation} from "../math/angle-of-rotation.mjs";

const axis = new Axis();

let ax = -1.5
let ay = -2.2
let bx = 2.5
let by = 1.5

Canvas.observe(document.querySelector('.canvas-angle-of-rotation'), c => {

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

    const ABA = Math.atan2(by - ay, bx - ax)
    const ABD = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2)

    const cx = axis.mouseX
    const cy = axis.mouseY

    const ACA = Math.atan2(cy - ay, cx - ax)
    const ACD = Math.sqrt((cx - ax) ** 2 + (cy - ay) ** 2)

    const D = AngleOfRotation(ABA, ACA)

    const dst = Math.min(ABD, ACD);

    const b1x = Math.cos(ABA + D) * ABD + ax
    const b1y = Math.sin(ABA + D) * ABD + ay

    axis
        .lineXY(ax, ay, b1x, b1y, {color: c.color.point.line, dash: [5]})
        .lineXY(ax, ay, bx, by, {color: c.color.point.dot})
        .lineXY(ax, ay, cx, cy, {color: c.color.point.dot})
        .arcXY(ax, ay, dst, ABA, ACA, {color: c.color.point.dot})
        .pointXY(ax, ay, {name: 'A', track: false})
        .pointXY(bx, by, {name: ['B', ABA.toFixed(2)], track: false})
        .pointXY(b1x, b1y, {
            name: ['B1', `${round(ABA).toFixed(2)} + ${round(D).toFixed(2)} = ${round(ABA + D).toFixed(2)}`],
            track: false
        })
        .pointXY(cx, cy, {name: ['C', ACA.toFixed(2)], track: false})

})
