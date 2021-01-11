var hourInput = document.getElementById("hour");
var minuteInput = document.getElementById("minute");
var secondInput = document.getElementById("second");

var startButton = document.getElementById("start-button");
var pauseButton = document.getElementById("pause-button");
var cancelButton = document.getElementById("cancel-button");


//input events

hourInput.addEventListener("focus", OnInputFocus);
hourInput.addEventListener("focusout", onInputFocusOut);
hourInput.addEventListener("keypress", onInputKeypress);
hourInput.addEventListener("paste", onInputPaste);

minuteInput.addEventListener("focus", OnInputFocus);
minuteInput.addEventListener("focusout", onInputFocusOut);
minuteInput.addEventListener("keypress", onInputKeypress);
minuteInput.addEventListener("paste", onInputPaste);

secondInput.addEventListener("focus", OnInputFocus);
secondInput.addEventListener("focusout", onInputFocusOut);
secondInput.addEventListener("keypress", onInputKeypress);
secondInput.addEventListener("paste", onInputPaste);

startButton.addEventListener("mouseup", onStartButton);
pauseButton.addEventListener("mouseup", onPauseButton);
cancelButton.addEventListener("mouseup", onCancelButton);


//event functions

function OnInputFocus(e) {
    e.target.select();
}

function onInputFocusOut(e) {
    e.target.value = formatText(e.target.value, e.target.id);
}

function onInputKeypress(e) {
    if (e.key === "Enter") {
        e.target.blur();
    }
    if (e.key.match(/[\D]/)) {
        e.preventDefault();
        e.stopPropagation();
    }
}

function onInputPaste(e) {
    const paste =  e.clipboardData.getData("text").replace(/\D/g, "");
    document.execCommand("insertHTML", false, paste);
    e.preventDefault();
    e.stopPropagation();
}

function onStartButton(e) {
    cancelButton.classList.remove("right-slide-in");
    cancelButton.classList.remove("left-slide-out");
    cancelButton.offsetHeight;
    cancelButton.classList.add("right-slide-in");

    pauseButton.classList.remove("left-slide-in");
    pauseButton.classList.remove("right-slide-out");
    pauseButton.offsetHeight;
    pauseButton.classList.add("left-slide-in");

    startButton.classList.remove("fade-in");
    startButton.classList.remove("fade-out");
    startButton.offsetHeight;
    startButton.classList.add("fade-out");

    timer.set(hourInput.value, minuteInput.value, secondInput.value);
    timer.start();
    inputTextAutoUpdater(true);
}

function onPauseButton(e) {
    if(e.target.innerHTML == "Pause") {
        e.target.innerHTML = "Resume";
        timer.pause();
    }else{
        e.target.innerHTML = "Pause";
        timer.resume();
    }

    updateInputText();
}

function onCancelButton(e) {
    cancelButton.classList.remove("right-slide-in");
    cancelButton.classList.remove("left-slide-out");
    cancelButton.offsetHeight;
    cancelButton.classList.add("left-slide-out");

    pauseButton.classList.remove("left-slide-in");
    pauseButton.classList.remove("right-slide-out");
    pauseButton.offsetHeight;
    pauseButton.classList.add("right-slide-out");

    startButton.classList.remove("fade-in");
    startButton.classList.remove("fade-out");
    startButton.offsetHeight;
    startButton.classList.add("fade-in");

    pauseButton.innerHTML = "Pause";
    timer.cancel();
    inputTextAutoUpdater(false);
}


//functions

var inputTextAutoUpdater = function (on){
    updateInputText();

    if (on){
        this.timeout = setTimeout(inputTextAutoUpdater, 100, true);
    }else {
        clearTimeout(this.timeout);
    }
};

function formatText (text, type){
    const max = {
        hour: 99,
        minute: 60,
        second: 60,
    };

    text = text.replace(/\D/g, "");
    if (text > max[type]) text = max[type];
    if (text.length == 1) text = "0"+text;
    if (text.length == 0) text = "00";
    return text;
}

function updateInputText (){
    const timeValue = timer.getTime();
    hourInput.value = formatText(String(timeValue.hour), "hour");
    minuteInput.value = formatText(String(timeValue.minute), "minute");
    secondInput.value = formatText(String(timeValue.second), "second");
};

var timer = (function (){
    let defaultTime = 0;
    let timeLeft = 0;
    let timePoint = 0;
    let paused = true;

    function now (){
        return new Date().getTime();
    }

    function updateTimeLeft(){
        timeLeft -= Math.max(now()-timePoint, 0);
        timePoint = now();
    }

    return {
        set: function (hour, minute, second) {
            defaultTime = ((Number(hour) * 3600) + (Number(minute) * 60) + (Number(second))) * 1000;
        },

        start: function (){
            timeLeft = defaultTime;
            timePoint = now();
            paused = false;
        },

        cancel: function (){
            timeLeft = defaultTime;
            paused = true;
        },

        pause: function (){
            if(paused) return;
            updateTimeLeft();
            paused = true;
        },

        resume: function (){
            if(!paused) return;
            timePoint = now();
            paused = false;
        },

        getTime: function (){
            if (!paused) updateTimeLeft();
            if (timeLeft <= 0) return {hour: 0, minute: 0, second: 0};

            let seconds = Math.ceil(timeLeft/1000);
            return {
                hour: Math.floor(seconds / 3600),
                minute: Math.floor(seconds % 3600 / 60),
                second: seconds % 3600 % 60,
            };
        },
    }
})();

