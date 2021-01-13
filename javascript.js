var hourInput = document.getElementById("hour");
var minuteInput = document.getElementById("minute");
var secondInput = document.getElementById("second");

var startButton = document.getElementById("start-button");
var pauseButton = document.getElementById("pause-button");
var cancelButton = document.getElementById("cancel-button");

var alarm = document.getElementById("alarm");


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

startButton.addEventListener("mouseup", startButtonActons);
pauseButton.addEventListener("mouseup", pauseButtonActions);
cancelButton.addEventListener("mouseup", cancelButtonActions);


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

function startButtonActons(e) {
    playAnimation.showMenu2();
    disableInputs(true);
    timer.set(hourInput.value, minuteInput.value, secondInput.value);
    timer.start();
    inputTextAutoUpdater.start();
}

function pauseButtonActions(e) {
    if(e.target.innerHTML == "Pause") {
        e.target.innerHTML = "Resume";
        timer.pause();
    }else{
        e.target.innerHTML = "Pause";
        timer.resume();
    }

    updateInputText();
}

function cancelButtonActions() {
    playAnimation.showMenu1();
    inputTextAutoUpdater.stop();
    disableInputs(false);
    pauseButton.innerHTML = "Pause";
    timer.cancel();
    updateInputText();
}


//functions

function disableInputs(value) {
    hourInput.disabled = value;
    minuteInput.disabled = value;
    secondInput.disabled = value;
}

var inputTextAutoUpdater = (function () {
    let frequency = 100;
    let value = false;

    function resetCounter() {
        cancelButtonActions();
        playAnimation.counterPopUp();
    };

    let updater = setInterval(function (){
        if (value){
            updateInputText();
            if(timer.isfinished()) resetCounter();
        }
    }, frequency);

    return {
        start: function () {
            value = true;
        },
        stop: function () {
            value = false;
        },
    };

})();

function formatText (text, type) {
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
        timeLeft = Math.max(timeLeft - (now()-timePoint), 0);
        timePoint = now();
    }

    return {
        isfinished: function () {
            return paused ? false : timeLeft === 0 ? true : false;
        },

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

            let seconds = Math.floor(timeLeft/1000);
            return {
                hour: Math.floor(seconds / 3600),
                minute: Math.floor(seconds % 3600 / 60),
                second: seconds % 3600 % 60,
            };
        },
    }
})();

var playAnimation = {
    counterPopUp: function () {
        alarm.currentTime = 0;
        alarm.volume = 0.3;
        alarm.play();

        hourInput.classList.remove("pop-up");
        hourInput.offsetHeight;
        hourInput.classList.add("pop-up");

        minuteInput.classList.remove("pop-up");
        minuteInput.offsetHeight;
        minuteInput.classList.add("pop-up");

        secondInput.classList.remove("pop-up");
        secondInput.offsetHeight;
        secondInput.classList.add("pop-up");
    },

    showMenu1: function () {
        cancelButton.classList.remove("right-slide-in");
        cancelButton.classList.remove("left-slide-out");
        cancelButton.offsetHeight;
        cancelButton.classList.add("left-slide-out");

        pauseButton.classList.remove("left-slide-in");
        pauseButton.classList.remove("right-slide-out");
        pauseButton.offsetHeight;
        pauseButton.classList.add("right-slide-out");

        startButton.classList.remove("fade-out");
        startButton.classList.remove("fade-in");
        startButton.offsetHeight;
        startButton.classList.add("fade-in");
    },

    showMenu2: function () {
        cancelButton.classList.remove("left-slide-out");
        cancelButton.classList.remove("right-slide-in");
        cancelButton.offsetHeight;
        cancelButton.classList.add("right-slide-in");
    
        pauseButton.classList.remove("right-slide-out");
        pauseButton.classList.remove("left-slide-in");
        pauseButton.offsetHeight;
        pauseButton.classList.add("left-slide-in");
    
        startButton.classList.remove("fade-in");
        startButton.classList.remove("fade-out");
        startButton.offsetHeight;
        startButton.classList.add("fade-out");  
    },
};