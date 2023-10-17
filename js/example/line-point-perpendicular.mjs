import {Canvas} from '../draw/canvas.mjs'
import {Axis} from '../draw/axis.mjs'
import {Segment} from '../math/segment.mjs'
import {Point} from '../math/point.mjs'
import {Color} from '../draw/color.mjs'
import {LinePointPerpendicular} from '../math/line-point-perpendicular.mjs'

const axis = new Axis()

const A = new Point(1.5, -2.2)
const B = new Point(-2.5, 1.5)
const C = new Point(0, 0)
const C1 = new Point(0,0)
const AB = new Segment(A, B)
const AC = new Segment(A, C)


Canvas.observe(document.querySelector('.canvas-line-point-perpendicular'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    if (axis.mouseLeftX !== null) A.move(axis.mouseLeftX, axis.mouseLeftY)
    if (axis.mouseRightX !== null) B.move(axis.mouseRightX, axis.mouseRightY)
    C.move(axis.mouseX, axis.mouseY)

    AB.move(A, B)
    AC.move(A, C)

    const lw = Math.max(axis.maxCountX, axis.maxCountY) * 4

    const [cx, cy] = LinePointPerpendicular(A.x, A.y, B.x, B.y, C.x, C.y)

    C1.move(cx, cy)

    axis
        .line(A, B.polarClone(AB.angle + Math.PI, lw))
        .line(B, A.polarClone(AB.angle, lw))
        .line(A, B, {color: Color.line.primary})
        .line(C, C1)
        .point(A, {name: 'A'})
        .point(B, {name: 'B'})
        .point(C, {name: 'C'})
        .point(C1, {name: 'C1'})

})
