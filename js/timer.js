var actualTimer;

function addClass(element, className) {
    if (element.classList)
        element.classList.add(className);
    else
        element.className += ' ' + className;
}

function removeClass(element, className) {
    if (element.classList)
        element.classList.remove(className);
    else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function clearTimers() {
    var finishDate = document.getElementById("finish-timer");
    clearInterval(actualTimer);
    finishDate.innerHTML = "";
}

function startTimer(time, timerSelector) {
    var timerCount = time*60;
    var progressStatus = document.getElementById("progress-status");
    var onePercent = 100/timerCount;
    var myPercents = 0;
    //current time when timer stop
    var newDate = new Date();
    var newMinutes = newDate.getMinutes() + time;
    var newHours;
    if (newMinutes >= 60) {
        newHours = newDate.getHours() + parseInt(newMinutes / 60, 10);
        newMinutes = parseInt(newMinutes % 60, 10);
        if (newHours >= 24) {
            newHours = newHours - 24;
            newMinutes = parseInt(newMinutes % 60, 10);newMinutes = parseInt(newMinutes % 60, 10);
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
    var finishDate = document.getElementById("finish-timer");
    finishDate.innerHTML = "Timer will finish at " + newHours + ":" + newMinutes;

    //main timer mechanism
    var hours;
    var minutes;
    var seconds;
    function timer () {
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

        //a bit of animation
        progressStatus.style.width = (myPercents+"%");
        myPercents = myPercents += onePercent;

        if (timerCount < 0) {
            console.log("I'm here")
            clearTimers();
            var alertWithConfirm = document.getElementById("timer-header");
            alertWithConfirm.style.display = "block";
            document.getElementById("alert-message").innerHTML = "Timer stopped. Set new one or quit?";
            document.getElementById("not-confirm").onclick = function () {
                progressStatus.style.width = 0;
                setTimeout(function () {
                    addClass(document.getElementById("time-setters-holder"), "loading");
                },500);
                setTimeout(function () {
                    addClass(document.getElementById("input-group"), "loading");
                },500);
                setTimeout(function () {
                    addClass(document.getElementById("timer"), "loading");
                },1000);
                setTimeout(function () {
                    addClass(document.getElementById("wrapper"), "loading");
                },1500);
            };
            document.getElementById("confirm").onclick = function () {
                progressStatus.style.width = 0;
                removeClass(document.getElementById("wrapper"), "loading");
                alertWithConfirm.style.display = "none";
            };
        }
    }
    timer();
    actualTimer = setInterval(timer,1000);
}

window.onload = function () {
    var time;
    var timerSelector = document.getElementById('timer');

    function setTimer(recievedTime) {
        if (recievedTime % 1 !== 0) {
            document.getElementById("finish-timer").innerHTML = "Only integer number please";
            return;
        }
        time = parseInt(recievedTime);
        if (isNaN(time)) {
            document.getElementById("finish-timer").innerHTML = "Only numbers please";
            return;
        }
        if (timerSelector.innerHTML !== "00:00") {
            var alertWithConfirm = document.getElementById("timer-header");
            alertWithConfirm.style.display = "block";
            setTimeout(function () {
                removeClass(alertWithConfirm, "loading");
            },200);
            document.getElementById("alert-message").innerHTML = "Another timer is running. Set new one?";
            document.getElementById("not-confirm").onclick = function () {
                setTimeout(function () {
                    addClass(alertWithConfirm, "loading");
                },400);
                alertWithConfirm.style.display = "none";
            };
            document.getElementById("confirm").onclick = function () {
                setTimeout(function () {
                    addClass(document.getElementById("timer-header"), "loading");
                },400);
                document.getElementById("timer-header").style.display = "none";
                clearTimers();
                startTimer(time, timerSelector);
            };
        }
        else {
            startTimer(time, timerSelector);
        }
    }

    //preset timers
    var buttons = document.getElementsByClassName("timer-setter");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            addClass(document.getElementById("validation"), "loading");
            document.getElementById("validation").style.display = "none";
            var recievedTime = this.getAttribute("value");
            setTimer(recievedTime);
        }
    }

    //custom timer
    var userTimer = document.getElementById("get-input");
    userTimer.onclick = function (){
        var recievedTime = document.getElementById("user-timer").value;
        //user timer validation
        if (recievedTime <=0 || recievedTime > 24*60) {
            document.getElementById("validation").style.display = "block";
            removeClass(document.getElementById("validation"), "loading");
            document.getElementById("validation-message").innerHTML = "Timer will work 24 hours maximum. It's 1440 minutes.";
            return;
        }
        addClass(document.getElementById("validation"), "loading");
        document.getElementById("validation").style.display = "none";
        setTimer(recievedTime);
        recievedTime.value = "";
    }
};

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function whenItsReady () {
    //animations
    setTimeout(function () {
        removeClass(document.getElementById("wrapper"), "loading");
    },500);
    setTimeout(function () {
        removeClass(document.getElementById("timer"), "loading");
    },1000);
    setTimeout(function () {
        removeClass(document.getElementById("time-setters-holder"), "loading");
    },1500);
    setTimeout(function () {
        removeClass(document.getElementById("input-group"), "loading");
    },1500);
}

ready(whenItsReady());



