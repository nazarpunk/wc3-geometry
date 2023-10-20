import {Segment} from './segment.mjs'

export class Point {

    /**
     * @param {number} x
     * @param {number} y
     * @param {boolean} dragX
     * @param {boolean} dragY
     */
    constructor(x, y, {
        dragX = true,
        dragY = true
    } = {}) {
        this.x = x
        this.y = y
        this.dragX = dragX
        this.dragY = dragY
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
     * @param {Point} point
     * @return {Point}
     */
    fromPoint(point) {
        this.x = point.x
        this.y = point.y
        return this
    }

    /**
     * @param {Point} point
     * @return {Point}
     */
    subtract(point) {
        this.x -= point.x
        this.y -= point.y
        return this
    }

    round() {
        this.x = Math.round(this.x)
        this.y = Math.round(this.y)
        return this
    }

    /**
     * @param {number} angle
     * @param {number} distance
     * @return {Point}
     */
    polar(angle, distance) {
        this.x += Math.cos(angle) * distance
        this.y += Math.sin(angle) * distance
        return this
    }

    /**
     * @param {number} angle
     * @param {number} distance
     * @return {Point}
     */
    polarClone(angle, distance) {
        return new Point(
            Math.cos(angle) * distance + this.x,
            Math.sin(angle) * distance + this.y
        )
    }

    /**
     * @param {Point} point
     * @return {Segment}
     */
    segment(point) {
        return new Segment(this, point)
    }

}
