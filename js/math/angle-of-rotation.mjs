/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export const AngleOfRotation = (a, b) => {
    let d = b - a
    if (d > Math.PI) return d - 2 * Math.PI
    if (d < -Math.PI) return d + 2 * Math.PI
    return d
}
