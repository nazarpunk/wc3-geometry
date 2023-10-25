import {Canvas} from '../draw/canvas.mjs'
import {Axis} from '../draw/axis.mjs'
import {Point} from '../math/point.mjs'
import {Color} from '../draw/color.mjs'
import {PolygonContainPoint} from '../math/polygon-contain-point.mjs'
import {Grid} from '../draw/grid.mjs'

if (0) {
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

        if (axis.mouseLeftX !== null) points.push(new Point(axis.mouseLeftX, axis.mouseLeftY).roundOld())
        if (axis.mouseRightX !== null) points.pop()

        A.move(axis.mouseX, axis.mouseY).roundOld()

        axis.line(A, new Point(axis.maxCountX * 2, A.y))

        if (points.length > 2) {
            for (let i = 0; i < points.length; i++) {
                const p = points[i].roundOld()
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
        axis.point(A, {name: ['A', inside ? 'внутри' : 'снаружи'], color: inside ? Color.point.fill : Color.line.base})


    })
} else {
    /** @type {HTMLInputElement} */ const checkbox = document.querySelector('.canvas-polygon-contain-point-grid')

    /** @type {Point[]} */ const points = [
        new Point(-3, 3),
        new Point(-3, 5),
        new Point(3, 5),
        new Point(3, -5),
        new Point(-3, -5),
        new Point(-3, -3),
        new Point(2, 4),
        new Point(2, -4),
    ]

    const onEdge = (a, b, p) => {
        if ((p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y) !== 0) return false
        return Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y)
    }


    const grid = new Grid(document.querySelector('.canvas-polygon-contain-point'), () => {
        grid.grid().dragRelease()

        A.round = checkbox.checked
        for (const p of points) p.round = checkbox.checked

        const valid = points.length > 2

        grid.point(A, {name: 'A', ray: true})

        if (valid) {
            let inside = false
            let edge = false
            for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
                const a = points[i]
                const b = points[j]
                const intersect = a.y > A.y !== b.y > A.y && A.x < ((b.x - a.x) * (A.y - a.y)) / (b.y - a.y) + a.x
                if (onEdge(a, b, A)) edge = true
                if (intersect) inside = !inside
                grid.segment(a, b, {dash: intersect ? [] : [3]})
            }
        }
        if (valid) grid.polygon(points)

        for (let i = 0; i < points.length; i++) {
            const p = points[i]
            grid.point(p, {name: `P${i}`})
        }
    })

    const A = new Point(-7, 3)
    grid.dragAdd(A)
    for (let i = 0; i < points.length; i++) {
        grid.dragAdd(points[i])
    }

    Grid.observe(grid)

}
