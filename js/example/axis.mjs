import {Point} from '../math/point.mjs'
import {Grid} from '../draw/grid.mjs'

const grid = new Grid(document.querySelector('.canvas-axis'), () => {
    grid
        .grid(.5, .5)

    grid.dragRelease().point(A, {trackX: true, trackY: true})

})

const A = new Point(2, 5)
grid.dragAdd(A)

Grid.observe(grid)
