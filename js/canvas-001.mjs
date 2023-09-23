const div = document.querySelector('.canvas-001');
let visible = false;
let canvas, ctx;


const grid_size = 50;
const x_axis_distance_grid_lines = 5;
const y_axis_distance_grid_lines = 5;
const x_axis_starting_point = {number: 1, suffix: '\u03a0'};
const y_axis_starting_point = {number: 1, suffix: ''};

const draw = () => {
    const dpr = devicePixelRatio ?? 1;
    const rect = div.getBoundingClientRect();

    const cw = canvas.width = rect.width * dpr;
    const ch = canvas.height = rect.height * dpr;

    const num_lines_x = Math.floor(ch / grid_size);
    const num_lines_y = Math.floor(cw / grid_size);



    if (dpr > 1) return;

    for (let i = 0; i <= num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        if (i === x_axis_distance_grid_lines)
            ctx.strokeStyle = "#de0505";
        else
            ctx.strokeStyle = "#9a9a9a";

        if (i === num_lines_x) {
            ctx.moveTo(0, grid_size * i);
            ctx.lineTo(cw, grid_size * i);
        } else {
            ctx.moveTo(0, grid_size * i + 0.5);
            ctx.lineTo(cw, grid_size * i + 0.5);
        }
        ctx.stroke();
    }

    for (let i = 0; i <= num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        if (i === y_axis_distance_grid_lines)
            ctx.strokeStyle = "#fd0000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i === num_lines_y) {
            ctx.moveTo(grid_size * i, 0);
            ctx.lineTo(grid_size * i, ch);
        } else {
            ctx.moveTo(grid_size * i + 0.5, 0);
            ctx.lineTo(grid_size * i + 0.5, ch);
        }
        ctx.stroke();
    }

    ctx.translate(y_axis_distance_grid_lines * grid_size, x_axis_distance_grid_lines * grid_size);

    for (let i = 1; i < num_lines_y - y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#47ff00";

        ctx.moveTo(grid_size * i + 0.5, -3);
        ctx.lineTo(grid_size * i + 0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '19px Arial';
        ctx.textAlign = 'start';
        ctx.fillStyle = '#fff'
        ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, grid_size * i - 2, 15);
    }

    for (let i = 1; i < y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#f5c200";

        ctx.moveTo(-grid_size * i + 0.5, -3);
        ctx.lineTo(-grid_size * i + 0.5, 3);
        ctx.stroke();

        ctx.font = '19px Arial';

        ctx.textAlign = 'end';
        ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -grid_size * i + 3, 15);
    }

    for (let i = 1; i < num_lines_x - x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#9eea86";

        ctx.moveTo(-3, grid_size * i + 0.5);
        ctx.lineTo(3, grid_size * i + 0.5);
        ctx.stroke();

        ctx.font = '19px Arial';
        ctx.textAlign = 'start';
        ctx.color = '#fff'
        ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, grid_size * i + 3);
    }

    for (let i = 1; i < x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#09ecc6";

        ctx.moveTo(-3, -grid_size * i + 0.5);
        ctx.lineTo(3, -grid_size * i + 0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, -grid_size * i + 3);
    }

}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const v = entry.intersectionRatio > 0
        if (visible) {
            if (v) return
        } else {
            if (!v) return
        }
        visible = v

        if (!canvas) {
            canvas = document.createElement('canvas');
            ctx = canvas.getContext("2d");
            div.appendChild(canvas);
            draw();
        }


    });
}, {
    threshold: [1, .1, 0]
});
observer.observe(div);


export {}
