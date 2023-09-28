const map = new Map()

/**
 * @name CanvasDraw
 * @function
 * @param {Canvas} canvas
 */

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

    get dpr() {
        return window.devicePixelRatio ?? 1;
    }

    _redraw() {
        if (!this.#visible) return;
        // noinspection JSValidateTypes
        this.#draw(this);
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

