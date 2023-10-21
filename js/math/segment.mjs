/** @typedef { import('./point.mjs').Point } Point */
export class Segment {
    /**
     * @param {Point} a
     * @param {Point} b
     */
    constructor(a, b) {
        this.a = a
        this.b = b
    }

    /** @type {Point} */ a
    /** @type {Point} */ b

    get angle() {
        return Math.atan2(this.b.y - this.a.y, this.b.x - this.a.x)
    }

    get distance() {
        const dx = this.b.x - this.a.x
        const dy = this.b.y - this.a.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}
