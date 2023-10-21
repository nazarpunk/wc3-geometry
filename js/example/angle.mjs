import {Grid} from '../draw/grid.mjs'
import {Point} from '../math/point.mjs'

const div = document.querySelector('.canvas-angle-div')

const grid = new Grid(document.querySelector('.canvas-angle'), () => {
    grid
        .grid(.5, .5, {axisX: false, axisY: false})
        .dragRelease()
        .circle(A)

    grid
        .point(O, {dash: [2, 2]})
        .point(A)
        .segment(A, O)

    const rad = AO.angle + Math.PI

    div.innerHTML = `<div>Радианы: ${rad.toFixed(2)}</div>`
    div.innerHTML += `<div>Градусы: ${(rad * (180 / Math.PI)).toFixed(2)}</div>`
})

const O = new Point(0, 0)
const A = new Point(2, 5)

const AO = A.segment(O)

grid.dragAdd(A)

Grid.observe(grid)
