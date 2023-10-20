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
        const dx = this.b.x - this.a.x
        const dy = this.b.y - this.a.y
        return Math.atan2(dy, dx)
    }

    get distance() {
        const dx = this.b.x - this.a.x
        const dy = this.b.y - this.a.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}
