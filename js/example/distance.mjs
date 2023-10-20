import {Grid} from '../draw/grid.mjs'
import {Point} from '../math/point.mjs'

const pre = document.querySelector('.canvas-distance-pre')

const grid = new Grid(document.querySelector('.canvas-distance'), () => {
    grid
        .grid(.25, .25)
        .dragRelease()

    C.move(B.x, A.y)

    const AC = A.x - C.x
    const BC = B.y - C.y
    const AB = AC ** 2 + BC ** 2

    pre.innerHTML = `<b>AC</b> = <b>A<sub>x</sub></b> - <b>C<sub>x</sub></b> = ${A.x.toFixed(2)} - ${C.x.toFixed(2)} = ${AC.toFixed(2)}`
    pre.innerHTML += `<div><b>BC</b> = <b>B<sub>y</sub></b> - <b>C<sub>y</sub></b> = ${B.y.toFixed(2)} - ${C.y.toFixed(2)} = ${BC.toFixed(2)}</div>`
    pre.innerHTML += `<div><b>AB</b> = &#8730;(<b>AC<sup>2</sup></b> + <b>BC<sup>2</sup></b>) = &#8730;(${AC.toFixed(2)}<sup>2</sup> + ${BC.toFixed(2)}<sup>2</sup>) = &#8730;(${(AC ** 2).toFixed(2)} + ${(BC ** 2).toFixed(2)}) = &#8730;(${AB.toFixed(2)}) = ${Math.sqrt(AB).toFixed(2)}</div>`

    grid
        .point(A, {trackX: true, trackY: true, name: 'A'})
        .point(B, {trackX: true, trackY: true, name: 'B'})
        .point(C, {name: 'C', dash: [2, 2]})
        .segment(A, B)
        .segment(A, C, {dash: [3]})
        .segment(B, C, {dash: [3]})
})

const A = new Point(4, 3)
const B = new Point(9, 15)
const C = new Point(0, 0)

grid.dragAdd(A, B)

Grid.observe(grid)
