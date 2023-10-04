import {Canvas} from "../canvas.mjs";

Canvas.observe(document.querySelector('.canvas-axis'), c => {
    const aw = 4;
    const ah = 30;
    const p = 16;

    const cx = c.width * .5;
    const cy = c.height * .5;

    const xc = Math.floor((c.width * .5 - p) / ah);
    const yc = Math.floor((c.height * .5 - p) / ah);

    const xs = cx - ah * xc;
    const xe = cx + ah * (xc - 1);
    const ys = cy - ah * yc;
    const ye = cy + ah * (yc - 1);

    c
        .lineX(cy, xs, xe) // axis: x
        .arrow(xe, cy, aw * 2, ah, Math.PI * .5)
        .lineY(cx, ys, ye) // Y axis
        .arrow(cx, ye, aw * 2, ah, 0)
        .text('ось X', xs, cy - 20, 0, 'left', c.colorHelp)
        .text('ось Y', cx + 20, ys, Math.PI * -.5, 'left', c.colorHelp)


    for (let i = 1; i <= xc; i++) {
        if (i < xc - 1) {
            const x = cx + ah * i;
            c
                .lineY(x, cy - aw, cy + aw, c.colorAxisMark)
                .text(i.toString(), x, cy + 7, 0)
        }
        const x = cx - ah * i;
        c
            .lineY(x, cy - aw, cy + aw, c.colorAxisMark)
            .text((-i).toString(), x, cy + 7, 0);

    }

    for (let i = 1; i <= yc; i++) {
        if (i < yc - 1) {
            const y = cy + ah * i;
            c
                .lineX(y, cx - aw, cx + aw, c.colorAxisMark)
                .text(i.toString(), cx - 7, y - 4, 0, 'right')
        }
        const y = cy - ah * i;
        c
            .lineX(y, cx - aw, cx + aw, c.colorAxisMark)
            .text((-i).toString(), cx - 7, y - 4, 0, 'right');
    }

    c.lineX(c.mouseY, cx, c.mouseX, c.colorDot);
    c.lineY(c.mouseX, cy, c.mouseY, c.colorDot);
    c.dot(c.mouseX, c.mouseY, 5);


    const ux = (c.mouseX - cx) / ah;
    const uy = (c.mouseY - cy) / ah;

    const align = ux > 0 ? 'left' : 'right';
    const dx = ux > 0 ? 20 : -20;
    const dy = uy > 0 ? 10 : -20;

    c.text(`X: ${ux.toFixed(1)}, Y: ${uy.toFixed(1)}`, c.mouseX + dx, c.mouseY + dy, 0, align, c.colorHelp)
})
