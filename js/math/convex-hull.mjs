/** @typedef { import('./point.mjs').Point } Point */
import {Point} from './point.mjs'

const ConvexHullX = [11, 9, 7, 5, 3, 1]
const ConvexHullY = [12, 10, 8, 6, 4, 2]

// points.sort((a, b) => b.x === a.x ? a.y - b.y : a.x - b.x)
function ConvexHullQuickSortCompare(a, b) {
    const ax = ConvexHullX[a]
    const ay = ConvexHullY[a]
    const bx = ConvexHullX[b]
    const by = ConvexHullY[b]

    if (ax === bx) {
        return ay - by
    } else {
        return ax - bx
    }
}

const defaultSortingAlgorithm = (a, b) => {
    if (a < b) {
        return -1
    }
    if (a > b) {
        return 1
    }
    return 0
}

const ConvexHullIndex = [0, 1, 2, 3, 4, 5]
const ConvexHullQuickSort = (start, end) => {
    if (end - start < 2) {
        return
    }

    const pivotValue = ConvexHullIndex[end]
    let splitIndex = start
    for (let i = start; i < end; i++) {
        const sort = defaultSortingAlgorithm(ConvexHullIndex[i], pivotValue)

        if (sort < 0) {
            if (splitIndex !== i) {
                const temp = ConvexHullIndex[splitIndex]
                ConvexHullIndex[splitIndex] = ConvexHullIndex[i]
                ConvexHullIndex[i] = temp
            }
            splitIndex++
        }

    }

    ConvexHullIndex[end] = ConvexHullIndex[splitIndex]
    ConvexHullIndex[splitIndex] = pivotValue

    ConvexHullQuickSort(start, splitIndex - 1)
    ConvexHullQuickSort(splitIndex + 1, end)
}

ConvexHullQuickSort(0, ConvexHullIndex.length - 1)

console.log(ConvexHullIndex)
//for (let i)


/**
 * @param {Point} a
 * @param {Point} b
 * @param {Point} c
 * @return {boolean}
 */
const removeMiddle = (a, b, c) => {
    const abx = a.x - b.x
    const aby = a.y - b.y
    const cbx = c.x - b.x
    const cby = c.y - b.y
    const cross = abx * cby - aby * cbx
    return cross < 0 || cross === 0 && abx * cbx + aby * cby <= 0
}

/**
 * @param {Point[]} points
 * @return {Point[]}
 * @constructor
 */
export const ConvexHull = points => {
    points.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x)

    const n = points.length
    const hull = []

    for (let i = 0; i < 2 * n; i++) {
        const j = points[i < n ? i : 2 * n - 1 - i]
        while (hull.length >= 2 && removeMiddle(hull[hull.length - 2], hull[hull.length - 1], j)) {
            hull.pop()
        }
        hull.push(j)
    }

    hull.pop()
    return hull
}
