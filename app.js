const clock=document.getElementById('clock');
const datedisplayer=document.getElementById('datedisplayer');
const copytimebtn=document.getElementById('copytimebtn');
const copydatebtn=document.getElementById('copydatebtn');
const naversrchbtn=document.getElementById('naversrchbtn');
const naversrchform=document.getElementById('naversrchform');
const naversrchinpt=document.getElementById('naversrchinpt');
const youtubesrchbtn=document.getElementById('youtubesrchbtn');
const youtubesrchform=document.getElementById('youtubesrchform');
const youtubesrchinpt=document.getElementById('youtubesrchinpt');
const stopwatch=document.getElementById('stopwatch');
const stopwatchstartbtn=document.getElementById('stopwatchstartbtn');
const stopwatchstopbtn=document.getElementById('stopwatchstopbtn');
const stopwatchendbtn=document.getElementById('stopwatchendbtn');
const watchtogglebtn=document.getElementById('watchtogglebtn');
const timersecinput=document.getElementById('timersecinput');
const timermininput=document.getElementById('timermininput');
const timerinputdiv=document.getElementById('timerinputdiv');
const seatmakerbtn=document.getElementById('seatmakerbtn');
const OKAYSOUND=new Audio('okaysound.mp3');
const copyIcon5=`<svg xmlns="http://www.w3.org/2000/svg" width="0.5vw" height="0.5vw" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
</svg>`;
const copyIcon6=`<svg xmlns="http://www.w3.org/2000/svg" width="0.6vw" height="0.6vw" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
</svg>`;
const checkIcon=`<svg xmlns="http://www.w3.org/2000/svg" width="0.6vw" height="0.6vw" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg>`;
const daylist=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let stopwatchtime=0;
let stopwatchinterval;
let stopwatchRunning=false;
let isTimer=false;
function displayCurrentTime(){
    const current=new Date();
    const hour=current.getHours();
    const minute=current.getMinutes();
    const second=current.getSeconds();
    const year=current.getFullYear();
    const month=current.getMonth()+1;
    const date=current.getDate();
    const day=current.getDay();
    clock.innerText=`${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}:${second.toString().padStart(2,'0')}`;
    datedisplayer.innerText=`${year}.${month}.${date} (${daylist[day]})`;
};
function copytime(){
    navigator.clipboard.writeText(clock.innerText);
    copytimebtn.innerHTML=`${checkIcon} Copied!`;
    OKAYSOUND.play();
    setInterval(()=>{copytimebtn.innerHTML=`${copyIcon6} Copy Time`; copytimebtn.style.fontSize='0.7vw';},5000);
};
function copydate(){
    navigator.clipboard.writeText(datedisplayer.innerText);
    copydatebtn.innerHTML=`${checkIcon} Copied!`;
    OKAYSOUND.play();
    setInterval(()=>{copydatebtn.innerHTML=`${copyIcon5} Copy Date`; copydatebtn.style.fontSize='0.57vw';},5000);
};
function srchNaver(e){
    e.preventDefault();
    location.href=`https://search.naver.com/search.naver?ie=UTF-8&sm=whl_hty&query=${naversrchinpt.value}`;
};
function srchYoutube(e){
    e.preventDefault();
    if (youtubesrchinpt.value){
        location.href=`https://www.youtube.com/results?search_query=${youtubesrchinpt.value}`;
    };
};
function startStopwatch(){
    stopwatch.style.display='block';
    stopwatch.innerText=`${Math.floor(stopwatchtime/60).toString().padStart(2,'0')}:${(stopwatchtime%60).toString().padStart(2,'0')}`;
    if (isTimer){
        if (!stopwatchRunning){
            stopwatchinterval=setInterval(()=>{    
                stopwatchtime-=1;
                stopwatch.innerText=`${Math.floor(stopwatchtime/60).toString().padStart(2,'0')}:${(stopwatchtime%60).toString().padStart(2,'0')}`;
            },1000);
            stopwatchRunning=true;
            stopwatchstopbtn.style.display='inline-block';
            stopwatchstartbtn.style.display='none';
            stopwatchendbtn.style.display='inline-block';
            stopwatchstartbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatchstopbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatch.style.color='wheat';
            timerinputdiv.style.display='none';
        };
    }else{
        if (!stopwatchRunning){
            stopwatchinterval=setInterval(()=>{    
                stopwatchtime+=1;
                stopwatch.innerText=`${Math.floor(stopwatchtime/60).toString().padStart(2,'0')}:${(stopwatchtime%60).toString().padStart(2,'0')}`;
            },1000);
            stopwatchRunning=true;
            stopwatchstopbtn.style.display='inline-block';
            stopwatchstartbtn.style.display='none';
            stopwatchendbtn.style.display='inline-block';
            stopwatchstartbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatchstopbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatch.style.color='wheat';
            timerinputdiv.style.display='none';
        };
    };
};
function stopStopwatch(){
    if (isTimer){
        if (stopwatchRunning){
            clearInterval(stopwatchinterval);
            stopwatchRunning=false;
            stopwatchstartbtn.style.display='inline-block';
            stopwatchstopbtn.style.display='none';
            stopwatchstartbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatchendbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatchstopbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatch.style.color='lightpink';
        };
    }else {
        if (stopwatchRunning){
            clearInterval(stopwatchinterval);
            stopwatchRunning=false;
            stopwatchstartbtn.style.display='inline-block';
            stopwatchstopbtn.style.display='none';
            stopwatchstartbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatchendbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatchstopbtn.style.width=stopwatch.offsetWidth/2+'px';
            stopwatch.style.color='lightpink';
        };
    };
};
function stopwatchClicked(){
    if (stopwatchRunning){
        stopStopwatch();
    } else {
        startStopwatch();
    };
};
function endStopwatch(){
    clearInterval(stopwatchinterval);
    stopwatchRunning=false;
    stopwatchstartbtn.style.display='block';
    stopwatchstopbtn.style.display='none';
    stopwatchendbtn.style.display='none';
    stopwatchstartbtn.style.width=stopwatch.offsetWidth+'px';
    stopwatchendbtn.style.width=stopwatch.offsetWidth/2+'px';
    stopwatchstopbtn.style.width=stopwatch.offsetWidth/2+'px';
    if (isTimer){
        timerinputdiv.style.display='block';
        stopwatch.style.display='none';
    }else {
        timerinputdiv.style.display='none';
        stopwatch.style.display='block';
    }
    stopwatch.style.color='wheat';
    stopwatchtime=0;
    stopwatch.innerText='00:00';
};
function switchstopwatchtimer(){
    stopwatchtime=0;
    timermininput.value='';
    timersecinput.value='';
    if (isTimer){
        stopwatch.style.display='block';
        isTimer=false;
        timerinputdiv.style.display='none';
    } else {
        isTimer=true;
        stopwatch.style.display='none';
        timerinputdiv.style.display='block';
    };
};
function updateTimerTime(){
    if (isTimer){
        if (timermininput.value<0||timersecinput.value<0){
            alert('Negative number NOT ALLOWED!');
            timermininput.value='';
            timersecinput.value='';
        } else if(timersecinput.value>60){
            alert('Seconds value must be less than 60!');
            timermininput.value='';
            timersecinput.value='';
        } else if((timermininput.value)%1!==0||(timersecinput.value)%1!==0){
            alert('Float number NOT ALLOWED!');
            timermininput.value='';
            timersecinput.value='';
        };
        stopwatchtime=Number(timermininput.value)*60+Number(timersecinput.value);
    };
};
displayCurrentTime();
setInterval(displayCurrentTime,500);
copytimebtn.addEventListener('click',copytime);
clock.addEventListener('click',copytime);
copydatebtn.addEventListener('click',copydate);
datedisplayer.addEventListener('click',copydate);
naversrchform.addEventListener('submit',srchNaver);
youtubesrchform.addEventListener('submit',srchYoutube);
stopwatchstartbtn.addEventListener('click',startStopwatch);
stopwatchstopbtn.addEventListener('click',stopStopwatch);
stopwatch.addEventListener('click',stopwatchClicked);
stopwatchendbtn.addEventListener('click',endStopwatch);
watchtogglebtn.addEventListener('click',switchstopwatchtimer);
timermininput.addEventListener('change',updateTimerTime);
timersecinput.addEventListener('change',updateTimerTime);
stopwatchstopbtn.style.display='none';
stopwatchendbtn.style.display='none';
timerinputdiv.style.display='none';
stopwatchstartbtn.style.width=stopwatch.offsetWidth+'px';
stopwatchstopbtn.style.width=stopwatch.offsetWidth+'px';
stopwatchendbtn.style.width=stopwatch.offsetWidth/2+'px';