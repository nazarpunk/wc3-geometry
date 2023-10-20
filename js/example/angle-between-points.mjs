import {Canvas} from '../draw/canvas.mjs'
import {round} from '../math/round.mjs'
import {Axis} from '../draw/axis.mjs'
import {Point} from '../math/point.mjs'
import {Segment} from '../math/segment.mjs'
import {Color} from '../draw/color.mjs'

const preD = document.querySelector('.canvas-angle-between-points-pre-diff')
const preA = document.querySelector('.canvas-angle-between-points-pre-angle')

const axis = new Axis()

const A = new Point(2.5, 4.5)
const B = new Point(0, 0)
const B1 = new Point(0, 0)
const B2 = new Point(0, 0)
const O = new Point(0, 0)

const AB = new Segment(A, B)
const OB1 = new Segment(O, B1)

Canvas.observe(document.querySelector('.canvas-angle-between-points'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    B.move(axis.mouseX, axis.mouseY)
    B1.move(B.x - A.x, B.y - A.y)
    B2.move(A.x + AB.distance, A.y)

    axis
        .line(A, B, {color: Color.line.primary,})
        .line(A, B2, {color: Color.axis.base, dash: [5]})
        .line(O, B1, {color: Color.point.fill, dash: [5]})
        .arc(O, AB.distance, 0, OB1.angle, {color: Color.point.fill, dash: [5], short: true})
        .point(A, {name: 'A', track: true})
        .point(O, {name: 'A1'})
        .point(B, {
            name: ['B', `deg: ${(OB1.angle * 180 / Math.PI).toFixed(2)}`, `rad: ${OB1.angle.toFixed(2)}`],
            track: true
        })
        .point(B1, {name: 'B1', dash: [5], track: true})
        .point(B2, {name: 'B2', track: false, color: Color.axis.base})

    preD.querySelector('[data-v=bx]').innerHTML = `${round(B.x).toFixed(2)} - ${round(A.x).toFixed(2)} = ${round(B.x - A.x).toFixed(2)}`
    preD.querySelector('[data-v=by]').innerHTML = `${round(B.y).toFixed(2)} - ${round(A.y).toFixed(2)} = ${round(B.y - A.y).toFixed(2)}`
    preA.querySelector('[data-v=a]').innerHTML = `<i>Atan2</i>(${round(B.y).toFixed(2)}, ${round(B.x).toFixed(2)}) = ${round(OB1.angle).toFixed(2)}`

})
