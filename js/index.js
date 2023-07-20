const inputHoursHTML = document.querySelector("#inputHours");
const inputMinutesHTML = document.querySelector("#inputMinutes");
const inputSecondsHTML = document.querySelector("#inputSeconds");
const btnStart = document.querySelector("#btnStart");
const btnPause = document.querySelector("#btnPause");
const btnStop = document.querySelector("#btnStop");
const currentTime = document.querySelector("#currentTime");
const info = document.querySelector("#info")
const audio = document.querySelector("#audio")

btnPause.disabled = true
btnStop.disabled = true

let timer = null;
let hours = 0;
let minutes = 0;
let seconds = 0;

// --> Input values verification & restrictions

inputHoursHTML.addEventListener("input", function () {
    inputHoursHTML.value = parseInt(inputHoursHTML.value || 0);
    if (inputHoursHTML.value > 24) { inputHoursHTML.value = 24 };
    if (inputHoursHTML.value < 0) { inputHoursHTML.value = 0 };
})

inputMinutesHTML.addEventListener("input", function () {
    inputMinutesHTML.value = parseInt(inputMinutesHTML.value || 0);
    if (inputMinutesHTML.value > 59) { inputMinutesHTML.value = 59 };
    if (inputMinutesHTML.value < 0) { inputMinutesHTML.value = 0 };
})

inputSecondsHTML.addEventListener("input", function () {
    inputSecondsHTML.value = parseInt(inputSecondsHTML.value || 0);
    if (inputSecondsHTML.value > 59) { inputSecondsHTML.value = 59 };
    if (inputSecondsHTML.value < 0) { inputSecondsHTML.value = 0 };
})
// <-- Input values verification & restrictions


function startCounting() {
    hours = Number(inputHoursHTML.value);
    minutes = Number(inputMinutesHTML.value);
    seconds = Number(inputSecondsHTML.value);

    if ((hours == 0 && minutes == 0 && seconds == 0) || (hours < 0 || minutes < 0 || seconds < 0)) {
        info.innerHTML = "Please enter a valid time interval."
        return;
    }
    info.innerHTML = ""

    btnStart.disabled = true
    btnPause.disabled = false
    btnStop.disabled = false
    inputHoursHTML.disabled = true
    inputMinutesHTML.disabled = true
    inputSecondsHTML.disabled = true

    timer = setInterval(counting, 1000);
}

function pauseCounting() {
    btnStart.disabled = false
    btnPause.disabled = true
    btnStop.disabled = false
    inputHoursHTML.disabled = false
    inputMinutesHTML.disabled = false
    inputSecondsHTML.disabled = false

    clearInterval(timer)
}

function stopCounting() {
    btnStart.disabled = false
    btnPause.disabled = true
    btnStop.disabled = true
    inputHoursHTML.disabled = false
    inputMinutesHTML.disabled = false
    inputSecondsHTML.disabled = false

    clearInterval(timer);
    hours = 0;
    minutes = 0;
    seconds = 0;

    currentTime.innerHTML = "Timer stopped"
}

function counting() {
    if(seconds > 0){
        seconds--
    } else if(minutes > 0){
        minutes--
        seconds = 59
    } else if(hours > 0){
        hours--
        minutes = 59
    }

    currentTime.innerHTML = "Remaining: " + hours + "h " + minutes + "m " + seconds + "s."
    inputHoursHTML.value = hours
    inputMinutesHTML.value = minutes
    inputSecondsHTML.value = seconds

    if (seconds === 0 && minutes === 0 && hours === 0) {
        stopCounting();
        audio.play()
        return;
    }
}