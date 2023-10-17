/**
 * @param {number} angle
 * @return {number}
 */
export const AngleNormalize = angle => {
    if (angle > -Math.PI && angle <= Math.PI) return angle
    angle = (angle + Math.PI) % (Math.PI * 2)
    return angle < 0 ? angle + Math.PI : angle - Math.PI
}
