import {Point} from '../math/point.mjs'
import {Grid} from '../draw/grid.mjs'

/** @type {HTMLInputElement} */ const checkbox = document.querySelector('.canvas-polygon-contain-point-grid')
/** @type {HTMLDivElement} */ const div = document.querySelector('.canvas-polygon-contain-point-div')


/** @type {Point[]} */ const points = [
    new Point(-3, 3),
    new Point(-3, 5),
    new Point(3, 5),
    new Point(3, -5),
    new Point(-3, -5),
    new Point(-3, -3),
    new Point(2, 4),
    new Point(2, -4),
]

const onEdge = (a, b, p) => {
    if ((p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y) !== 0) return false
    return Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y)
}


const grid = new Grid(document.querySelector('.canvas-polygon-contain-point'), () => {
    grid.grid().dragRelease()

    A.round = checkbox.checked
    for (const p of points) p.round = checkbox.checked

    const valid = points.length > 2

    let inside = false
    let edge = false
    if (valid) {
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const a = points[i]
            const b = points[j]
            const intersect = a.y > A.y !== b.y > A.y && A.x < ((b.x - a.x) * (A.y - a.y)) / (b.y - a.y) + a.x
            if (onEdge(a, b, A)) edge = true
            if (intersect) inside = !inside
            grid.segment(a, b, {dash: intersect ? [] : [3]})
        }
    }
    if (valid) grid.polygon(points, {color: inside ? 'rgba(23,27,239,0.41)' : 'rgba(166,25,25,0.46)'})

    grid.point(A, {name: 'A', ray: true})

    for (let i = 0; i < points.length; i++) {
        const p = points[i]
        grid.point(p, {name: `P${i}`})
    }

    div.textContent = ''
    if (valid) {
        div.innerHTML = inside ? 'Точка <b>внутри</b> многоугольника' : 'Точка <b>снаружи</b> многоугольника'
        div.innerHTML += '<br>'
        div.innerHTML += edge ? 'Точка <b>на ребре</b> многоугольника' : 'Точка <b>не на ребре</b> многоугольника'

    }
})

const A = new Point(-7, 3)
grid.dragAdd(A)
for (let i = 0; i < points.length; i++) {
    grid.dragAdd(points[i])
}

Grid.observe(grid)
