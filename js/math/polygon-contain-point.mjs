/** @typedef { import("./point.mjs").Point } Point */

/**
 * @param {Point} a
 * @param {Point} b
 * @param {Point} p
 * @return {boolean}
 */
const SegmentContainPoint = (a, b, p) => {
    if ((p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y) !== 0) return false;
    return Math.min(a.x, b.x) <= p.x &&
        p.x <= Math.max(a.x, b.x) &&
        Math.min(a.y, b.y) <= p.y &&
        p.y <= Math.max(a.y, b.y);
};

/**
 * @param {Point[]} polygon
 * @param {Point} point
 * @return {boolean}
 */
export const PolygonContainPoint = (polygon, point) => {
    if (polygon.length < 3) return false;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const a = polygon[i]
        const b = polygon[j]
        if (SegmentContainPoint(a, b, point)) return true
        if (a.y > point.y !== b.y > point.y && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
    }

    return inside;
}
