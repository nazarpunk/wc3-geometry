export class Padding {

    /**
     * @param {number} t
     * @param {number} l
     * @param {number} r
     * @param {number} b
     */
    constructor(t, l, r, b) {
        this.t = t
        this.l = l
        this.r = r
        this.b = b

    }

    /**
     * @param {number} padding
     * @return {Padding}
     */
    static all(padding) {
        return new Padding(padding, padding, padding, padding)
    }

    static zero = new Padding(0, 0, 0, 0)

    /** @return {number} */
    get x() {
        return this.l + this.r
    }

    /** @return {number} */
    get y() {
        return this.t + this.b
    }

}
