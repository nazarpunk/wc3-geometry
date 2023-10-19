/** @callback GridDraw */

/** @typedef { import('../math/point.mjs').Point } Point */

import {Color} from './color.mjs'

/** @type {Map<HTMLDivElement, Grid>} */ const map = new Map()

let clientX = 0, clientY = 0

export class Grid {

    /**
     * @param {HTMLElement} container
     * @param {GridDraw} draw
     */
    constructor(container, draw) {
        this.#container = container
        this._redraw = this._redraw.bind(this)
        this.#draw = draw
    }

    /** @type {HTMLDivElement} */ #container
    /** @type {HTMLCanvasElement} */ #canvas
    /** @type {CanvasRenderingContext2D} */ #ctx
    #raf = 0
    /** @type {GridDraw} */ #draw
    /** @type {?number} */ mouseLeftX = null
    /** @type {?number} */ mouseLeftY = null
    /** @type {?number} */ mouseRightX = null
    /** @type {?number} */ mouseRightY = null
    /** @type {?number} */ mouseCenterX = null
    /** @type {?number} */ mouseCenterY = null

    mouseX = 0
    mouseY = 0

    step = 25

    _redraw() {
        if (!this.#visible) return
        const dpr = window.devicePixelRatio ?? 1

        const rect = this.#container.getBoundingClientRect()

        this.#canvas.width = rect.width * dpr
        const h = rect.height * dpr
        this.#canvas.height = h

        const ctx = this.#ctx

        ctx.lineJoin = 'miter'
        ctx.lineWidth = dpr
        ctx.font = `${12 * dpr}px JetBrainsMono`

        ctx.scale(1, -1)
        ctx.translate(0, -h)

        const repeat = this.#draw(this)

        if (repeat !== false) this.#raf = requestAnimationFrame(this._redraw)
    }

    /**
     * @param {?number} dx
     * @param {?number} dy
     * @return {Grid}
     */
    grid(dx = .5, dy = .5) {
        const cw = this.#canvas.width
        const ch = this.#canvas.height
        const cx = cw * dx
        const cy = ch * dy

        const ctx = this.#ctx

        const dpr = window.devicePixelRatio ?? 1
        const step = this.step * dpr

        const cminx = Math.trunc(cx / step)
        const cminy = Math.trunc(cy / step)

        const cmaxx = Math.trunc((cw - cx) / step)
        const cmaxy = Math.trunc((ch - cy) / step)

        // === grid
        ctx.beginPath()
        for (let i = -cminx; i <= cmaxx; i++) {
            const x = cx + i * step
            ctx.moveTo(x, 0)
            ctx.lineTo(x, ch)
        }

        for (let i = -cminy; i <= cmaxy; i++) {
            const y = cy + i * step
            ctx.moveTo(0, y)
            ctx.lineTo(cw, y)
        }
        ctx.strokeStyle = Color.axis.grid
        ctx.stroke()
        ctx.closePath()

        // === axis
        ctx.beginPath()
        ctx.moveTo(0, cy)
        ctx.lineTo(cw, cy)
        ctx.moveTo(cx, 0)
        ctx.lineTo(cx, ch)
        ctx.strokeStyle = Color.axis.base
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        const h = 5 * dpr

        // step: x
        for (let i = -cminx; i <= cmaxx; i++) {
            const x = cx + i * step
            ctx.moveTo(x, cy - h)
            ctx.lineTo(x, cy + h)
        }

        // step: y
        for (let i = -cminy; i <= cmaxy; i++) {
            const y = cy + i * step
            ctx.moveTo(cx - h, y)
            ctx.lineTo(cx + h, y)
        }

        // text
        ctx.save()
        ctx.scale(1, -1)
        ctx.fillStyle = Color.axis.text

        // text: x
        ctx.textAlign = 'center'
        for (let i = -cminx; i <= cmaxx; i++) {
            if (i === 0) continue
            const x = cx + i * step
            const text = `${i}`
            const metrics = ctx.measureText(text)
            const hwm = metrics.width * .5
            if (x - hwm < 0) continue
            if (x + hwm > cw) continue
            ctx.fillText(text, x, -cy + metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + h + 4 * dpr)
        }

        // text: y
        ctx.textAlign = 'right'
        for (let i = -cminy; i <= cmaxy; i++) {
            if (i === 0) continue
            const y = cy + i * step
            const text = `${i}`
            const metrics = ctx.measureText(text)
            const th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
            const hth = th * .5
            if (y - hth < 0) continue
            if (y + hth > ch) continue
            ctx.fillText(text, cx - h - 4 * dpr, -y + hth)
        }

        ctx.restore()
        ctx.strokeStyle = Color.axis.step
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        return this
    }

    // === Visibility

    #visible = false

    get visible() {
        return this.#visible
    }

    set visible(visible) {
        this.#visible = visible

        if (!this.#visible) {
            this.#canvas.remove()
            this.#canvas = null
            cancelAnimationFrame(this.#raf)
            return
        }

        this.#canvas = document.createElement('canvas')
        this.#ctx = this.#canvas.getContext('2d')
        this.#container.appendChild(this.#canvas)

        this.#canvas.addEventListener('click', e => {
            e.preventDefault()
            e.stopImmediatePropagation()
            this.mouseLeftX = e.clientX
            this.mouseLeftY = e.clientY
        })
        this.#canvas.addEventListener('mousedown', e => {
            if (e.button !== 1) return
            e.preventDefault()
            e.stopImmediatePropagation()
            this.mouseCenterX = e.clientX
            this.mouseCenterY = e.clientY
        })
        this.#canvas.addEventListener('contextmenu', e => {
            e.preventDefault()
            e.stopImmediatePropagation()
            this.mouseRightX = e.clientX
            this.mouseRightY = e.clientY
        })
        this._redraw()
    }

    /** @param {Grid} grid */
    static observe(grid) {
        map.set(grid.#container, grid)
        observer.observe(grid.#container)
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const grid = map.get(entry.target)
        const v = entry.intersectionRatio > 0
        if (grid.visible) {
            if (v) return
        } else {
            if (!v) return
        }
        grid.visible = v
    })
}, {
    threshold: [1, .1, 0]
})

addEventListener('mousemove', e => {
    clientX = e.clientX
    clientY = e.clientY
})
