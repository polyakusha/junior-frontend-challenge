function startTimer(time, timerSelector) {
    var timerCount = time;
    var actualTimer = setInterval(function () {
        timerSelector.innerHTML = timerCount;
        timerCount--;
        if (timerCount < 0) {
            clearInterval(actualTimer);
        }
    }, 1000);
}

window.onload = function () {
    var time = 10;
    var timerSelector = document.getElementById('timer');
    startTimer(time, timerSelector);
};

