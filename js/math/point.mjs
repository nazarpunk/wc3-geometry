export class Point {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /** @type {number} */ x
    /** @type {number} */ y

    /**
     * @param {number} x
     * @param {number} y
     * @return {Point}
     */
    move(x, y) {
        this.x = x
        this.y = y
        return this
    }

    /**
     * @param {number} angle
     * @param {number} distance
     * @return {Point}
     */
    polar(angle, distance) {
        return new Point(
            Math.cos(angle) * distance + this.x,
            Math.sin(angle) * distance + this.y
        )
    }
}
