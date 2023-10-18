/** @typedef { import('./point.mjs').Point } Point */
import {Point} from './point.mjs'

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
