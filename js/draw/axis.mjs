import {Padding} from './padding.mjs'
import {round} from '../math/round.mjs'
import {AngleNormalize} from '../math/angle-normalize.mjs'
import {Color} from './color.mjs'
import {Point} from '../math/point.mjs'

/** @typedef { import('./canvas.mjs').Canvas } Canvas */

export class Axis {
    /** @type {Canvas} */ canvas
    /** @type {Padding} */ padding
    /** @type {number} */ centerX
    /** @type {number} */ centerY
    /** @type {number} */ mouseX
    /** @type {number} */ mouseY
    /** @type {?number} */ mouseLeftX = null
    /** @type {?number} */ mouseLeftY = null
    /** @type {?number} */ mouseRightX = null
    /** @type {?number} */ mouseRightY = null
    /** @type {?number} */ mouseCenterX = null
    /** @type {?number} */ mouseCenterY = null
    /** @type {number} */ step
    /** @type {number} */ maxX
    /** @type {number} */ maxY
    /** @type {number} */ maxCountX
    /** @type {number} */ maxCountY

    /**
     * @param {Canvas} canvas
     * @param {Padding?} padding
     * @param {number} centerX
     * @param {number} centerY
     * @param step
     * @param grid
     * @return {Axis}
     */
    draw(canvas, {
        padding,
        centerX,
        centerY,
        step = 30,
        grid = false,
    }) {
        this.canvas = canvas
        this.centerX = centerX
        this.centerY = centerY
        this.padding = padding ?? Padding.zero
        this.mouseX = (canvas.mouseX - this.centerX) / step
        this.mouseY = (canvas.mouseY - this.centerY) / step
        this.mouseLeftX = canvas.mouseLeftX === null ? null : (canvas.mouseLeftX - this.centerX) / step
        this.mouseLeftY = canvas.mouseLeftY === null ? null : (canvas.mouseLeftY - this.centerY) / step
        this.mouseRightX = canvas.mouseRightX === null ? null : (canvas.mouseRightX - this.centerX) / step
        this.mouseRightY = canvas.mouseRightY === null ? null : (canvas.mouseRightY - this.centerY) / step
        this.mouseCenterX = canvas.mouseCenterX === null ? null : (canvas.mouseCenterX - this.centerX) / step
        this.mouseCenterY = canvas.mouseCenterY === null ? null : (canvas.mouseCenterY - this.centerY) / step

        this.step = step

        const aw = 4

        const minCountX = Math.trunc((centerX - this.padding.l) / step)
        const minCountY = Math.trunc((centerY - this.padding.b) / step)
        const minX = centerX - minCountX * step
        const minY = centerY - minCountY * step
        this.maxCountX = Math.trunc((canvas.width - centerX - this.padding.r) / step) + (grid ? 0 : -1)
        this.maxCountY = Math.trunc((canvas.height - centerY - this.padding.t) / step) + (grid ? 0 : -1)
        this.maxX = centerX + this.maxCountX * step
        this.maxY = centerY + this.maxCountY * step

        if (grid) {
            // grid: X
            for (let i = -minCountX; i <= this.maxCountX; i++) {
                const x = centerX + i * step
                canvas.line(x, 0, x, canvas.height, Color.axis.grid)
            }
            // grid: Y
            for (let i = -minCountY; i <= this.maxCountY; i++) {
                const y = centerY + i * step
                canvas.line(0, y, canvas.width, y, Color.axis.grid)
            }
            canvas
                .line(0, centerY, canvas.width, centerY, Color.axis.base)
                .line(centerX, 0, centerX, canvas.height, Color.axis.base)
        } else {
            canvas
                .line(minX, centerY, this.maxX, centerY, Color.axis.base)
                .line(centerX, minY, centerX, this.maxY, Color.axis.base)
                .arrow(this.maxX, centerY, aw * 2, step, Math.PI * .5)
                .arrow(centerX, this.maxY, aw * 2, step, 0)
                .text('ось X', minX, centerY - 20, 0, 'left', Color.point.name)
                .text('ось Y', centerX + 20, minY, Math.PI * -.5, 'left', Color.point.name)
        }


        // step: X
        for (let i = -minCountX; i <= this.maxCountX; i++) {
            if (i === 0) continue
            if (!grid && i === this.maxCountX) continue

            const x = centerX + i * step
            canvas
                .line(x, centerY - aw, x, centerY + aw, Color.axis.step)
                .text(i.toString(), x, centerY + 7, 0)
        }

        // step: Y
        for (let i = -minCountY; i <= this.maxCountY; i++) {
            if (i === 0) continue
            if (!grid && i === this.maxCountY) continue
            const y = centerY + i * step
            canvas
                .line(centerX - aw, y, centerX + aw, y, Color.axis.step)
                .text(i.toString(), centerX - 7, y - 4, 0, 'right')
        }

        return this
    }


    /**
     * @param {number} x
     * @return {number}
     */
    #cx(x) {
        return x * this.step + this.centerX
    }

    /**
     * @param {number} y
     * @return {number}
     */
    #cy(y) {
        return y * this.step + this.centerY
    }

    /**
     * @param {Point} point
     * @param {string|string[]?} name
     * @param {boolean} track
     * @param {number[]} dash
     * @param {string?} color
     * @return {Axis}
     */
    point(point, {
        name,
        track = false,
        dash = [],
        color = Color.point.fill,

    } = {}) {
        const px = this.#cx(point.x)
        const py = this.#cy(point.y)

        const trackColor = Color.line.base
        if (track) this.canvas
            .line(px, this.centerY + (point.y > 0 ? -15 : 25), px, py, trackColor, dash)
            .text(round(point.x).toFixed(2), px, this.centerY + (point.y > 0 ? -30 : 30), 0, 'center', trackColor)
            .line(this.centerX + (point.x > 0 ? -25 : 20), py, px, py, trackColor, dash)
            .text(round(point.y).toFixed(2), this.centerX + (point.x > 0 ? -30 : 25), py - 3, 0, point.x > 0 ? 'right' : 'left', trackColor)

        this.canvas.dot(px, py, 5, color)

        if (name) {
            if (Array.isArray(name)) {
                for (let i = 0; i < name.length; i++) {
                    this.canvas.text(name[i], px, py + 10 + 15 * i, 0, 'center', Color.point.name)
                }
            } else {
                this.canvas.text(name, px, py + 10, 0, 'center', Color.point.name)
            }

        }

        return this
    }

    /**
     * @param {Point} a
     * @param {Point} b
     * @param {string} color
     * @param {number[]} dash
     * @return {Axis}
     */
    line(a, b, {
        color = Color.line.base,
        dash = []
    } = {}) {
        this.canvas.line(this.#cx(a.x), this.#cy(a.y), this.#cx(b.x), this.#cy(b.y), color, dash)
        return this
    }

    /**
     * @param {Point[]} points
     * @return {Axis}
     */
    polygon(points) {
        if (points.length < 2) return this
        this.canvas.polygon(points.map(p => new Point(this.#cx(p.x), this.#cy(p.y))))
        return this
    }

    /**
     * @param {Point} center
     * @param {number} radius
     * @param {number} startAngle
     * @param {number} endAngle
     * @param {string} color
     * @param {number[]} dash
     * @param short
     * @return {Axis}
     */
    arc(center, radius, startAngle, endAngle, {
        color = Color.line.base,
        dash = [],
        short = false,
    } = {}) {
        if (short && AngleNormalize(endAngle - startAngle) < 0) [startAngle, endAngle] = [endAngle, startAngle]
        this.canvas.arc(this.#cx(center.x), this.#cy(center.y), radius * this.step, startAngle, endAngle, color, dash)
        return this
    }

}

