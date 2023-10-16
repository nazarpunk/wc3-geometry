import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";
import {Point} from "../math/point.mjs";
import {Segment} from "../math/segment.mjs";
import {Color} from "../draw/color.mjs";

const axis = new Axis();

const A = new Point(2.5, 3.5)
const A1 = new Point(0, 0)
const B = new Point(0, 0)
const B1 = new Point(0, 0)
const B2 = new Point(0, 0)

const AB = A.segment(B)
const A1B1 = A1.segment(B1)

Canvas.observe(document.querySelector('.canvas-polar-offset'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    if (axis.mouseLeftX !== null) A.move(axis.mouseLeftX, axis.mouseLeftY)
    B.move(axis.mouseX, axis.mouseY)
    AB.update()

    B1.fromPoint(B).subtract(A)
    A1B1.update()

    B2.fromPoint(B).polar(AB.angle, AB.distance)

    axis
        .line(A, B, {color: Color.line.primary})
        .line(B, B2, {color: c.color.point.dot, dash: [5]})
        .line(A1, B1, {color: Color.line.primary, dash: [5]})
        .point(A, {name: 'A', track: true})
        .point(A1, {name: 'A1'})
        .point(B, {name: 'B', track: true})
        .point(B1, {name: 'B1', track: true, dash: [5]})
        .point(B2, {name: 'B2', track: true, dash: [5]})

})
