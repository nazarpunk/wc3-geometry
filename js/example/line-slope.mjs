// noinspection SpellCheckingInspection

import {Grid} from '../draw/grid.mjs'
import {Point} from '../math/point.mjs'

/** @type {HTMLInputElement} */ const checkbox = document.querySelector('.canvas-line-slope-grid')
const prea = document.querySelector('.canvas-line-slope-pre-a')
const preb = document.querySelector('.canvas-line-slope-pre-b')
const div = document.querySelector('.canvas-line-slope-div')

const grid = new Grid(document.querySelector('.canvas-line-slope'), () => {
    grid.grid().dragRelease()

    A.round = B.round = C.round = D.round = checkbox.checked

    grid
        .point(A, {trackX: true, trackY: true, name: 'A'})
        .point(B, {trackX: true, trackY: true, name: 'B'})
        .point(C, {name: 'C'})
        .point(D, {name: 'D'})
        .segment(A, B, {line: true})
        .segment(C, D, {line: true})

    const kAB = (B.y - A.y) / (B.x - A.x)
    const kCD = (D.y - C.y) / (D.x - C.x)

    prea.innerHTML = `<b>k</b>\
 = (<b>B<sub>y</sub></b> - <b>A<sub>y</sub></b>) / (<b>B<sub>x</sub></b> - <b>A<sub>x</sub></b>)\
 = (${B.y.toFixed(2)} - ${A.y.toFixed(2)}) / (${B.x.toFixed(2)} - ${A.x.toFixed(2)})\
 = ${(B.y - A.y).toFixed(2)} / ${(B.x - A.x).toFixed(2)}\
 = ${kAB.toFixed(2)}`

    preb.innerHTML = `<b>k</b>\
 = (<b>A<sub>y</sub></b> - <b>B<sub>y</sub></b>) / (<b>A<sub>x</sub></b> - <b>B<sub>x</sub></b>)\
 = (${A.y.toFixed(2)} - ${B.y.toFixed(2)}) / (${A.x.toFixed(2)} - ${B.x.toFixed(2)})\
 = ${(A.y - B.y).toFixed(2)} / ${(A.x - B.x).toFixed(2)}\
 = ${((A.y - B.y) / (A.x - B.x)).toFixed(2)}`

    div.innerHTML = `\
<div><b>kAB</b> = ${kAB.toFixed(3)}</div>\
<div><b>kCD</b> = ${kCD.toFixed(3)}</div>\
<div><b>kAB</b> * <b>kCD</b> = ${kAB * kCD}</div>\
<div><b>kAB</b> - <b>kCD</b> = ${kAB - kCD}</div>\
`


})

const A = new Point(2, 5)
const B = new Point(-3, -6)
const C = new Point(7, 3)
const D = new Point(4, -5)

grid.dragAdd(A, B, C, D)

Grid.observe(grid)
