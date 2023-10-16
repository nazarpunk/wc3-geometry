import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";
import {AngleNormalize} from "../math/angle-normalize.mjs";
import {Point} from "../math/point.mjs";
import {Color} from "../draw/color.mjs";

const axis = new Axis();

const A = new Point(1.5, 2.5)
const B = new Point(0, 0)

const AB = A.segment(B)

/** @type {Point[]} */
const points = [
    B,
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
]

const angles = points.map(() => 0)

Canvas.observe(document.querySelector('.canvas-angle-normalize'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    if (axis.mouseLeftX !== null) A.move(axis.mouseLeftX, axis.mouseLeftY)
    B.move(axis.mouseX, axis.mouseY)
    AB.update()

    const da = Math.PI * 2 / points.length;

    for (let i = 0; i < points.length; i++) {
        angles[i] = AB.angle + da * i
        points[i].fromPoint(A).polar(angles[i], AB.distance);
    }

    for (let i = 0; i < points.length; i++) {
        axis.line(points[i], points[(i + 2) % 5])
    }

    axis
        .line(A, B, {color: Color.line.primary})
        .point(A, {name: 'A'})

    for (let i = 0; i < points.length; i++) {
        const n = i > 0 ? i : '';
        axis.point(points[i], {name: [`B${n}`, angles[i].toFixed(2)]})
        const a = AngleNormalize(angles[i])
        axis.point(points[i].polar(a, 2), {name: [`C${n}`, a.toFixed(2)]})
    }
})
