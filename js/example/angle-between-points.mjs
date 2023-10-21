import {Grid} from '../draw/grid.mjs'
import {Point} from '../math/point.mjs'

const div = document.querySelector('.canvas-angle-between-points-div')
const preD = document.querySelector('.canvas-angle-between-points-pre-diff')
const preA = document.querySelector('.canvas-angle-between-points-pre-angle')

const grid = new Grid(document.querySelector('.canvas-angle-between-points'), () => {
    grid.grid().dragRelease()

    B1.move(B.x - A.x, B.y - A.y)
    B2.move(A.x + AB.distance, A.y)

    grid
        .point(A, {name: 'A'})
        .point(B, {name: 'B'})
        .point(A1, {name: 'A1', dash: [2, 2]})
        .point(B1, {name: 'B1', dash: [2, 2]})
        .point(B2, {name: 'B2', dash: [2, 2]})
        .segment(A, B)
        .segment(A1, B1, {dash: [3]})
        .segment(A, B2, {dash: [3]})
        .arc(A, Math.min(1.5, AB.distance), 0, AB.angle)
        .arc(A1, Math.min(1.5, AB.distance), 0, AB.angle, {dash: [5]})

    preD.innerHTML = `<div><b>B1<sub>x</sub></b> = <b>B<sub>x</sub></b> - <b>A<sub>x</sub></b> = ${B.x.toFixed(2)} - ${A.x.toFixed(2)} = ${(B.x - A.x).toFixed(2)}</div>`
    preD.innerHTML += `<div><b>B1<sub>y</sub></b> = <b>B<sub>y</sub></b> - <b>A<sub>y</sub></b> = ${B.y.toFixed(2)} - ${A.y.toFixed(2)} = ${(B.y - A.y).toFixed(2)}</div>`

    const rad = Math.atan2(B1.y, B1.x)

    preA.innerHTML = `<div><i>Atan2</i>(<b>B1<sub>y</sub></b>, <b>B1<sub>x</sub></b>) = <i>Atan2</i>(${B1.y.toFixed(2)}, ${B1.x.toFixed(2)}) = ${rad.toFixed(2)}</div>`

    div.innerHTML = `<div>Радианы: ${rad.toFixed(2)}</div>`
    div.innerHTML += `<div>Градусы: ${(rad * (180 / Math.PI)).toFixed(2)}</div>`
})

const A = new Point(3, 2)
const B = new Point(7, -3)
const A1 = new Point(0, 0)
const B1 = new Point(0, 0)
const B2 = new Point(0, 0)

const AB = A.segment(B)

grid.dragAdd(A, B)

Grid.observe(grid)
