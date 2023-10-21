import {Grid} from '../draw/grid.mjs'
import {Point} from '../math/point.mjs'

const grid = new Grid(document.querySelector('.canvas-polar-offset'), () => {
    grid.grid().dragRelease()

    B1.move(B.x - A.x, B.y - A.y)
    B2.fromPoint(B).polar(AB.angle, AB.distance)

    grid
        .point(A, {name: 'A'})
        .point(B, {name: 'B'})
        .point(A1, {name: 'A1', dash: [2, 2]})
        .point(B1, {name: 'B1', dash: [2, 2]})
        .point(B2, {name: 'B2', dash: [2, 2]})
        .segment(A, B)
        .segment(A1, B1, {dash: [3]})
        .segment(B, B2, {dash: [3]})

})

const A = new Point(-4, -7)
const B = new Point(3, -5)
const A1 = new Point(0, 0)
const B1 = new Point(0, 0)
const B2 = new Point(0, 0)

const AB = A.segment(B)

grid.dragAdd(A, B)

Grid.observe(grid)
