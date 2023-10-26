import {Point} from '../math/point.mjs'
import {ConvexHullJass} from '../math/convex-hull-jass.mjs'
import {ConvexHull} from '../math/convex-hull.mjs'
import {Grid} from '../draw/grid.mjs'

/** @type {HTMLInputElement} */ const checkbox = document.querySelector('.canvas-convex-hull-grid')

/** @type {Point[]} */ const points = [
    new Point(8, 0),
    new Point(5, 4),
    new Point(0, 4),
    new Point(-3, 0),
    new Point(0, -4),
    new Point(5, -4),
    new Point(1, 3),
    new Point(4, 3),
    new Point(1, -3),
    new Point(4, -3),
    new Point(2, 1),
    new Point(3, 1),
    new Point(2, -1),
    new Point(3, -1),
]

const grid = new Grid(document.querySelector('.canvas-convex-hull'), () => {
    grid.grid().dragRelease()

    for (const p of points) p.round = checkbox.checked

    if (points.length > 2) {
        let hull
        if (1) {
            hull = ConvexHullJass([...points])
        } else {
            hull = ConvexHull([...points])
        }

        grid.polygon(hull)

        for (let i = 0, j = hull.length - 1; i < hull.length; j = i++) {
            const a = hull[i]
            const b = hull[j]
            grid.point(a, {name: `P${i}`})
            grid.segment(a, b)
        }
    }

    const b = [...points].filter(n => points.indexOf(n) !== -1)
    for (let i = 0; i < b.length; i++) {
        grid.point(b[i])
    }

})

for (let i = 0; i < points.length; i++) {
    grid.dragAdd(points[i])
}

Grid.observe(grid)
