import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";

const axis = new Axis();
Canvas.observe(document.querySelector('.canvas-polar-offset'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    const ax = 2.5
    const ay = 3.5
    const bx = axis.mouseX
    const by = axis.mouseY

    const b1x = bx - ax
    const b1y = by - ay

    const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
    const rad = Math.atan2(b1y, b1x);

    const b2x = dist * Math.cos(rad) + bx
    const b2y = dist * Math.sin(rad) + by

    axis
        .line(ax, ay, bx, by, {color: c.color.point.dot})
        .line(bx, by, b2x, b2y, {color: c.color.point.dot, dash: [5]})
        .line(0, 0, b1x, b1y, {color: c.color.point.dot, dash: [5]})
        .point(ax, ay, {name: 'A'})
        .point(0, 0, {name: 'A1'})
        .point(bx, by, {name: 'B'})
        .point(b1x, b1y, {name: 'B1', dash: [5]})
        .point(b2x, b2y, {name: 'B2', dash: [5]})

})
