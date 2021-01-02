var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var second = document.getElementById("second");

//input events

hour.addEventListener("focus", selectAll);
hour.addEventListener("focusout", formatText);
hour.addEventListener("keypress", blockNonNumericInput);
hour.addEventListener("paste", pasteOnlyNumbers);

minute.addEventListener("focusout", formatText);
minute.addEventListener("focus", selectAll);
minute.addEventListener("keypress", blockNonNumericInput);
minute.addEventListener("paste", pasteOnlyNumbers);

second.addEventListener("focus", selectAll);
second.addEventListener("focusout", formatText);
second.addEventListener("keypress", blockNonNumericInput);
second.addEventListener("paste", pasteOnlyNumbers);


//input events functions

function selectAll(e) {
    e.target.select();
}

function formatText (e) {
    const maxValue = {
        hour: 99,
        minute: 60,
        second: 60,
    };

    if (e.target.value > maxValue[e.target.id]) e.target.value = maxValue[e.target.id];
    if (e.target.value.length == 1) e.target.value = "0"+e.target.value;
    if (e.target.value.length == 0) e.target.value = "00";
}

function blockNonNumericInput (e) {
    if (e.key === "Enter") {
        e.target.blur();
    }
    if (e.key.match(/[\D]/)) {
        e.preventDefault();
    }
}

function pasteOnlyNumbers (e) {
    const paste =  e.clipboardData.getData("text").replace(/\D/g, "");
    document.execCommand("insertHTML", false, paste);
    e.preventDefault();
}

//


