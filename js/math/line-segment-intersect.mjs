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
    const result = {
        x: null,
        y: null,
        a: false,
        b: false
    };
    const d = (dy - cy) * (bx - ax) - (dx - cx) * (by - ay);
    if (d === 0) return result;

    let a = ay - cy;
    let b = ax - cx;
    const na = (dx - cx) * a - (dy - cy) * b;
    const nb = (bx - ax) * a - (by - ay) * b;
    a = na / d;
    b = nb / d;

    result.x = ax + a * (bx - ax);
    result.y = ay + a * (by - ay);

    if (a > 0 && a < 1) result.a = true;
    if (b > 0 && b < 1) result.b = true;
    return result;
};
