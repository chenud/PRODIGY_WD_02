document.addEventListener("DOMContentLoaded", function() {
    let startStopBtn = document.getElementById("startStopBtn");
    let resetBtn = document.getElementById("resetBtn");
    let lapBtn = document.getElementById("lapBtn");
    let display = document.getElementById("display");
    let laps = document.getElementById("laps");

    let interval;
    let running = false;
    let startTime;
    let elapsedTime = 0;

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
        startStopBtn.textContent = "Pause";
        running = true;
    }

    function pauseTimer() {
        clearInterval(interval);
        elapsedTime = Date.now() - startTime;
        startStopBtn.textContent = "Start";
        running = false;
    }

    function resetTimer() {
        clearInterval(interval);
        elapsedTime = 0;
        display.textContent = "00:00:00";
        startStopBtn.textContent = "Start";
        laps.innerHTML = "";
        running = false;
    }

    function updateTime() {
        let time = Date.now() - startTime;
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        let milliseconds = Math.floor((time % 1000) / 10);

        display.textContent = 
            (minutes < 10 ? "0" : "") + minutes + ":" + 
            (seconds < 10 ? "0" : "") + seconds + ":" + 
            (milliseconds < 10 ? "0" : "") + milliseconds;
    }

    function addLap() {
        let lapTime = display.textContent;
        let li = document.createElement("li");
        li.textContent = lapTime;
        laps.appendChild(li);
    }

    startStopBtn.addEventListener("click", function() {
        if (running) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    resetBtn.addEventListener("click", resetTimer);
    lapBtn.addEventListener("click", addLap);
});
