/** @typedef { import('./point.mjs').Point } Point */
import {Point} from './point.mjs'

const ConvexHullList = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// points.sort((a, b) => b.x === a.x ? a.y - b.y : a.x - b.x)
function ConvexHullQuickSortCompare(a, b) {
    const ai = a * 2
    const bi = b * 2
    const ax = ConvexHullList[ai]
    const ay = ConvexHullList[ai + 1]
    const bx = ConvexHullList[bi]
    const by = ConvexHullList[bi + 1]

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

const sortedArray = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const ConvexHullQuickSort = (start, end) => {
    if (end - start < 2) {
        return
    }

    const pivotValue = sortedArray[end]
    let splitIndex = start
    for (let i = start; i < end; i++) {
        const sort = defaultSortingAlgorithm(sortedArray[i], pivotValue)

        if (sort < 0) {
            if (splitIndex !== i) {
                const temp = sortedArray[splitIndex]
                sortedArray[splitIndex] = sortedArray[i]
                sortedArray[i] = temp
            }
            splitIndex++
        }

    }

    sortedArray[end] = sortedArray[splitIndex]
    sortedArray[splitIndex] = pivotValue

    ConvexHullQuickSort(start, splitIndex - 1)
    ConvexHullQuickSort(splitIndex + 1, end)
}

ConvexHullQuickSort(0, sortedArray.length - 1)

console.log(sortedArray)

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
