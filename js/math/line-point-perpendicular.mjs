/**
 * @param {number} xa
 * @param {number} ya
 * @param {number} xb
 * @param {number} yb
 * @param {number} px
 * @param {number} py
 * @return {[number,number]}
 */
export const LinePointPerpendicular = (xa, ya, xb, yb, px, py) => {
    if (ya === yb) return [px, ya] // Прямая, паралельная оси X
    if (xa === xb) return [xb, py] // Прямая, паралельная оси Y

    const m = (yb - ya) / (xb - xa); // Находим угловой коэффициент прямой AB
    const c = ya - m * xa; // Находим свободный член c уравнения прямой AB
    const mPerpendicular = -1 / m; // Находим угловой коэффициент перпендикулярной прямой
    const cPerpendicular = py - mPerpendicular * px; // Находим свободный член c уравнения перпендикулярной прямой, проходящей через точку (x, y)

    // Находим точку пересечения перпендикулярной прямой с прямой AB
    const xIntersection = (cPerpendicular - c) / (m - mPerpendicular);
    const yIntersection = m * xIntersection + c;

    return [xIntersection, yIntersection];
}
