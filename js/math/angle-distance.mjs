import {AngleNormalize} from "./angle-normalize.mjs";

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export const AngleDistance = (a, b) => AngleNormalize(AngleNormalize(b) - AngleNormalize(a))
