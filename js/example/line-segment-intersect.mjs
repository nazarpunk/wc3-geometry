import {Grid} from '../draw/grid.mjs'
import {LineSegmentIntersect} from '../math/line-segment-intersect.mjs'
import {Point} from '../math/point.mjs'

/** @type {HTMLInputElement} */ const checkbox = document.querySelector('.canvas-line-segment-intersect-grid')
const div = document.querySelector('.canvas-line-segment-intersect-div')

const grid = new Grid(document.querySelector('.canvas-line-segment-intersect'), () => {
    grid.grid().dragRelease()

    A.round = B.round = C.round = D.round = checkbox.checked

    const {x, y, a, b} = LineSegmentIntersect(A.x, A.y, B.x, B.y, C.x, C.y, D.x, D.y)
    const has = x !== null && y !== null
    E.move(x ?? 0, y ?? 0)

    grid
        .segment(A, B, {line: true, dash: a ? [] : [3]})
        .segment(C, D, {line: true, dash: b ? [] : [3]})
        .point(A, {name: 'A'})
        .point(B, {name: 'B'})
        .point(C, {name: 'C'})
        .point(D, {name: 'D'})

    if (has) grid.point(E, {name: 'E'})

    div.innerHTML = has ? 'Прямые <b>пересекаются</b>' : 'Прямые <b>не пересекаются</b>'
    div.innerHTML += '<br>'
    div.innerHTML += a ? 'Точка пересечения <b>лежит</b> на <b>AB</b>' : 'Точка пересечения <b>не лежит</b> на <b>AB</b>'
    div.innerHTML += '<br>'
    div.innerHTML += b ? 'Точка пересечения <b>лежит</b> на <b>CD</b>' : 'Точка пересечения <b>не лежит</b> на <b>CD</b>'

})

const A = new Point(-8, 2)
const B = new Point(5, 7)
const C = new Point(4, -6)
const D = new Point(-7, 5)
const E = new Point(0, 0)

grid.dragAdd(A, B, C, D)

Grid.observe(grid)
