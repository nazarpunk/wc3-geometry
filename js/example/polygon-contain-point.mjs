import {Canvas} from '../draw/canvas.mjs'
import {Axis} from '../draw/axis.mjs'
import {Point} from '../math/point.mjs'
import {Color} from '../draw/color.mjs'
import {PolygonContainPoint} from '../math/polygon-contain-point.mjs'

const axis = new Axis()

const A = new Point(0, 0)

/** @type {Point[]} */
const points = [
    new Point(-4, 4),
    new Point(4, 4),
    new Point(-5, -5),
    new Point(4, -2),
    new Point(3, 8),
    new Point(-3, -8),
    new Point(3, 2),
]

Canvas.observe(document.querySelector('.canvas-polygon-contain-point'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5,
        grid: true
    })

    if (axis.mouseLeftX !== null) points.push(new Point(axis.mouseLeftX, axis.mouseLeftY).round())
    if (axis.mouseRightX !== null) points.pop()

    A.move(axis.mouseX, axis.mouseY).round()

    axis.line(A, new Point(axis.maxCountX * 2, A.y))

    if (points.length > 2) {
        for (let i = 0; i < points.length; i++) {
            const p = points[i].round()
            axis.point(p, {name: `P${i}`})
        }
    }

    axis.polygon(points)

    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const a = points[i]
        const b = points[j]
        const intersect = a.y > A.y !== b.y > A.y && A.x < ((b.x - a.x) * (A.y - a.y)) / (b.y - a.y) + a.x
        if (intersect) axis.line(a, b, {color: Color.line.primary})
    }

    for (let i = 0; i < points.length; i++) {
        const p = points[i]
        axis.point(p, {name: `P${i}`})
    }

    const inside = PolygonContainPoint(points, A)
    axis.point(A, {name: ['A', inside ? 'внутри' : 'снаружи'], color: inside ? Color.point.base : Color.line.base})


})
