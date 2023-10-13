const map = new Map()

/**
 * @callback CanvasDraw
 * @param {Canvas} canvas
 */

let clientX = 0, clientY = 0;

export class Canvas {

    /**
     * @param {HTMLElement} div
     * @param {CanvasDraw} draw
     */
    constructor(div, draw) {
        this.div = div;
        this.#draw = draw;
        this._redraw = this._redraw.bind(this);
    }

    /** @type {HTMLDivElement} */ div;
    /** @type {HTMLCanvasElement} */ canvas;
    /** @type {CanvasRenderingContext2D} */ ctx;
    #raf = 0;
    /** @type {CanvasDraw} */ #draw;
    /** @type {?number} */ mouseLeftX = null;
    /** @type {?number} */ mouseLeftY = null;
    /** @type {?number} */ mouseRightX = null;
    /** @type {?number} */ mouseRightY = null;

    #polared = false

    width = 0;
    height = 0;
    mouseX = 0;
    mouseY = 0;

    color = {
        axis: {
            line: '#419d30',
            mark: '#11e81a',
            text: '#da0a3d',
        },
        point: {
            dot: '#efaf1b',
            line: '#7a7a7a',
            text: '#519bf8',
        }
    }

    /**
     * @param {number} xa
     * @param {number} ya
     * @param {number} xb
     * @param {number} yb
     * @param {string} color
     * @param {number[]} dash
     * @return {Canvas}
     */
    line(xa, ya, xb, yb, color = this.color.axis.line, dash = []) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = color;
        if (this.#polared) {
            ya *= -1;
            yb *= -1;
        } else {
            ya = this.height - ya;
            yb = this.height - yb;
        }

        this.ctx.moveTo(xa * this.#dpr, ya * this.#dpr);
        this.ctx.lineTo(xb * this.#dpr, yb * this.#dpr);
        this.ctx.setLineDash(dash.map(i => i * this.#dpr));

        this.ctx.stroke();
        this.ctx.closePath()
        return this;
    }

    /**
     * @param {number} x
     * @param {number} ya
     * @param {number} yb
     * @param {string?} color
     * @param {number[]} dash
     * @return {Canvas}
     */
    lineY(x, ya, yb, color, dash = []) {
        return this.line(x, ya, x, yb, color, dash);
    }

    /**
     * @param {number} y
     * @param {number} xa
     * @param {number} xb
     * @param {string?} color
     * @param {number[]} dash
     * @return {Canvas}
     */
    lineX(y, xa, xb, color, dash = []) {
        return this.line(xa, y, xb, y, color, dash);
    }

    /**
     *
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number?} rad
     * @param {('center'|'left'|'right')?} align
     * @param {string} color
     * @return {Canvas}
     */
    text(text, x, y, rad = 0, align = 'center', color = this.color.axis.text) {
        x *= this.#dpr;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align
        if (this.#polared) {
            this.ctx.fillText(text, x, y * -this.#dpr)
        } else {
            this.ctx.save();
            this.ctx.translate(x, (this.height - y) * this.#dpr);
            this.ctx.rotate(rad);
            this.ctx.fillText(text, 0, 0)
            this.ctx.restore()
        }
        return this
    }

    /**
     * @param {number} rad
     * @return {Canvas}
     */
    rotate(rad) {
        this.ctx.rotate(rad)
        return this
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} rad
     * @param {string?} color
     * @return {Canvas}
     */
    arrow(x, y, width, height, rad, color = this.color.axis.line) {
        x *= this.#dpr;
        y = (this.height - y) * this.#dpr;
        width *= this.#dpr * .5;
        height *= -this.#dpr;

        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rad);

        this.ctx.beginPath()
        this.ctx.lineTo(-width, 0);
        this.ctx.lineTo(0, height);
        this.ctx.lineTo(width, 0);
        this.ctx.lineTo(0, 0);

        this.ctx.fillStyle = color;
        this.ctx.fill();

        this.ctx.closePath();
        this.ctx.restore();

        return this;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {string?} color
     * @return {Canvas}
     */
    dot(x, y, radius, color) {
        x *= this.#dpr
        y = (this.height - y) * this.#dpr;
        this.ctx.beginPath()
        this.ctx.fillStyle = color ?? this.color.point.dot
        this.ctx.moveTo(x, y)
        this.ctx.arc(x, y, radius * this.#dpr, 0, 2 * Math.PI);
        this.ctx.fill()
        this.ctx.closePath()
        return this
    }


    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {string} color
     * @return {Canvas}
     */
    circle(x, y, radius, color = this.color.axis.line) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = color;
        if (this.#polared) y *= -1
        else y = this.height - y
        this.ctx.arc(x * this.#dpr, y * this.#dpr, radius * this.#dpr, 0, 2 * Math.PI);
        this.ctx.setLineDash([])
        this.ctx.stroke()
        this.ctx.closePath()
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
     * @return {Canvas}
     */
    arc(x, y, radius, startAngle, endAngle, color = this.color.axis.line, dash = []) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = color;
        if (this.#polared) y *= -1
        else y = this.height - y
        this.ctx.arc(x * this.#dpr, y * this.#dpr, radius * this.#dpr, -endAngle, -startAngle);
        this.ctx.setLineDash(dash.map(i => i * this.#dpr));
        this.ctx.stroke()
        this.ctx.closePath()
        return this
    }

    /**
     * @param {number} dx
     * @param {number} dy
     * @param {number} distance
     * @param {number} rad
     * @return {Canvas}
     */
    polar(dx, dy, distance, rad) {
        this.#polared = true
        this.ctx.save();
        this.ctx.translate((dx + distance * Math.cos(rad)) * this.#dpr, (dy + distance * Math.sin(rad)) * this.#dpr);
        this.ctx.rotate(rad);
        return this
    }

    /**
     * @return {Canvas}
     */
    restore() {
        this.#polared = false
        this.ctx.restore()
        return this
    }

    get #dpr() {
        return window.devicePixelRatio ?? 1;
    }

    _redraw() {
        if (!this.#visible) return;
        const rect = this.div.getBoundingClientRect();
        this.width = rect.width
        this.height = rect.height
        this.canvas.width = this.width * this.#dpr;
        this.canvas.height = this.height * this.#dpr;

        this.ctx.lineJoin = 'miter'
        this.ctx.lineWidth = this.#dpr;
        this.ctx.font = `${12 * this.#dpr}px Arial`;

        this.mouseX = clientX - rect.x;
        this.mouseY = this.height - (clientY - rect.y);
        if (this.mouseLeftX !== null) this.mouseLeftX -= rect.x
        if (this.mouseLeftY !== null) this.mouseLeftY = this.height - (this.mouseLeftY - rect.y)
        if (this.mouseRightX !== null) this.mouseRightX -= rect.x
        if (this.mouseRightY !== null) this.mouseRightY = this.height - (this.mouseRightY - rect.y)

        // noinspection JSValidateTypes
        this.#draw(this);
        this.mouseLeftX = null;
        this.mouseLeftY = null;
        this.mouseRightX = null;
        this.mouseRightY = null;

        this.#raf = requestAnimationFrame(this._redraw);
    }

    #visible = false;

    get visible() {
        return this.#visible;
    }

    set visible(visible) {
        this.#visible = visible;

        if (this.#visible) {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.div.appendChild(this.canvas);
            this.canvas.addEventListener('click', e => {
                e.preventDefault()
                e.stopImmediatePropagation()
                this.mouseLeftX = e.clientX
                this.mouseLeftY = e.clientY
            })
            this.canvas.addEventListener('contextmenu', e => {
                e.preventDefault()
                e.stopImmediatePropagation()
                this.mouseRightX = e.clientX
                this.mouseRightY = e.clientY
            })
            this._redraw();
        } else {
            this.canvas.remove();
            this.canvas = null;
            cancelAnimationFrame(this.#raf)
        }
    }

    /**
     * @param {HTMLElement} div
     * @param {CanvasDraw} draw
     */
    static observe(div, draw) {
        map.set(div, new Canvas(div, draw));
        observer.observe(div);
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        /** @type {Canvas} */
        const canvas = map.get(entry.target)
        const v = entry.intersectionRatio > 0
        if (canvas.visible) {
            if (v) return
        } else {
            if (!v) return
        }
        canvas.visible = v
    });
}, {
    threshold: [1, .1, 0]
});

addEventListener('mousemove', e => {
    clientX = e.clientX
    clientY = e.clientY
});
