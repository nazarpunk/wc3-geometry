import {Canvas} from '../draw/canvas.mjs'
import {Axis} from '../draw/axis.mjs'
import {Point} from '../math/point.mjs'

const axis = new Axis()

const A = new Point(0, 0)

Canvas.observe(document.querySelector('.canvas-convex-hull'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    })

    A.move(axis.mouseX, axis.mouseY)
})