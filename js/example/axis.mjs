import {Canvas} from '../draw/canvas.mjs'
import {Axis} from '../draw/axis.mjs'
import {Point} from '../math/point.mjs'
import {Grid} from '../draw/grid.mjs'

const axis = new Axis()

const A = new Point(2, 5)

if (0) {
    Canvas.observe(document.querySelector('.canvas-axis'), c => {

        axis.draw(c, {
            centerX: c.width * .5,
            centerY: c.height * .5
        }).point(A.move(axis.mouseX, axis.mouseY), {track: true})

    })
} else {
    const grid = new Grid(document.querySelector('.canvas-axis'), () => {
        grid
            .grid(.5, .5)
            .point(A, {track: true})

        grid.pointMove(A)

    })
    Grid.observe(grid)
}
