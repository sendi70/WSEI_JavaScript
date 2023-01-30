let intervalRef = setInterval(
    () => {
        next()
    },
    3000
)
let scrollingState = true;
let licznik = 1;
const slider = document.getElementById("slider");
const nextBt = document.getElementsByClassName("next")[0];
const prevBt = document.getElementsByClassName("prev")[0];
const dots = document.querySelectorAll(".dot");
const pauseButton = document.getElementById("pause")

const next = () => {
    if (slider.scrollLeft + 600 < slider.scrollWidth) {
        licznik++;
        slider.scrollTo({ left: slider.scrollLeft + 600, top: 0 });
    }
    else {
        licznik = 1;
        slider.scrollTo({ left: 0, top: 0 });
    }
    dotChange()
}
const prev = () => {
    console.log(slider.scrollLeft)
    if (slider.scrollLeft - 600 > 0) {
        licznik++;
        slider.scrollTo({ left: slider.scrollLeft - 600, top: 0 });
    }
    else {
        licznik = 1;
        slider.scrollTo({ left: 3000, top: 0 });
    }
    dotChange()
}
const resetInterval = () => {
    clearInterval(intervalRef)
    intervalRef = setInterval(
        () => {
            next()
        },
        3000
    )
}
const dotChange = () => {
    const num = (slider.scrollLeft / 600) + 1
    dots.forEach(element => {
        element.style.backgroundColor = "transparent"
    });
    console.log(num)
    const dot = document.getElementById(num);
    dot.style.backgroundColor = "red"
}
const selectImg = (e) => {
    slider.scrollTo({ left: (e.target.id - 1) * 600, top: 0 });
    dotChange()
    resetInterval()
}
const pauseScrolling = () => {
    if (scrollingState) {
        clearInterval(intervalRef)
        pauseButton.innerText = "RESUME"
        scrollingState = !scrollingState
    }
    else {
        resetInterval()
        pauseButton.innerText = "PAUSE"
        scrollingState = !scrollingState
    }
}
nextBt.addEventListener("click", next)
prevBt.addEventListener("click", prev)
dots.forEach(el => {
    el.addEventListener("click", selectImg)
})
pauseButton.addEventListener("click", pauseScrolling)
