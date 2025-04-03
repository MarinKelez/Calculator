let toClear = false;
const addValue = (value) => {
    if(checkups(value)) return;
    if(value === "+" || value === "-" || value === "*" || value === "/") {
        $("#display").text(value);
        const textHistory = $("#screen-all").text();
        $("#screen-all").text(textHistory + value);
    } else {
        const currentText = $("#display").text();
        const textHistory = $("#screen-all").text();
        $("#display").text(currentText + value);
        $("#screen-all").text(textHistory + value);
    }
}
const checkups = (val) => {
    if($("#display").text() === "0" && val === "0") return true;
    if($("#display").text().includes(".") && val === ".") return true;
    if($("#display").text() === "0") $("#display").text("");
    if(toClear) {
        if(!isNaN(val)) {
            $("#display").text("");
            toClear = !toClear;
        } else {
            $("#screen-all").text($("#display").text());
            $("#display").text("");
            toClear = !toClear;
        }
    }
}
const reset = () => {
    $("#display").text("0");
    $("#screen-all").text("");
}
const result = (values) => {
    for(let i = 1; i < values.length; i++) {
        if(isNaN(values[i]) && isNaN(values[i + 1])) {
            console.log(isNaN(values[i]) && isNaN(values[i + 1]));
            if(values[i] === "*" && values[i + 1] === "-" && !isNaN(values[i + 2])) break;
            else {
                values.splice(i, 1);
                i--;
            }
        } 

    }
    for(let i = 1; i < values.length; i++) {
        if(values[i] === "*") {
            if(values[i + 1] === "-") {
                values.splice(i-1, 3, values[i - 1] * (-values[i + 2]));
            } else {
                values.splice(i-1, 2, values[i - 1] * values[i + 1]);
            }
        } 
        else if(values[i] === '/') {
            if(values[i + 1] === "-") {
                values.splice(i-1, 3, values[i - 1] / (-values[i + 2]));
            } else {
                values.splice(i-1, 2, values[i - 1] / values[i + 1]);
            }
        } 
    }
    let resulting = Number(values[0]);
    for(let i = 1; i < values.length; i++) {
        if(values[i] === '+') resulting += Number(values[i + 1]);
        else if(values[i] === '-') resulting -= Number(values[i + 1]);
    }
    toClear = !toClear;
    return resulting;
}
const calculate = () => {
    const regex = /\d+(\.\d+)?|\+|\-|\*|\//g;
    const value = $("#screen-all").text().replace(/\s+/g, "");
    $("#display").text(result(value.match(regex)));
    $("#screen-all").text("");
}

$(document).ready(() => {
    reset();
    $("#zero").click(() => addValue("0"));
    $("#one").click(() => addValue("1"));
    $("#two").click(() => addValue("2"));
    $("#three").click(() => addValue("3"));
    $("#four").click(() => addValue("4"));
    $("#five").click(() => addValue("5"));
    $("#six").click(() => addValue("6"));
    $("#seven").click(() => addValue("7"));
    $("#eight").click(() => addValue("8"));
    $("#nine").click(() => addValue("9"));
    $("#clear").click(() => reset());
    $("#divide").click(() => addValue("/"));
    $("#multiply").click(() => addValue("*"));
    $("#subtract").click(() => addValue("-"));
    $("#add").click(() => addValue("+"));
    $("#decimal").click(() => addValue("."));
    $("#equals").click(() => calculate());
})