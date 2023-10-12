/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export const AngleOfRotation = (a, b) => {
    let d = b - a;
    if (d > Math.PI) {
        return -(2 * Math.PI - d);
    } else if (d < -Math.PI) {
        return 2 * Math.PI + d;
    }
    return d;
}
