import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";
import {Point} from "../math/point.mjs";
import {Segment} from "../math/segment.mjs";
import {Color} from "../draw/color.mjs";
import {LineSegmentIntersect} from "../math/line-segment-intersect.mjs";

const axis = new Axis();

const A = new Point(-3, 4)
const B = new Point(2, 5)
const C = new Point(1, -3)
const D = new Point(-2, 3)
const E = new Point(0, 0)
const AB = new Segment(A, B)
const CD = new Segment(C, D)

const text = document.querySelector('.canvas-line-segment-intersect-text')
Canvas.observe(document.querySelector('.canvas-line-segment-intersect'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    });

    if (axis.mouseLeftX !== null) A.move(axis.mouseLeftX, axis.mouseLeftY)
    if (axis.mouseRightX !== null) B.move(axis.mouseRightX, axis.mouseRightY)
    if (axis.mouseCenterX !== null) C.move(axis.mouseCenterX, axis.mouseCenterY)
    D.move(axis.mouseX, axis.mouseY)

    AB.move(A, B)
    CD.move(C, D)

    const lw = Math.max(axis.maxCountX, axis.maxCountY) * 4


    const {x, y, a, b} = LineSegmentIntersect(A.x, A.y, B.x, B.y, C.x, C.y, D.x, D.y)
    const has = x !== null && y !== null
    E.move(x ?? 0, y ?? 0);

    axis
        .line(A, B, {color: Color.line.primary, dash: a ? [] : [5]})
        .line(C, D, {color: Color.line.primary, dash: b ? [] : [5]})
        .line(A, B.polar(AB.angle + Math.PI, lw))
        .line(B, A.polar(AB.angle, lw))
        .line(C, D.polar(CD.angle + Math.PI, lw))
        .line(D, C.polar(CD.angle, lw))
        .point(A, {name: 'A'})
        .point(B, {name: 'B'})
        .point(C, {name: 'C'})
        .point(D, {name: 'D'})

    if (has) {
        axis.point(E, {name: 'E'})
    }

    text.innerHTML = `Прямые ${has ? '<b>пересекаются</b>' : '<b>не пересекаются</b>'}`;


})
