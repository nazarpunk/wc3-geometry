/**
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 * @param {number} cx
 * @param {number} cy
 * @param {number} dx
 * @param {number} dy
 * @return {{b: boolean, a: boolean, x: ?number, y: ?number}}
 */
export const LineSegmentIntersect = (ax, ay, bx, by, cx, cy, dx, dy) => {
    const d = (dy - cy) * (bx - ax) - (dx - cx) * (by - ay)
    if (d === 0) return {
        x: null,
        y: null,
        a: false,
        b: false
    }

    let a = ay - cy
    let b = ax - cx
    const na = (dx - cx) * a - (dy - cy) * b
    const nb = (bx - ax) * a - (by - ay) * b
    a = na / d
    b = nb / d

    return {
        x: ax + a * (bx - ax),
        y: ay + a * (by - ay),
        a: a > 0 && a < 1,
        b: b > 0 && b < 1
    }
}
