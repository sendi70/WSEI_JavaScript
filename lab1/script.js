let values = [...document.querySelector(".inputContainer").querySelectorAll("input[type=number]")]
values.forEach(el => {
    el.addEventListener("input", refresh)
})
let buttons = [...document.querySelectorAll(".delete")]
buttons.forEach(el => {
    el.addEventListener("click", e => delNode(e))
})
refresh()

let addButton = document.querySelector("#add")
addButton.addEventListener("click", addField)
let countButton = document.querySelector("#count")
addButton.addEventListener("click", refresh)

function addField() {
    let values = [...document.querySelector(".inputContainer").querySelectorAll("input[type=number]")]
    let lb = document.createElement("label")
    lb.htmlFor = "value" + (values.length + 1)
    lb.innerText = "Value " + (values.length + 1)
    let bt = document.createElement("button")
    bt.className = "delete"
    bt.addEventListener('click', e => delNode(e))
    bt.innerText = "Delete"
    lb.appendChild(bt)
    let input = document.createElement("input")
    input.type = "number"
    input.name = "value" + (values.length + 1)
    input.id = "val" + (values.length + 1)
    input.value = 1
    input.addEventListener("input", refresh)
    document.querySelector(".inputContainer").insertBefore(lb, addButton)
    document.querySelector(".inputContainer").insertBefore(input, addButton)
}
function sum(values) {
    let result = 0
    values.forEach(element => {
        result += element
    });
    return result
}

function avg(values) {
    let tempSum = sum(values);
    return tempSum / values.length
}

function min(values) {
    return Math.min(...values)
}

function max(values) {
    return Math.max(...values)
}

function refresh() {
    let values = [...document.querySelector(".inputContainer").querySelectorAll("input[type=number]")]
    values = values.map(x => parseInt(x.value))
    document.querySelector("#sum").innerText = "Suma" + sum(values)
    document.querySelector("#avg").innerHTML = "Średnia" + avg(values)
    document.querySelector("#min").innerHTML = "Min" + min(values)
    document.querySelector("#max").innerHTML = "Max" + max(values)
}

function delNode(e) {
    e.target.parentElement.nextElementSibling.remove()
    e.target.parentElement.remove()
    refresh()
}