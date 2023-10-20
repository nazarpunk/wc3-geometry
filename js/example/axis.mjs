import {Point} from '../math/point.mjs'
import {Grid} from '../draw/grid.mjs'

const A = new Point(2, 5)

const grid = new Grid(document.querySelector('.canvas-axis'), () => {
    grid
        .grid(.5, .5)
        .point(A, {track: true})

    grid.pointMove(A)

})
Grid.observe(grid)
