const maximumTimer = 24*60*60;
var actualTimer;

function startTimer(time, timerSelector) {
    var timerCount = time*60;
    //user timer validation
    if (timerCount <=0 || timerCount > maximumTimer) {
        alert ("Your timer is not valid");
        return;
    }
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
            clearInterval(actualTimer);
            document.getElementById("finish-timer").innerHTML = "";
            alert("Timer is finshed");
        }
    }
    timer();
    actualTimer = setInterval(timer,1000);
}

window.onload = function () {
    var time;
    var timerSelector = document.getElementById('timer');

    //preset timers
    var buttons = document.getElementsByClassName("timer-setter");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            time = parseInt(this.value);
            if (timerSelector.innerHTML !== "00:00") {
                var newTimer = confirm("Another timer is running. Stop it?");
                if (newTimer) {
                    clearInterval(actualTimer);
                    document.getElementById("finish-timer").innerHTML = "";
                    startTimer(time, timerSelector);
                }
            }
            else {
                startTimer(time, timerSelector);
            }
        }
    }

    //custom timer
    var userTimer = document.getElementById("get-input");
    userTimer.onclick = function (){
        time = parseInt(document.getElementById("user-timer").value);
        document.getElementById("user-timer").value = "";
        if (timerSelector.innerHTML !== "00:00") {
            var newTimer = confirm("Another timer is running. Stop it?");
            if (newTimer) {
                clearInterval(actualTimer);
                document.getElementById("finish-timer").innerHTML = "";
                startTimer(time, timerSelector);
            }
        }
        else {
            startTimer(time, timerSelector);
        }
    }
};

