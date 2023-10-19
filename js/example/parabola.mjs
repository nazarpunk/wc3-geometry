/*
function GetParabolaZEx takes real x, real d, real h, real z0, real zd returns real
    return 4 * h * x * (d -x) / (d * d) + x * (zd-z0) / d + z0
endfunction

function ParabolaZ2 takes real y0, real y1, real h, real d, real x returns real
    return (2*(y0 + y1 - 2*h)*(x/d - 1) + (y1 - y0))*(x/d) + y0
endfunction

https://www.hiveworkshop.com/threads/about-movement.172309/
function ParabolaZ2 takes real y0, real y1, real h, real d, real x returns real
    return ((4 * h / d) * (d - x) + y1 - y0) * (x / d) + y0
endfunction

https://www.hiveworkshop.com/threads/accurate-parabolaz-function.337645/
function GetParabolaZEx takes real curDist, real maxDist, real maxHeight, real startHeight, real endHeight returns real
        return 4 * maxHeight * curDist * (maxDist - curDist) / (maxDist * maxDist) + curDist * (endHeight-startHeight) / maxDist
endfunction


https://www.bit-101.com/blog/2022/12/coding-curves-07-parabolas/

 */

import {Grid} from '../draw/grid.mjs'

const grid = new Grid(document.querySelector('.canvas-parabola'), () => {

    grid.grid(.25, .25)

})

Grid.observe(grid)
