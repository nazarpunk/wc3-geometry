import {Point} from './point.mjs'

const ConvexHullInputX = []
const ConvexHullInputY = []
const ConvexHullInputIndex = []
let ConvexHullInputCursor = -1
const ConvexHullX = []
const ConvexHullY = []
let ConvexHullCursor = -1


function quicksort(points) {
    function swap(arr, i, j) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }

    function partition(arr, low, high) {
        const pivot = arr[high]
        let i = low - 1

        for (let j = low; j < high; j++) {
            if (arr[j].x < pivot.x || arr[j].x === pivot.x && arr[j].y < pivot.y) {
                i++
                swap(arr, i, j)
            }
        }

        swap(arr, i + 1, high)
        return i + 1
    }

    // Основная функция сортировки
    function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pivotIndex = partition(arr, low, high)
            quickSortHelper(arr, low, pivotIndex - 1)
            quickSortHelper(arr, pivotIndex + 1, high)
        }
    }

    // Начинаем сортировку
    quickSortHelper(points, 0, points.length - 1)
}

// Пример использования:
const points = [
    {x: 4, y: 4},
    {x: -3, y: 3},
    {x: 3, y: 4},
    {x: 5, y: 6},
    {x: 7, y: 8},
    {x: 3, y: -4},
    {x: -3, y: -3},
]

quicksort(points)

console.log(3, points)

const ConvexHullInputAdd = (x, y) => {
    ConvexHullInputCursor = ConvexHullInputCursor + 1
    ConvexHullInputIndex[ConvexHullInputCursor] = ConvexHullInputCursor
    ConvexHullInputX[ConvexHullInputCursor] = x
    ConvexHullInputY[ConvexHullInputCursor] = y
}

const ConvexHullInputQuickSortCompare = (a, b) => {
    let ax = ConvexHullInputX[ConvexHullInputIndex[a]]
    let ay = ConvexHullInputY[ConvexHullInputIndex[a]]
    let bx = ConvexHullInputX[ConvexHullInputIndex[b]]
    let by = ConvexHullInputY[ConvexHullInputIndex[b]]
    if (ax === bx) {
        return ay < by
    } else {
        return ax < bx
    }
}

const ConvexHullInputQuickSort = (left, right) => {
    if (right - left < 2) {
        return
    }

    const pivotValue = ConvexHullInputIndex[right]
    let split = left
    for (let i = left; i < right; i++) {
        if (!ConvexHullInputQuickSortCompare(i, pivotValue)) {
            if (split !== i) {
                const temp = ConvexHullInputIndex[split]
                ConvexHullInputIndex[split] = ConvexHullInputIndex[i]
                ConvexHullInputIndex[i] = temp
            }
            split++
        }
    }

    ConvexHullInputIndex[right] = ConvexHullInputIndex[split]
    ConvexHullInputIndex[split] = pivotValue

    ConvexHullInputQuickSort(left, split - 1)
    ConvexHullInputQuickSort(split + 1, right)
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
    points.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x)
    console.log(2, [...points])
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

    console.log(1, [...p])

    return ConvexHull(p)

    const out = []
    for (let i = 0; i <= ConvexHullCursor; i++) {
        out.push(new Point(ConvexHullX[i], ConvexHullY[i]))
    }

    return out
}
