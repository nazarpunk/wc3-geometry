/** @typedef { import("./point.mjs").Point } Point */
export class Segment {
    /**
     * @param {Point} a
     * @param {Point} b
     */
    constructor(a, b) {
        this.move(a, b)
    }

    /**
     * @param {Point} a
     */
    set a(a) {
        this.#a = a
        this.update()
    }

    /**
     * @param {Point} b
     */
    set b(b) {
        this.#b = b
        this.update()
    }

    /**
     * @param {Point} a
     * @param {Point} b
     */
    move(a, b) {
        this.#a = a
        this.#b = b
        this.update()
    }

    /** @type {Point} */ #a
    /** @type {Point} */ #b

    /** @type {number} */ distance
    /** @type {number} */ angle

    update() {
        const dx = this.#b.x - this.#a.x
        const dy = this.#b.y - this.#a.y
        this.angle = Math.atan2(dy, dx)
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }
}
