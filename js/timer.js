var actualTimer;

function clearTimers() {
    var clearDate = document.getElementById("finish-timer");
    clearInterval(actualTimer);
    clearDate.innerHTML = "";
}

function startTimer(time, timerSelector) {
    var timerCount = time*60;

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
    document.getElementById("finish-timer").innerHTML = "Timer will finish at " + newHours + ":" + newMinutes;

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
        if (timerCount < 0) {
            clearTimers();
            document.getElementById("timer-header").style.display = "block";
            document.getElementById("alert-message").innerHTML = "Timer stopped. Set new one or quit?";
            document.getElementById("not-confirm").onclick = function () {
                document.getElementById("wrapper").style.display = "none";
            };
            document.getElementById("confirm").onclick = function () {
                document.getElementById("timer-header").style.display = "none";
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
            document.getElementById("timer-header").style.display = "block";
            document.getElementById("alert-message").innerHTML = "Another timer is running. Set new one?";
            document.getElementById("not-confirm").onclick = function () {
                document.getElementById("timer-header").style.display = "none";
            };
            document.getElementById("confirm").onclick = function () {
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
            document.getElementById("validation-message").innerHTML = "Your timer is not valid";
            return;
        }
        document.getElementById("validation").style.display = "none";
        setTimer(recievedTime);
        recievedTime.value = "";
    }
};

