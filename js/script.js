window.hours = {
    1: ['08:55', '09:40'],
    2: ['09:50', '10:35'],
    3: ['10:50', '11:35'],
    4: ['11:45', '12:30'],
    5: ['13:00', '13:45'],
    6: ['14:00', '14:45'],
    7: ['14:55', '15:40'],
    8: ['15:45', '16:48'],
}

start();

function start() {
    var date = new Date();
    var day = date.getDay();
    document.getElementById('selectedDay').value = day;
    
    setInterval(setClock, 1000);
    weekend()
    setTimerToEndOfTheLesson()
    changePlan()
}

function changePlan() {
    var selectedDay = document.getElementById('selectedDay').value;
    var selector = 'list-' + selectedDay;
    var plan = document.getElementsByClassName(selector)[0];

    turnOffPlans();
    plan.style.display = 'block';
}

function turnOffPlans() {
    var selectors = ['list-1', 'list-2', 'list-3', 'list-4', 'list-5'];

    selectors.forEach(function(selector) {
        var plan = document.getElementsByClassName(selector)[0];

        plan.style.display = 'none';
    });
}

function setClock() {
    var d = new Date();

    var h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var s = d.getSeconds()< 10 ? '0' + d.getSeconds() : d.getSeconds();

    var time = h + ':' + m + ':' + s;

    var clock = document.getElementById('clock');

    clock.innerHTML = time;

    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    var daysArray = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
    var dayNumber = d.getDay();

    var date = daysArray[dayNumber] + ' ' + day + '/' + month + '/' + year;

    var dateOutput = document.getElementById('date')

    dateOutput.innerHTML = date;
}

function weekend() {
    var d = new Date();
    var dayNumber = d.getDay();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(dayNumber);

    if (dayNumber === 0) {
        var weekend = "Jest weekend! :)"
    } else if (dayNumber === 6) {
        var weekend = "Jest weekend! :)"
    } else {
        var weekend = "Nie ma weekendu!"
    }

    var weekendOutput = document.getElementById('weekend')
    weekendOutput.innerHTML = weekend;
}

function setTimerToEndOfTheLesson() {
    var counterDate = new Date();
    var time = counterDate.getHours() + ':' + counterDate.getMinutes();
    var config = window.hours;

    var hour = Number(time.split(':')[0]);
    var minute = Number(time.split(':')[1]);

    var lesson = false;

    for (key in config) {
        var lessonTimes = config[key];

        var lessonHourStart = Number(lessonTimes[0].split(':')[0]);
        var lessonMinuteStart = Number(lessonTimes[0].split(':')[1]);
        var lessonHourStop = Number(lessonTimes[1].split(':')[0]);
        var lessonMinuteStop = Number(lessonTimes[1].split(':')[1]);

        if (
            (lessonHourStart <= hour && lessonHourStop >= hour) &&
            (hour === lessonHourStart && hour !== lessonHourStop ? minute >= lessonMinuteStart : minute < lessonMinuteStop)
        ) {
            lesson = true;
            document.getElementById('lesson').innerHTML = 'Trwa lekcja';
            var lessonMinToEnd = lessonMinuteStop - minute;
            document.getElementById('czasDoKonca').innerHTML = lessonMinToEnd + ' min';
        }
    }

    if (!lesson) {
        document.getElementById('lesson').innerHTML = 'Trwa przerwa';
        document.getElementById('czasDoKonca').innerHTML = '';
    }

}

setInterval(setTimerToEndOfTheLesson, 1000);