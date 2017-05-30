function startTimer(time, timerSelector) {
    var timerCount = time;
    var hours;
    var minutes;
    var seconds;
    var actualTimer = setInterval(function () {
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
        }
    }, 1000);
}

window.onload = function () {
    var time = 33333;
    var timerSelector = document.getElementById('timer');
    startTimer(time, timerSelector);
};

