var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var second = document.getElementById("second");

var startButton = document.getElementById("start-button");
var pauseResumeButton = document.getElementById("pause-resume-button");
var resetButton = document.getElementById("reset-button");

//text input events

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


//text input events functions

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

//buttons events

startButton.addEventListener("mouseup", startTimer);
pauseResumeButton.addEventListener("mouseup", togglePauseResume);
resetButton.addEventListener("mouseup", ResetTimer);

function startTimer(e) {
    e.target.style.display = "none";
    e.target.parentNode.style.justifyContent = "space-around";
    pauseResumeButton.style.display = "block";
    resetButton.style.display = "block";
}

function togglePauseResume(e) {
    if(e.target.innerHTML == "Pause") {
        e.target.innerHTML = "Resume";
    }else{
        e.target.innerHTML = "Pause";
    }
}
function ResetTimer(e) {
    startButton.style.display = "block";
    e.target.parentNode.style.justifyContent = "center";
    pauseResumeButton.style.display = "none";
    pauseResumeButton.innerHTML = "Pause";
    resetButton.style.display = "none";
}


