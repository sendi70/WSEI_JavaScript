fpscounter = document.getElementById("fps")
const canvas = document.getElementById("myCanvas")
const slider = document.getElementById("slider")
const slength = document.getElementById("slength")
slider.addEventListener('change', ballCountUpdate)
slider.addEventListener('input', ballCountUpdate)
slength.addEventListener('onchange', lineLengthUpdate)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")
ctx.fillStyle = "blue"
let balls = []
const radius = 8
let threshold = innerWidth * 1 / 5
let Stop = 1
let animation;

function initialize() {
    threshold = innerWidth * slength.value / 100
    balls = []
    for (var i = 0; i < slider.value; i++) {
        let x = Math.random() * (canvas.width - radius * 2) + radius
        let y = Math.random() * (canvas.height - radius * 2) + radius
        let dx = (Math.random() - 0.5) * -3
        let dy = (Math.random() - 0.5) * -3
        let ball = { x: x, y: y, dx: dx, dy: dy }
        balls.push(ball)
    }
    if (Stop == 1) {
        draw();
    }
    Stop = 0
    lineLengthUpdate()
    ballCountUpdate();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < balls.length; i++) {

        var ball = balls[i]
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, radius, 0, 2 * Math.PI)
        ctx.fill()
        ball.x += ball.dx
        ball.y += ball.dy
        if (ball.x + radius > canvas.width || ball.x - radius < 0) {
            ball.dx = -ball.dx
        }
        if (ball.y + radius > canvas.height || ball.y - radius < 0) {
            ball.dy = -ball.dy
        }
    }
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            var distance = Math.sqrt(Math.pow(balls[i].x - balls[j].x, 2) + Math.pow(balls[i].y - balls[j].y, 2))
            if (distance < threshold) {
                ctx.beginPath()
                ctx.moveTo(balls[i].x, balls[i].y)
                ctx.lineTo(balls[j].x, balls[j].y)
                ctx.strokeStyle = '#8dcaff'
                ctx.stroke()
            }
        }
    }
    animation = requestAnimationFrame(draw)

}
function stop() {
    cancelAnimationFrame(animation)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Stop = 1
}

function ballCountUpdate() {
    document.getElementById("balls").innerHTML = "Balls:" + slider.value
}

function lineLengthUpdate() {
    document.getElementById("length").innerHTML = "Length:" + slength.value + "%"
}


let frameCount = 0

function updateFrame() {
    frameCount++
    requestAnimationFrame(updateFrame)
}

updateFrame();

setInterval(() => {
    let fps = frameCount
    frameCount = 0
    fpscounter.innerHTML = fps + "fps"
}, 1000)