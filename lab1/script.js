let values = [...document.querySelector(".inputContainer").querySelectorAll("input[type=number]")]
values.forEach(el =>{
    el.addEventListener("input", refresh)
})

let addButton = document.querySelector("#add")
addButton.addEventListener("click", addField)

function addField(){
    let values = [...document.querySelector(".inputContainer").querySelectorAll("input[type=number]")]
    let lb = document.createElement("label")
    lb.value = "Value " + values.length
    lb.for = "value" + values.length
    document.querySelector(".inputContainer").insertBefore(lb, addButton)
}
function sum(values){
    let result = 0
    values.forEach(element => {
        result += element
    });
    return result
}
function avg(values){
    let tempSum = sum(values);
    return tempSum/values.length
}
function min(values) {
    return Math.min(...values)
}
function max(values) {
    return Math.max(...values)
}
function refresh(){
    let values = [...document.querySelector(".inputContainer").querySelectorAll("input[type=number]")]
    values = values.map(x => parseInt(x.value))
    document.querySelector("#sum").innerText = "Suma" + sum(values)
    document.querySelector("#avg").innerHTML = "Średnia" + avg(values)
    document.querySelector("#min").innerHTML = "Min" +min(values)
    document.querySelector("#max").innerHTML = "Max" + max(values)
}