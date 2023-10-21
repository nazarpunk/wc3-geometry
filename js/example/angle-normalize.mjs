import {Grid} from '../draw/grid.mjs'
import {AngleNormalize} from '../math/angle-normalize.mjs'
import {Point} from '../math/point.mjs'

const preA = document.querySelector('.canvas-angle-normalize-a')
const preB = document.querySelector('.canvas-angle-normalize-b')

const grid = new Grid(document.querySelector('.canvas-angle-normalize'), () => {
    grid.grid().dragRelease()

    const da = Math.PI * 2 / inner.length

    preA.innerHTML = `<div><b>AB</b> = ${AB.angle.toFixed(2)}</div>`
    preB.innerHTML = `<div><b>AС</b> = <b>AB</b> = ${AB.angle.toFixed(2)}</div>`

    const rad = AB.angle
    for (let i = 0; i < inner.length; i++) {
        angles[i] = rad + da * i
        outer[i].fromPoint(A).polar(angles[i], AB.distance + 2)
        if (i > 0) {
            inner[i].fromPoint(A).polar(AngleNormalize(angles[i]), AB.distance)
            preA.innerHTML += `<div><b>AB${i}</b> =  = ${i} * ${da.toFixed(2)} + ${rad.toFixed(2)} = ${angles[i].toFixed(2)}</div>`
            preB.innerHTML += `<div><b>AC${i}</b> = <i>N</i>(<b>AB${i}</b>) = <i>N</i>(${angles[i].toFixed(2)}) = ${AngleNormalize(angles[i]).toFixed(2)}</div>`
        }
    }

    grid
        .point(A, {name: 'A'})
        .point(B, {name: 'B'})
        .segment(A, B)

    for (let i = 0; i < inner.length; i++) {
        grid.segment(inner[i], inner[(i + 2) % 5], {dash: [3]})
        grid.segment(outer[i], outer[(i + 1) % 5], {dash: [3]})
    }

    for (let i = 0; i < inner.length; i++) {
        const n = i > 0 ? i : ''
        grid.point(inner[i], {name: `B${n}`, dash: [2, 2]})
        grid.point(outer[i], {name: `C${n}`, dash: [2, 2]})
    }

})

const A = new Point(-2, -3)
const B = new Point(4, 5)

const AB = A.segment(B)

/** @type {Point[]} */ const inner = [
    B,
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
]

const outer = [
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
]


const angles = inner.map(() => 0)

grid.dragAdd(A, B)

Grid.observe(grid)
