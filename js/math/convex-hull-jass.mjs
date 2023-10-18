import {Point} from './point.mjs'

const ConvexHullInputX = []
const ConvexHullInputY = []
const ConvexHullInputIndex = []
let ConvexHullInputCursor = -1
const ConvexHullX = []
const ConvexHullY = []
let ConvexHullCursor = -1

function ConvexHullInputQuickSortSwap(i, j) {
    const temp = ConvexHullInputIndex[i]
    ConvexHullInputIndex[i] = ConvexHullInputIndex[j]
    ConvexHullInputIndex[j] = temp
}

function partition(low, high) {
    const pivot = ConvexHullInputIndex[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
        const jx = ConvexHullInputX[ConvexHullInputIndex[j]]
        const jy = ConvexHullInputY[ConvexHullInputIndex[j]]
        const px = ConvexHullInputX[pivot]
        const py = ConvexHullInputY[pivot]
        if (jx < px || jx === px && jy < py) {
            i++
            ConvexHullInputQuickSortSwap(i, j)
        }
    }

    ConvexHullInputQuickSortSwap(i + 1, high)
    return i + 1
}

const ConvexHullInputQuickSort = (low, high) => {
    if (low >= high) {
        return
    }
    const pivotIndex = partition(low, high)
    ConvexHullInputQuickSort(low, pivotIndex - 1)
    ConvexHullInputQuickSort(pivotIndex + 1, high)
}

const ConvexHullInputAdd = (x, y) => {
    ConvexHullInputCursor = ConvexHullInputCursor + 1
    ConvexHullInputIndex[ConvexHullInputCursor] = ConvexHullInputCursor
    ConvexHullInputX[ConvexHullInputCursor] = x
    ConvexHullInputY[ConvexHullInputCursor] = y
}

const ConvexHullRemoveMiddle = (ax, ay, bx, by, cx, cy) => {
    let abx = ax - bx
    let aby = ay - by
    let cbx = cx - bx
    let cby = cy - by
    let cross = abx * cby - aby * cbx
    return cross < 0 || cross === 0 && abx * cbx + aby * cby <= 0
}

const removeMiddle = (a, b, c) => {
    const abx = a.x - b.x
    const aby = a.y - b.y
    const cbx = c.x - b.x
    const cby = c.y - b.y
    const cross = abx * cby - aby * cbx
    return cross < 0 || cross === 0 && abx * cbx + aby * cby <= 0
}


export const ConvexHull = points => {
    //points.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x)
    ConvexHullCursor = -1
    const n = points.length
    const hull = []

    for (let i = 0; i < 2 * n; i++) {
        const j = points[i < n ? i : 2 * n - 1 - i]
        while (true) {
            if (hull.length < 2) break
            if (1) {
                if (!removeMiddle(hull[hull.length - 2], hull[hull.length - 1], j)) break
            } else {
                const ax = hull[hull.length - 2].x
                const ay = hull[hull.length - 2].y
                const bx = hull[hull.length - 1].x
                const by = hull[hull.length - 1].y
                const cx = j.x
                const cy = j.y
                if (!ConvexHullRemoveMiddle(ax, ay, bx, by, cx, cy)) break
            }
            hull.pop()
        }
        hull.push(j)
    }

    hull.pop()
    return hull
}

/**
 * @param {Point[]} points
 * @return {Point[]}
 */
export const ConvexHullJass = points => {

    ConvexHullInputCursor = -1
    for (const point of points) ConvexHullInputAdd(point.x, point.y)

    ConvexHullInputQuickSort(0, ConvexHullInputCursor)

    const p = []
    for (let i = 0; i <= ConvexHullInputCursor; i++) {
        p.push(new Point(ConvexHullInputX[ConvexHullInputIndex[i]], ConvexHullInputY[ConvexHullInputIndex[i]]))
    }

    return ConvexHull(p)

    const out = []
    for (let i = 0; i <= ConvexHullCursor; i++) {
        out.push(new Point(ConvexHullX[i], ConvexHullY[i]))
    }

    return out
}
