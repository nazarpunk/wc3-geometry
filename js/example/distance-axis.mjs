import {Grid} from '../draw/grid.mjs'
import {Point} from '../math/point.mjs'

const div = document.querySelector('.canvas-distance-axis-text')

const grid = new Grid(document.querySelector('.canvas-distance-axis'), () => {
    grid
        .grid(undefined, .25, {axisY: false})
        .dragRelease()

    const AX = A.x - X.x
    const XB = X.x - B.x

    div.innerHTML = `<div><b>AX</b> = |<b>A</b> - <b>X</b>| = |${A.x.toFixed(2)} - ${X.x.toFixed(2)}| = |${AX.toFixed(2)}| = ${Math.abs(AX).toFixed(2)}</div>`
    div.innerHTML += `<div><b>XB</b> = |<b>X</b> - <b>B</b>| = |${X.x.toFixed(2)} - ${B.x.toFixed(2)}| = |${XB.toFixed(2)}| = ${Math.abs(XB).toFixed(2)}</div>`

    grid
        .point(A, {trackX: true, name: 'A'})
        .point(B, {trackX: true, name: 'B'})
        .point(X, {trackX: true, name: 'X'})

})

const A = new Point(-5, 0, {dragY: false})
const B = new Point(5, 0, {dragY: false})
const X = new Point(0, 0, {dragY: false})

grid.dragAdd(A, B, X)

Grid.observe(grid)
