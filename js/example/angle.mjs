import {Canvas} from '../draw/canvas.mjs';

Canvas.observe(document.querySelector('.canvas-angle'), c => {

    const cx = c.width * .5;
    const cy = c.height * .5;
    const radius = Math.min(cx, cy) - 80;

    c.circle(cx, cy, radius);

    // deg
    for (let a = 0; a < 360; a += 10) {
        const rad = a * (Math.PI / 180);
        c
            .polar(cx, cy, radius, rad)
            .lineX(0, 0, -30, c.color.axis.mark)
            .rotate(Math.PI * .5)
            .text((360 - a).toString(), 0, -45, 0, 'center')
            .restore()
    }

    // rad
    for (let rad = 0; rad < 6.29; rad += .1) {
        c
            .polar(cx, cy, radius, rad)
            .lineX(0, 0, 20, c.color.axis.mark)
            .rotate(Math.PI * .5)
            .text((Math.PI * 2 - rad).toFixed(1), 0, 25, 0, 'center')
            .restore()
    }

    // cursor
    const rad = Math.atan2(cy - c.mouseY, cx - c.mouseX) + Math.PI;

    const nx = cx + radius * Math.cos(rad);
    const ny = cy + radius * Math.sin(rad);

    const dist = Math.sqrt((cx - c.mouseX) ** 2 + (cy - c.mouseY) ** 2);
    if (dist > radius) c.line(nx, ny, c.mouseX, c.mouseY, c.color.point.line);

    c
        .line(cx, cy, nx, ny, c.color.point.dot)
        .dot(nx, ny, 5)
        .lineX(cy, cx, cx + radius * .5, c.color.point.line)
        .arc(cx, cy, radius * .5, 0, rad, c.color.point.line)
        .polar(cx, cy, radius, -rad)
        .rotate(Math.PI * .5)
        .text('радианы', -10, 50, 0, 'right', c.color.point.text)
        .text(rad.toFixed(2), 10, 50, 0, 'left', c.color.point.text)
        .text('градусы', -10, -80, 0, 'right', c.color.point.text)
        .text((rad * (180 / Math.PI)).toFixed(1), 10, -80, 0, 'left', c.color.point.text)
        .restore()

})
