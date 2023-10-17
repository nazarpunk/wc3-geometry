import {Canvas} from '../draw/canvas.mjs'
import {Axis} from '../draw/axis.mjs'
import {Point} from '../math/point.mjs'
import {ConvexHull} from '../math/convex-hull.mjs'

const axis = new Axis()

const A = new Point(0, 0)

/** @type {Point[]} */
const points = [
    //A,
    new Point(1, 2),
    new Point(3, 4),
    new Point(5, 6),
    new Point(7, 8),
    new Point(9, 10),
    new Point(11, 12),
]

Canvas.observe(document.querySelector('.canvas-convex-hull'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5,
        grid: true
    })

    if (axis.mouseLeftX !== null) points.push(new Point(axis.mouseLeftX, axis.mouseLeftY))
    if (axis.mouseRightX !== null && points.length > 1) points.pop()

    A.move(axis.mouseX, axis.mouseY)

    if (points.length > 2) {
        const hull = ConvexHull([...points])

        for (let i = 0, j = hull.length - 1; i < hull.length; j = i++) {
            const a = hull[i]
            const b = hull[j]
            axis.point(a, {name: `P${i}`})
            axis.line(a, b)
        }
    }

    for (let i = 0; i < points.length; i++) {
        axis.point(points[i])
    }

    return false
})
