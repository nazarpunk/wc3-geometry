import {Padding} from "./padding.mjs";
import {round} from "../math/round.mjs";

/** @typedef { import("./canvas.mjs").Canvas } Canvas */

export class Axis {
    /** @type {Canvas} */ canvas
    /** @type {Padding} */ padding
    /** @type {number} */ centerX
    /** @type {number} */ centerY
    /** @type {number} */ mouseX
    /** @type {number} */ mouseY
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
     * @return {Axis}
     */
    draw(canvas, {
        padding,
        centerX,
        centerY,
        step = 30,
    }) {
        this.canvas = canvas;
        this.centerX = centerX;
        this.centerY = centerY;
        this.padding = padding ?? Padding.zero;
        this.mouseX = (canvas.mouseX - this.centerX) / step;
        this.mouseY = (canvas.mouseY - this.centerY) / step;
        this.step = step;

        const aw = 4;

        const minCountX = Math.trunc((centerX - this.padding.l) / step);
        const minCountY = Math.trunc((centerY - this.padding.b) / step);
        const minX = centerX - minCountX * step
        const minY = centerY - minCountY * step
        this.maxCountX = Math.trunc((canvas.width - centerX - this.padding.r) / step) - 1;
        this.maxCountY = Math.trunc((canvas.height - centerY - this.padding.t) / step) - 1;
        this.maxX = centerX + this.maxCountX * step
        this.maxY = centerY + this.maxCountY * step

        canvas
            .line(minX, centerY, this.maxX, centerY) // axis: x
            .arrow(this.maxX, centerY, aw * 2, step, Math.PI * .5)
            .line(centerX, minY, centerX, this.maxY) // Y axis
            .arrow(centerX, this.maxY, aw * 2, step, 0)
            .text('ось X', minX, centerY - 20, 0, 'left', canvas.color.point.text)
            .text('ось Y', centerX + 20, minY, Math.PI * -.5, 'left', canvas.color.point.text)


        // step: X
        for (let i = -minCountX; i < this.maxCountX; i++) {
            if (i === 0) continue
            const x = centerX + i * step;
            canvas
                .line(x, centerY - aw, x, centerY + aw, canvas.color.axis.mark)
                .text(i.toString(), x, centerY + 7, 0)
        }

        // step: Y
        for (let i = -minCountY; i < this.maxCountY; i++) {
            if (i === 0) continue
            const y = centerY + i * step;
            canvas
                .line(centerX - aw, y, centerX + aw, y, canvas.color.axis.mark)
                .text(i.toString(), centerX - 7, y - 4, 0, 'right')
        }


        return this;
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
     * @param x
     * @param y
     * @param {string|string[]?} name
     * @param {boolean} track
     * @param {number[]} dash
     * @param {string?} color
     * @return {Axis}
     */
    point(x, y, {
        name,
        track = true,
        dash = [],
        color = this.canvas.color.point.dot,
    } = {}) {
        const px = this.#cx(x);
        const py = this.#cy(y);

        const trackColor = this.canvas.color.point.line;
        if (track) this.canvas
            .lineY(px, this.centerY + (y > 0 ? -15 : 25), py, trackColor, dash)
            .text(round(x).toFixed(2), px, this.centerY + (y > 0 ? -30 : 30), 0, 'center', trackColor)
            .lineX(py, this.centerX + (x > 0 ? -25 : 20), px, trackColor, dash)
            .text(round(y).toFixed(2), this.centerX + (x > 0 ? -30 : 25), py - 3, 0, x > 0 ? 'right' : 'left', trackColor)

        this.canvas.dot(px, py, 5, color)


        if (name) {
            if (Array.isArray(name)) {
                for (let i = 0; i < name.length; i++) {
                    this.canvas.text(name[i], px, py + 10 + 15 * i, 0, 'center', this.canvas.color.point.text)
                }
            } else {
                this.canvas.text(name, px, py + 10, 0, 'center', this.canvas.color.point.text);
            }

        }

        return this;
    }

    /**
     * @param {number} xa
     * @param {number} ya
     * @param {number} xb
     * @param {number} yb
     * @param {string} color
     * @param {number[]} dash
     * @return {Axis}
     */
    line(xa, ya, xb, yb, {
        color = this.canvas.color.point.line,
        dash = []
    } = {}) {
        this.canvas.line(this.#cx(xa), this.#cy(ya), this.#cx(xb), this.#cy(yb), color, dash)
        return this
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} startAngle
     * @param {number} endAngle
     * @param {string} color
     * @param {number[]} dash
     * @return {Axis}
     */
    arc(x, y, radius, startAngle, endAngle, {
        color = this.canvas.color.axis.line,
        dash = []
    } = {}) {
        this.canvas.arc(this.#cx(x), this.#cy(y), radius * this.step, startAngle, endAngle, color, dash)
        return this
    }

}

