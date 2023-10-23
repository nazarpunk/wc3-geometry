/** @typedef { import('./point.mjs').Point } Point */
export class Segment {
    /**
     * @param {Point} a
     * @param {Point} b
     */
    constructor(a, b) {
        this.a = a
        this.b = b
    }

    /** @type {Point} */ a
    /** @type {Point} */ b

    get angle() {
        return Math.atan2(this.b.y - this.a.y, this.b.x - this.a.x)
    }

    /**
     * @param {Point} point
     * @param {Point} output
     * @return {Segment}
     */
    perpendicular(point, output) {
        // Прямая, параллельная оси X
        if (this.a.y === this.b.y) {
            output.move(point.x, this.a.y)
            return this
        }

        // Прямая, параллельная оси Y
        if (this.a.x === this.b.x) {
            output.move(this.b.x, point.y)
            return this
        }

        const m = (this.b.y - this.a.y) / (this.b.x - this.a.x) // Находим угловой коэффициент прямой AB
        const c = this.a.y - m * this.a.x // Находим свободный член c уравнения прямой AB
        const mPerpendicular = -1 / m // Находим угловой коэффициент перпендикулярной прямой
        const cPerpendicular = point.y - mPerpendicular * point.x // Находим свободный член уравнения перпендикулярной прямой, проходящей через точку (x, y)

        // Находим точку пересечения перпендикулярной прямой с прямой AB
        const xIntersection = (cPerpendicular - c) / (m - mPerpendicular)
        const yIntersection = m * xIntersection + c
        output.move(xIntersection, yIntersection)

        return this
    }


    get distance() {
        const dx = this.b.x - this.a.x
        const dy = this.b.y - this.a.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}
