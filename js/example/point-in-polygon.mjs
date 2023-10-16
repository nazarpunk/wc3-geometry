import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";
import {Point} from "../math/point.mjs";

const axis = new Axis();

const A = new Point(0, 0)

/** @type {Point[]} */
const points = [
    new Point(5, 5),
    new Point(5, -5),
    new Point(-5, -5),
    new Point(-5, 5),
]

Canvas.observe(document.querySelector('.canvas-point-in-polygon'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    });

    if (axis.mouseLeftX !== null) points.push(new Point(axis.mouseLeftX, axis.mouseLeftY))
    if (axis.mouseRightX !== null) points.pop()

    A.move(axis.mouseX, axis.mouseY)

    if (points.length > 2) {
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            axis.point(p, {name: `P${i}`})
        }
    }

    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        axis.point(p, {name: `P${i}`})
    }

    axis
        .point(A, {name: 'A'})
        .line(A, new Point(axis.maxCountX * 2, A.y))
        .polygon(points)


})
