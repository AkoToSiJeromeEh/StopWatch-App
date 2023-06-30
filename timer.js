let hours = 0;
let minutes = 0;
let seconds = 0;
let isRunning = false;
let interval;

const contHours = document.getElementById('hours');
const contMins = document.getElementById('minutes');
const contSeconds = document.getElementById('seconds');
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnReset = document.getElementById('btn-reset');

const startTimer = () => {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            contSeconds.innerText = seconds < 10 ? '0' + seconds : seconds;
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                contMins.innerText = minutes < 10 ? '0' + minutes : minutes;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
                contHours.innerText = hours < 10 ? '0' + hours : hours;
            }
        }, 1000);
    }
};

btnStart.addEventListener('click', startTimer);

const stopWatch = () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
    }
};

btnStop.addEventListener('click', stopWatch);

const resetWatch = () => {
    isRunning = false;
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    contSeconds.innerText = '00';
    contMins.innerText = '00';
    contHours.innerText = '00';
};

btnReset.addEventListener('click', resetWatch);


//adding timelapse
const btnTimelapse = document.getElementById('btn-lap');
const lapContainer = document.getElementById('timelapse-container');
const btnClearLaps = document.getElementById('clear-timelapse');
const lapsCont = document.getElementById('laps-cont');


//clear Timelapse function
const lapClears = () => {
    lapContainer.innerHTML = '';
    const clearButton = lapsCont.querySelector('#clear');
    if (clearButton) {
      clearButton.remove(); // Remove the "Clear" button if it exists
    }
}


//timelapse function
const lapTimer = () => {
    if(isRunning){
        let lapItems = document.createElement('li');
        lapItems.innerHTML = `
        ${hours < 10 ? '0' + hours : hours }:
        ${minutes < 10 ? '0' + minutes : minutes}:
        ${seconds < 10 ? '0' + seconds : seconds - 1}`;
        lapContainer.appendChild(lapItems);

        let span = document.createElement('span'); //add delete button
        span.innerHTML = "\u00d7"; //cross icon
        lapItems.appendChild(span);

       
        //add clear button
    if (!lapsCont.querySelector('#clear')) {
        let lapClear = document.createElement('clear-button');
        lapClear.innerHTML = `<button id="clear">Clear</button>`;
        lapsCont.appendChild(lapClear);
        lapClear.addEventListener('click', lapClears);

       
      }
       
    }
}


btnTimelapse.addEventListener('click', lapTimer);



//delete timelapse function
lapContainer.addEventListener('click', function(e) {
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();

        const clearButton = lapsCont.querySelector('#clear');
        if (clearButton && lapContainer.childElementCount === 0) {
            clearButton.remove(); // Remove the "Clear" button if it exists and there are no more laps
        }
    }
});



