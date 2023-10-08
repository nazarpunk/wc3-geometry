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

        const cx = canvas.width * .5;
        const cy = canvas.height * .5;

        const xc = Math.floor((canvas.width * .5 - this.padding.x) / step);
        const yc = Math.floor((canvas.height * .5 - this.padding.y) / step);

        const xs = cx - step * xc;
        const xe = cx + step * (xc - 1);
        const ys = cy - step * yc;
        const ye = cy + step * (yc - 1);

        this.maxX = Math.floor((xe - this.centerX - this.padding.r) / this.step);
        this.maxY = Math.floor((ye - this.centerY - this.padding.t) / this.step);

        canvas
            .lineX(cy, xs, xe) // axis: x
            .arrow(xe, cy, aw * 2, step, Math.PI * .5)
            .lineY(cx, ys, ye) // Y axis
            .arrow(cx, ye, aw * 2, step, 0)
            .text('ось X', xs, cy - 20, 0, 'left', canvas.color.point.text)
            .text('ось Y', cx + 20, ys, Math.PI * -.5, 'left', canvas.color.point.text)


        for (let i = 1; i <= xc; i++) {
            if (i < xc - 1) {
                const x = cx + step * i;
                canvas
                    .lineY(x, cy - aw, cy + aw, canvas.color.axis.mark)
                    .text(i.toString(), x, cy + 7, 0)
            }
            const x = cx - step * i;
            canvas
                .lineY(x, cy - aw, cy + aw, canvas.color.axis.mark)
                .text((-i).toString(), x, cy + 7, 0);

        }

        for (let i = 1; i <= yc; i++) {
            if (i < yc - 1) {
                const y = cy + step * i;
                canvas
                    .lineX(y, cx - aw, cx + aw, canvas.color.axis.mark)
                    .text(i.toString(), cx - 7, y - 4, 0, 'right')
            }
            const y = cy - step * i;
            canvas
                .lineX(y, cx - aw, cx + aw, canvas.color.axis.mark)
                .text((-i).toString(), cx - 7, y - 4, 0, 'right');
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

