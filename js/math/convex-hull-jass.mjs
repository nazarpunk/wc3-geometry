import {Point} from './point.mjs'

const ConvexHullInputX = []
const ConvexHullInputY = []
const ConvexHullInputIndex = []
let ConvexHullInputCursor = -1
const ConvexHullX = []
const ConvexHullY = []
let ConvexHullCursor = -1

function ConvexHullInputAdd(x, y) {
    ConvexHullInputCursor = ConvexHullInputCursor + 1
    ConvexHullInputIndex[ConvexHullInputCursor] = ConvexHullInputCursor
    ConvexHullInputX[ConvexHullInputCursor] = x
    ConvexHullInputY[ConvexHullInputCursor] = y
}

function ConvexHullInputSortSwap(i, j) {
    const temp = ConvexHullInputIndex[i]
    ConvexHullInputIndex[i] = ConvexHullInputIndex[j]
    ConvexHullInputIndex[j] = temp
}

function ConvexHullInputSort(low, high) {
    let i = low - 1
    let j = low
    let ji
    let jx
    let jy
    let pi
    let px
    let py

    if (low >= high) {
        return
    }

    while (true) {
        if (j >= high) break
        ji = ConvexHullInputIndex[j]
        jx = ConvexHullInputX[ji]
        jy = ConvexHullInputY[ji]
        pi = ConvexHullInputIndex[high]
        px = ConvexHullInputX[pi]
        py = ConvexHullInputY[pi]
        if (jx < px || jx === px && jy < py) {
            i = i + 1
            ConvexHullInputSortSwap(i, j)
        }
        j = j + 1
    }
    ConvexHullInputSortSwap(i + 1, high)

    ConvexHullInputSort(low, i)
    ConvexHullInputSort(i + 2, high)
}

function ConvexHullRemoveMiddle(cx, cy) {
    let ax = ConvexHullX[ConvexHullCursor - 1]
    let ay = ConvexHullY[ConvexHullCursor - 1]
    let bx = ConvexHullX[ConvexHullCursor]
    let by = ConvexHullY[ConvexHullCursor]
    let abx = ax - bx
    let aby = ay - by
    let cbx = cx - bx
    let cby = cy - by
    let cross = abx * cby - aby * cbx
    return cross < 0 || cross === 0 && abx * cbx + aby * cby <= 0
}

function ConvexHull() {
    const n = ConvexHullInputCursor + 1
    let i = 0
    let j
    let ji
    let jx
    let jy

    ConvexHullInputSort(0, ConvexHullInputCursor)
    ConvexHullCursor = -1

    while (true) {
        if (i >= 2 * n) break

        if (i < n) {
            j = i
        } else {
            j = 2 * n - 1 - i
        }

        ji = ConvexHullInputIndex[j]
        jx = ConvexHullInputX[ji]
        jy = ConvexHullInputY[ji]
        while (true) {
            if (ConvexHullCursor < 1 || !ConvexHullRemoveMiddle(jx, jy)) break
            ConvexHullCursor = ConvexHullCursor - 1
        }

        ConvexHullCursor = ConvexHullCursor + 1
        ConvexHullX[ConvexHullCursor] = jx
        ConvexHullY[ConvexHullCursor] = jy
        i = i + 1
    }
    ConvexHullCursor = ConvexHullCursor - 1
}

/**
 * @param {Point[]} points
 * @return {Point[]}
 */
export const ConvexHullJass = points => {
    ConvexHullInputCursor = -1
    for (const point of points) ConvexHullInputAdd(point.x, point.y)

    ConvexHull()

    const out = []
    for (let i = 0; i <= ConvexHullCursor; i++) {
        out.push(new Point(ConvexHullX[i], ConvexHullY[i]))
    }

    return out
}
