var actualTimer;
var timerHeader;
var confirmationButton;
var alertMessage;
var timeSettersHolder;
var inputGroup;
var notConfirm;
var mainTimer;
var mainWrapper;
var progressStatus;
var timerSelector;
var finishDate;
var buttons;
var validationMessage;
var userTimer;
var userTimerInput;

//instead of jquery

function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else {
        element.className += " " + className;
    }
}

function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
}

function ready(fn) {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

//helping functions

function clearTimers() {
    clearInterval(actualTimer);
    finishDate.innerHTML = "";
}

function hideElement(element) {
    setTimeout(function () {
        addClass(element, "loading");
    }, 500);
    setTimeout(function () {
        element.style.display = "none";
    }, 800);
}
function whenTimerStop(time) {
    var newDate = new Date();
    var newMinutes = newDate.getMinutes() + time;
    var newHours;
    if (newMinutes >= 60) {
        newHours = newDate.getHours() + parseInt(newMinutes / 60, 10);
        newMinutes = parseInt(newMinutes % 60, 10);
        if (newHours >= 24) {
            newHours = newHours - 24;
            newMinutes = parseInt(newMinutes % 60, 10);
            newMinutes = parseInt(newMinutes % 60, 10);
            if (newMinutes < 10) {
                newMinutes = "0" + newMinutes;
            }
            newMinutes = newMinutes + " tomorrow";
        }
    }
    else {
        newHours = newDate.getHours();
    }
    if (newMinutes < 10) {
        newMinutes = "0" + newMinutes;
    }
    if (newHours < 10) {
        newHours = "0" + newHours;
    }
    finishDate.innerHTML = "Timer will finish at " + newHours + ":" + newMinutes;
}

function exitAlert() {
    timerHeader.style.display = "block";
    removeClass(confirmationButton, "confirmed");
    addClass(confirmationButton, "new-timer");
    setTimeout(function () {
        removeClass(timerHeader, "loading");
    }, 500);
    setTimeout(function () {
        addClass(timeSettersHolder, "loading");
    }, 500);
    setTimeout(function () {
        addClass(inputGroup, "loading");
    }, 500);
    setTimeout(function () {
        timeSettersHolder.style.display = "none";
    }, 1200);
    setTimeout(function () {
        inputGroup.style.display = "none";
    }, 1200);
    alertMessage.innerHTML = "Timer stopped. Set a new one or quit?";
    notConfirm.onclick = function () {
        progressStatus.style.width = 0;
        setTimeout(function () {
            addClass(mainTimer, "loading");
        }, 1000);
        setTimeout(function () {
            addClass(mainWrapper, "loading");
        }, 1500);
        setTimeout(function () {
            timerHeader.style.display = "none";
        }, 2000);
        setTimeout(function () {
            validationMessage.style.display = "none";
        }, 2000);
    };
    confirmationButton.onclick = function () {
        progressStatus.style.width = 0;
        timeSettersHolder.style.display = "block";
        inputGroup.style.display = "block";
        setTimeout(function () {
            removeClass(timeSettersHolder, "loading");
        }, 500);
        setTimeout(function () {
            removeClass(inputGroup, "loading");
        }, 500);
        removeClass(mainWrapper, "loading");
        timerHeader.style.display = "none";
        removeClass(confirmationButton, "new-timer");
        addClass(confirmationButton, "confirmed");
    };
}

function anotherTimerIsRunning(time) {
    if (timerSelector.innerHTML !== "00:00") {
        timerHeader.style.display = "block";
        setTimeout(function () {
            removeClass(timerHeader, "loading");
        }, 500);
        alertMessage.innerHTML = "Another timer is running. Set a new one?";
        notConfirm.onclick = function () {
            hideElement(timerHeader);
        };
        confirmationButton.onclick = function () {
            hideElement(timerHeader);
            clearTimers();
            startTimer(time, timerSelector);
        };
    }
    else {
        startTimer(time, timerSelector);
    }
}

function clearValidatorMessage() {
    hideElement(validationMessage);
}

function writeValidatorMessage(message) {
    validationMessage.style.display = "block";
    setTimeout(function () {
        removeClass(validationMessage, "loading");
    }, 500);
    validationMessageText.innerHTML = message;
    setTimeout(function () {
        hideElement(validationMessage);
    }, 3000);
}

var whenItsReady = function () {
    setTimeout(function () {
        removeClass(mainWrapper, "loading");
    }, 500);
    setTimeout(function () {
        removeClass(mainTimer, "loading");
    }, 1000);
    setTimeout(function () {
        removeClass(timeSettersHolder, "loading");
    }, 1500);
    setTimeout(function () {
        removeClass(inputGroup, "loading");
    }, 1500);
};


//main functions

function startTimer(time, timerSelector) {
    var timerCount = time * 60;

    //animation
    var onePercent = 100 / timerCount;
    var myPercents = 0;

    whenTimerStop(time);
    //main timer mechanism
    var hours;
    var minutes;
    var seconds;

    function timer() {
        minutes = parseInt(timerCount / 60, 10);
        seconds = parseInt(timerCount % 60, 10);
        if (minutes >= 60) {
            hours = parseInt(minutes / 60, 10);
            minutes = parseInt(minutes % 60, 10);
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (hours) {
            timerSelector.innerHTML = hours + ":" + minutes + ":" + seconds;
        }
        else {
            timerSelector.innerHTML = minutes + ":" + seconds;
        }

        timerCount--;
        //progress animation
        progressStatus.style.width = (myPercents + "%");
        myPercents = myPercents += onePercent;

        if (timerCount < 0) {
            clearTimers();
            exitAlert();
        }
    }

    timer();
    actualTimer = setInterval(timer, 1000);
}

var afterLoading = function () {
    var time;
    timerSelector = document.getElementById("timer");
    timerHeader = document.getElementById("timer-header");
    confirmationButton = document.getElementById("confirm");
    alertMessage = document.getElementById("alert-message");
    timeSettersHolder = document.getElementById("time-setters-holder");
    inputGroup = document.getElementById("input-group");
    notConfirm = document.getElementById("not-confirm");
    mainTimer = document.getElementById("timer");
    mainWrapper = document.getElementById("wrapper");
    progressStatus = document.getElementById("progress-status");
    finishDate = document.getElementById("finish-timer");
    buttons = document.getElementsByClassName("timer-setter");
    validationMessage = document.getElementById("validation");
    validationMessageText = document.getElementById("validation-message");
    userTimer = document.getElementById("get-input");
    userTimerInput = document.getElementById("user-timer");

    function setTimer(recievedTime) {
        time = parseInt(recievedTime);
        anotherTimerIsRunning(time);
    }

    function getPresetTimers() {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function () {
                clearValidatorMessage();
                var recievedTime = this.getAttribute("value");
                setTimer(recievedTime);
            }
        }
    }

    //custom timer
    function getUserTimer() {
        userTimer.onclick = function () {
            var recievedTime = userTimerInput.value;
            var time = parseInt(recievedTime);
            if (isNaN(time)) {
                writeValidatorMessage("Only numbers please");
                return;
            }
            else if (recievedTime % 1 !== 0) {
                writeValidatorMessage("Only integer number please");
                return;
            }
            else if (recievedTime <= 0 || recievedTime > 24 * 60) {
                writeValidatorMessage("1440 minutes is one day. That is the maximum");
                return;
            }

            clearValidatorMessage();
            setTimer(recievedTime);
            recievedTime.value = "";
        }
    }

    userTimerInput.addEventListener("keydown", function(e) {
        if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
            e.preventDefault();
        }
    });

    userTimerInput.addEventListener("keypress", function (e) {
        if (userTimerInput.value.length >= 4 && (e.keyCode != 8 || e.keyCode != 37 || e.keyCode != 46)) {
            e.preventDefault();
            return false;
        }
    });

    getPresetTimers();
    getUserTimer();
    whenItsReady();
};

ready(afterLoading);





