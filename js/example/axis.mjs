import {Canvas} from "../draw/canvas.mjs";
import {Axis} from "../draw/axis.mjs";

const axis = new Axis();

Canvas.observe(document.querySelector('.canvas-axis'), c => {

    axis.draw(c, {
        centerX: c.width * .5,
        centerY: c.height * .5
    }).pointXY(axis.mouseX, axis.mouseY);

})
