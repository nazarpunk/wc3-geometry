import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";
import {AngleNormalize} from "../math/angle-normalize.mjs";
import {Point} from "../math/point.mjs";

const axis = new Axis();

const points = [
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
    new Point(0, 0),
]

Canvas.observe(document.querySelector('.canvas-angle-normalize'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    const ax = axis.maxCountX * .5
    const ay = axis.maxCountY * .5
    const bx = axis.mouseX
    const by = axis.mouseY

    const dist = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
    const rad = Math.atan2(by - ay, bx - ax);
    const da = Math.PI * 2 / 5;

    const xlist = [bx];
    const ylist = [by];
    const alist = [rad];

    for (let i = 1; i <= 5; i++) {
        const a = rad + da * i
        xlist.push(Math.cos(a) * dist + ax)
        ylist.push(Math.sin(a) * dist + ay)
        alist.push(a)
    }

    const line = (a, b) => axis.lineXY(xlist[a], ylist[a], xlist[b], ylist[b], {color: c.color.point.line})

    line(0, 2)
    line(2, 4)
    line(4, 1)
    line(1, 3)
    line(3, 0)

    axis
        .lineXY(ax, ay, bx, by, {color: c.color.point.dot})
        .pointXY(ax, ay, {name: 'A', track: false})

    for (let i = 0; i <= 4; i++) {
        const n = i > 0 ? i : '';
        axis
            .pointXY(xlist[i], ylist[i], {
                name: [`B${n}`, alist[i].toFixed(2)],
                track: false
            })

        const a = AngleNormalize(alist[i])
        const d = dist + 2

        axis.pointXY(
            Math.cos(a) * d + ax,
            Math.sin(a) * d + ay,
            {
                name: [`C${n}`, a.toFixed(2)],
                track: false
            }
        )

    }

})
