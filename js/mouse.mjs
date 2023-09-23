const Mouse = {
    clientX: 0,
    clientY: 0,
}
addEventListener('mousemove', e => {
    Mouse.clientX = e.clientX
    Mouse.clientY = e.clientY
});

export default Mouse
