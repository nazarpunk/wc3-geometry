import {Grid} from '../draw/grid.mjs'
import {Point} from '../math/point.mjs'

const preA = document.querySelector('.canvas-angle-of-rotation-pre-a')
const preB = document.querySelector('.canvas-angle-of-rotation-pre-b')
const preC = document.querySelector('.canvas-angle-of-rotation-pre-c')

const grid = new Grid(document.querySelector('.canvas-angle-of-rotation'), () => {
    grid.grid().dragRelease()

    const D = AC.angle - AB.angle
    const TAU = Math.PI * 2
    let ND = D

    preA.innerHTML = `<b>D</b> = <b>AC</b> - <b>AB</b> = ${AC.angle.toFixed(2)} - ${AB.angle.toFixed(2)} = ${D.toFixed(2)}`


    preB.innerHTML = `<div><b>AB</b> = ${AB.angle.toFixed(2)}</div>`
    let s = `<div><b>D</b> = `

    if (D > Math.PI) {
        ND = D - TAU
        s += `${D.toFixed(2)} - ${TAU.toFixed(2)} = ${ND.toFixed(2)}`
    } else if (D < -Math.PI) {
        ND = D + TAU
        s += `${D.toFixed(2)} + ${TAU.toFixed(2)} = ${ND.toFixed(2)}`
    } else {
        s += `${D.toFixed(2)}`
    }
    preB.innerHTML += s + '</div>'

    const ae = AB.angle + ND
    preB.innerHTML += `<div><b>AE = AB + D</b> = ${AB.angle.toFixed(2)} + ${ND.toFixed(2)} = ${ae.toFixed(2)}</div>`

    preC.innerHTML = `<div><b>AE</b> = ${ae.toFixed(2)}</div><div><b>AC</b> = ${AC.angle.toFixed(2)}</div>`

    E.fromPoint(A).polar(AB.angle + ND, AC.distance * .5)

    grid
        .point(A, {name: 'A'})
        .point(B, {name: 'B'})
        .point(C, {name: 'C'})
        .point(E, {name: 'E', dash: [2, 2]})
        .segment(A, B)
        .segment(A, E)
        .segment(E, C)
        .arc(A, Math.min(1.5, AB.distance, AC.distance), AB.angle, AC.angle)
})

const A = new Point(4, -3)
const B = new Point(-8, -4)
const E = new Point(0, 0)
const C = new Point(8, 7)

const AB = A.segment(B)
const AC = A.segment(C)

grid.dragAdd(A, B, C)

Grid.observe(grid)
