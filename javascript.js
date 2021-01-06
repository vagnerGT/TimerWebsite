var hourInput = document.getElementById("hour");
var minuteInput = document.getElementById("minute");
var secondInput = document.getElementById("second");

var startButton = document.getElementById("start-button");
var pauseResumeButton = document.getElementById("pause-resume-button");
var cancelButton = document.getElementById("cancel-button");


//text input events

hourInput.addEventListener("focus", selectAll);
hourInput.addEventListener("focusout", formatText);
hourInput.addEventListener("keypress", blockNonNumericInput);
hourInput.addEventListener("paste", pasteOnlyNumbers);

minuteInput.addEventListener("focusout", formatText);
minuteInput.addEventListener("focus", selectAll);
minuteInput.addEventListener("keypress", blockNonNumericInput);
minuteInput.addEventListener("paste", pasteOnlyNumbers);

secondInput.addEventListener("focus", selectAll);
secondInput.addEventListener("focusout", formatText);
secondInput.addEventListener("keypress", blockNonNumericInput);
secondInput.addEventListener("paste", pasteOnlyNumbers);

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
        e.stopPropagation();
    }
}

function pasteOnlyNumbers (e) {
    const paste =  e.clipboardData.getData("text").replace(/\D/g, "");
    document.execCommand("insertHTML", false, paste);
    e.preventDefault();
}


//Buttons events

startButton.addEventListener("pointerup", startTimerButton);
pauseResumeButton.addEventListener("mouseup", togglePauseResumeButton);
cancelButton.addEventListener("mouseup", cancelTimerButton);

function startTimerButton(e) {
    cancelButton.classList.remove("right-slide-in");
    cancelButton.classList.remove("left-slide-out");
    cancelButton.offsetHeight;
    cancelButton.classList.add("right-slide-in");

    pauseResumeButton.classList.remove("left-slide-in");
    pauseResumeButton.classList.remove("right-slide-out");
    pauseResumeButton.offsetHeight;
    pauseResumeButton.classList.add("left-slide-in");

    startButton.classList.remove("fade-in");
    startButton.classList.remove("fade-out");
    startButton.offsetHeight;
    startButton.classList.add("fade-out");
}

function togglePauseResumeButton(e) {
    if(e.target.innerHTML == "Pause") {
        e.target.innerHTML = "Resume";
    }else{
        e.target.innerHTML = "Pause";
    }
}

function cancelTimerButton(e) {
    cancelButton.classList.remove("right-slide-in");
    cancelButton.classList.remove("left-slide-out");
    cancelButton.offsetHeight;
    cancelButton.classList.add("left-slide-out");

    pauseResumeButton.classList.remove("left-slide-in");
    pauseResumeButton.classList.remove("right-slide-out");
    pauseResumeButton.offsetHeight;
    pauseResumeButton.classList.add("right-slide-out");

    startButton.classList.remove("fade-in");
    startButton.classList.remove("fade-out");
    startButton.offsetHeight;
    startButton.classList.add("fade-in");

    pauseResumeButton.innerHTML = "Pause";
}


//Timer

class counter {

    constructor () {
        this.startTime = 0;
        this.endTime = 0;
        this.paused = false;
    }

    timeNow(){
        return Math.ceil(new Date().getTime() / 1000);
    }

    setTimer(hour, minute, second) {
        this.startTime = timeNow();
        this.endTime = this.startTime + (hour * 3600) + (minute * 60) + (second);
    }

    getTime(){
        let timeLeft = endTimer - timeNow();
        if(timeLeft <= 0) return [0, 0, 0];

        let hour = Math.floor(timeLeft / 3600);
        let minute = Math.floor(timeLeft % 3600 / 60);
        let second = timeLeft % 3600 % 60;

        return [hour, minute, second];
    }
    
}

var timer = new counter();


