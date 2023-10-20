/** @callback GridDraw */

/** @typedef { import('../math/point.mjs').Point } Point */

import {Color} from './color.mjs'

/** @type {Map<HTMLDivElement, Grid>} */ const map = new Map()

export class Grid {

    /**
     * @param {HTMLElement} container
     * @param {GridDraw} draw
     */
    constructor(container, draw) {
        this.#container = container
        this._redraw = this._redraw.bind(this)
        this._mouseup = this._mouseup.bind(this)
        this._mousemove = this._mousemove.bind(this)
        this._touchmove = this._touchmove.bind(this)
        this._touchend = this._touchend.bind(this)
        this.#draw = draw
    }

    /** @type {HTMLDivElement} */ #container
    /** @type {HTMLCanvasElement} */ #canvas
    /** @type {CanvasRenderingContext2D} */ #ctx
    #raf = 0
    /** @type {GridDraw} */ #draw

    #centerX = 0
    #centerY = 0
    #step = 25
    #pointRadius = 6

    /**
     * @param {?number} dx
     * @param {?number} dy
     * @param {boolean} axisX
     * @param {boolean} axisY
     * @return {Grid}
     */
    grid(dx = .5, dy = .5, {
        axisX = true,
        axisY = true
    } = {}) {
        const cw = this.#canvas.width
        const ch = this.#canvas.height
        const cx = cw * dx
        const cy = ch * dy
        this.#centerX = cx
        this.#centerY = cy

        const ctx = this.#ctx

        const dpr = window.devicePixelRatio ?? 1
        const step = this.#step * dpr

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
        if (axisX || axisY) {
            ctx.beginPath()
            if (axisX) {
                ctx.moveTo(0, cy)
                ctx.lineTo(cw, cy)
            }
            if (axisY) {
                ctx.moveTo(cx, 0)
                ctx.lineTo(cx, ch)
            }
            ctx.strokeStyle = Color.axis.base
            ctx.stroke()
            ctx.closePath()

            ctx.beginPath()
            const h = 5 * dpr

            if (axisX) for (let i = -cminx; i <= cmaxx; i++) {
                const x = cx + i * step
                ctx.moveTo(x, cy - h)
                ctx.lineTo(x, cy + h)
            }

            if (axisY) for (let i = -cminy; i <= cmaxy; i++) {
                const y = cy + i * step
                ctx.moveTo(cx - h, y)
                ctx.lineTo(cx + h, y)
            }

            // text
            ctx.save()
            ctx.scale(1, -1)
            ctx.fillStyle = Color.axis.text

            if (axisX) {
                ctx.textAlign = 'center'
                for (let i = -cminx; i <= cmaxx; i++) {
                    if (i === 0 && axisY) continue
                    const x = cx + i * step
                    const text = `${i}`
                    const metrics = ctx.measureText(text)
                    const hwm = metrics.width * .5
                    if (x - hwm < 0) continue
                    if (x + hwm > cw) continue
                    ctx.fillText(text, x, -cy + metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + h + 4 * dpr)
                }
            }

            if (axisY) {
                ctx.textAlign = 'right'
                for (let i = -cminy; i <= cmaxy; i++) {
                    if (i === 0 && axisY) continue
                    const y = cy + i * step
                    const text = `${i}`
                    const metrics = ctx.measureText(text)
                    const th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
                    const hth = th * .5
                    if (y - hth < 0) continue
                    if (y + hth > ch) continue
                    ctx.fillText(text, cx - h - 4 * dpr, -y + hth)
                }
            }

            ctx.restore()
            ctx.strokeStyle = Color.axis.step
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
        return this
    }

    /**
     * @param {Point} point
     * @param {boolean} trackX
     * @param {boolean} trackY
     * @param {string?} name
     * @param {number[]} dash
     * @return {Grid}
     */
    point(point, {
        trackX = false,
        trackY = false,
        name,
        dash = [],
    } = {}) {
        const dpr = window.devicePixelRatio ?? 1
        const step = this.#step * dpr
        const r = this.#pointRadius * dpr

        const cx = this.#centerX
        const cy = this.#centerY

        const x = cx + point.x * step
        const y = cy + point.y * step

        const ctx = this.#ctx

        if (trackX || trackY) {
            ctx.beginPath()
            ctx.strokeStyle = Color.point.track.fill

            // === line
            let xy, yx

            if (trackX) {
                if (point.y < 0) {
                    ctx.moveTo(x, y + r)
                    xy = cy + step
                } else {
                    ctx.moveTo(x, y - r)
                    xy = cy - step
                }
                ctx.lineTo(x, xy)
            }

            if (trackY) {
                if (point.x < 0) {
                    ctx.moveTo(x + r, y)
                    yx = cx + step
                } else {
                    ctx.moveTo(x - r, y)
                    yx = cx - step
                }
                ctx.lineTo(yx, y)
            }

            ctx.fill()
            ctx.stroke()
            ctx.closePath()

            // === text
            ctx.save()
            ctx.scale(1, -1)
            /**
             * @param {number} value
             * @param {number} x
             * @param {number} y
             * @param {boolean} v
             */
            const text = (value, x, y, v) => {
                ctx.beginPath()
                const t = value.toFixed(2)
                const m = ctx.measureText(t)
                const th = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent

                const px = 6 * dpr
                const py = 8 * dpr
                let rw = m.width + px
                let rh = th + py
                let rx, ry, tx, ty
                if (v) {
                    rx = x - rw * .5
                    ry = -y
                    tx = x
                    ty = -y + th + py * .5
                    if (point.y < 0) {
                        ry -= rh
                        ty -= rh
                    }
                } else {
                    rx = x - rw
                    ry = -y - rh * .5
                    tx = x - m.width * .5 - px * .5
                    ty = -y + th * .5
                    if (point.x < 0) {
                        rx += rw
                        tx += rw
                    }
                }

                ctx.fillStyle = Color.point.track.fill
                ctx.roundRect(rx, ry, rw, rh, [4 * dpr])

                ctx.fill()

                ctx.textAlign = 'center'
                ctx.fillStyle = Color.point.track.text
                ctx.fillText(t, tx, ty)
                ctx.closePath()
            }
            if (trackX) text(point.x, x, xy, true)
            if (trackY) text(point.y, yx, y, false)

            ctx.restore()
        }

        ctx.beginPath()
        ctx.fillStyle = Color.point.fill
        ctx.strokeStyle = Color.point.stroke

        ctx.setLineDash(dash.map(v => v * dpr))
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        if ((name ?? '').length > 0) {
            ctx.beginPath()
            ctx.save()
            ctx.scale(1, -1)
            const m = ctx.measureText(name)
            ctx.fillStyle = Color.point.name
            ctx.fillText(name, x - m.width * .5, -y - r - 4 * dpr)
            ctx.restore()
            ctx.closePath()
        }

        return this
    }

    /**
     * @param {Point} a
     * @param {Point} b
     * @param {number[]} dash
     * @return {Grid}
     */
    segment(a, b, {
        dash = []
    } = {}) {
        const dpr = window.devicePixelRatio ?? 1
        const step = this.#step * dpr
        const r = this.#pointRadius * dpr / step
        const ctx = this.#ctx

        const dx = b.x - a.x
        const dy = b.y - a.y
        const angle = Math.atan2(dy, dx)
        const dist = Math.sqrt(dx * dx + dy * dy) - r

        const cx = this.#centerX
        const cy = this.#centerY

        const ax = Math.cos(angle) * r + a.x
        const ay = Math.sin(angle) * r + a.y
        const bx = Math.cos(angle) * dist + a.x
        const by = Math.sin(angle) * dist + a.y

        ctx.beginPath()
        ctx.strokeStyle = Color.point.stroke
        ctx.moveTo(cx + ax * step, cy + ay * step)
        ctx.lineTo(cx + bx * step, cy + by * step)
        ctx.setLineDash(dash.map(v => v * dpr))
        ctx.stroke()
        ctx.closePath()

        return this
    }


    // === Events
    #dx = 0
    #dy = 0
    /** @type {Touch} */ #touch = null
    /** @type {Point} */ #point = null

    dragRelease() {
        if (this.#point === null) return this
        if (this.#point.dragX) this.#point.x += this.#dx / this.#step
        if (this.#point.dragY) this.#point.y += -this.#dy / this.#step
        return this
    }

    /** @type {Point[]} */ #points = []

    /**
     * @param {...Point} points
     * @return {Grid}
     */
    dragAdd(...points) {
        for (const point of points) this.#points.push(point)
        return this
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    #dragStart(x, y) {
        if (this.#points.length === 0) return

        const rect = this.#container.getBoundingClientRect()
        const dpr = window.devicePixelRatio ?? 1
        const step = this.#step * dpr

        x = ((x - rect.x) * dpr - this.#centerX) / step
        y = (this.#canvas.height - (y - rect.y) * dpr - this.#centerY) / step

        /**
         * @param {Point} p
         * @return {number}
         */
        const dist = p => (x - p.x) ** 2 + (y - p.y) ** 2
        this.#points.sort((a, b) => dist(a) - dist(b))

        this.#point = this.#points[0]
    }

    _mouseup() {
        this.#point = null
        window.removeEventListener('mouseup', this._mouseup)
        window.removeEventListener('mousemove', this._mousemove)
    }

    /** @param {MouseEvent} e */
    _mousemove(e) {
        this.#dx += e.movementX
        this.#dy += e.movementY
    }

    /**
     * @param {TouchEvent} e
     */
    _touchmove(e) {
        if (e.touches.length > 1) return
        if (e.changedTouches.length === 0) return

        const touch = e.touches[0]
        this.#dx += touch.clientX - this.#touch.clientX
        this.#dy += touch.clientY - this.#touch.clientY

        this.#touch = touch
    }

    /** @param {TouchEvent} e */
    _touchend(e) {
        if (e.touches.length > 1) return
        this.#point = null
        window.removeEventListener('touchmove', this._touchmove)
        window.removeEventListener('touchend', this._touchend)
    }

    // === Visibility

    #visible = false

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
        this.#dx = 0
        this.#dy = 0

        if (repeat !== false) this.#raf = requestAnimationFrame(this._redraw)
    }

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

        this.#canvas.addEventListener('mousedown', e => {
            if (e.button !== 0) return
            e.preventDefault()
            e.stopImmediatePropagation()
            this.#dragStart(e.clientX, e.clientY)
            window.addEventListener('mousemove', this._mousemove)
            window.addEventListener('mouseup', this._mouseup)
        })

        this.#canvas.addEventListener('touchstart', e => {
            e.preventDefault()
            e.stopPropagation()
            if (e.touches.length > 1) return
            this.#touch = e.touches[0]
            this.#dragStart(this.#touch.clientX, this.#touch.clientY)
            window.addEventListener('touchmove', this._touchmove)
            window.addEventListener('touchend', this._touchend)
        }, {passive: false})

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
