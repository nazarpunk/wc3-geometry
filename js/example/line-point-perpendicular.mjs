import {Grid} from '../draw/grid.mjs'
import {Point} from '../math/point.mjs'

/** @type {HTMLInputElement} */ const checkbox = document.querySelector('.canvas-line-point-perpendicular-grid')

const grid = new Grid(document.querySelector('.canvas-line-point-perpendicular'), () => {
    grid.grid().dragRelease()

    A.round = B.round = C.round = checkbox.checked

    AB.perpendicular(C, C1)

    grid
        .segment(A, B, {line: true})
        .segment(C, C1)
        .point(A, {name: 'A'})
        .point(B, {name: 'B'})
        .point(C, {name: 'C'})
        .point(C1, {name: 'C1', dash: [2, 2]})

})

const A = new Point(-2, -5)
const B = new Point(3, 4)
const C = new Point(9, 5)
const C1 = new Point(0, 0)

const AB = A.segment(B)

grid.dragAdd(A, B, C)

Grid.observe(grid)
