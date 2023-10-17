import {Canvas} from '../draw/canvas.mjs'
import {Axis} from '../draw/axis.mjs'
import {round} from '../math/round.mjs'
import {AngleOfRotation} from '../math/angle-of-rotation.mjs'
import {Point} from '../math/point.mjs'
import {Segment} from '../math/segment.mjs'
import {Color} from '../draw/color.mjs'

const axis = new Axis()

const A = new Point(-1.5, -2.2)
const B = new Point(2.5, 2.5)
const C = new Point(0, 0)

const AB = new Segment(A, B)
const AC = new Segment(A, C)

Canvas.observe(document.querySelector('.canvas-angle-of-rotation'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    if (axis.mouseLeftX !== null) A.move(axis.mouseLeftX, axis.mouseLeftY)
    if (axis.mouseRightX !== null) B.move(axis.mouseRightX, axis.mouseRightY)
    C.move(axis.mouseX, axis.mouseY)

    AB.update()
    AC.update()

    const R = AngleOfRotation(AB.angle, AC.angle)

    const dst = Math.min(AB.distance, AC.distance)

    const B1 = A.polarClone(AB.angle + R, AB.distance)

    axis
        .line(A, B1, {color: Color.line.primary, dash: [5]})
        .line(A, B, {color: Color.line.primary})
        .line(A, C, {color: Color.line.primary})
        .arc(A, dst, AB.angle, AC.angle, {color: Color.line.primary})
        .point(A, {name: 'A', track: false})
        .point(B, {name: ['B', AB.angle.toFixed(2)], track: false})
        .point(B1, {
            name: ['B1', `${round(AB.angle).toFixed(2)} + ${round(R).toFixed(2)} = ${round(AB.angle + R).toFixed(2)}`],
            track: false
        })
        .point(C, {name: ['C', AC.angle.toFixed(2)], track: false})

})
