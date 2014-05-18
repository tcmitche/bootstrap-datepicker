(function() {
var INPUT;
var YEAR = new Date().getFullYear();
var MONTH = new Date().getMonth();
var DAY = new Date().getDate();
var BOX;

function div() { return document.createElement('div');}
function button(value) {
    var button = document.createElement('button');
    button.className = 'btn btn-default';
    button.value = value;
    button.textContent = value;
    return button;
}
function wrappedButton(value) {
    var wrap = div();
    wrap.className = 'btn-group';
    wrap.appendChild(button(value));
    return wrap;
}

function createContainer(x, y) {
    var box = div();
    var s = box.style;
    function px(n) { return n + 'px'; }
    s.position = 'absolute';
    s.left = px(x);
    s.top = px(y);
    s.width = px(322);
    s.backgroundColor = '#e8e8e8';
    return box;
}

function localeMonthName(index) {
    var date = new Date(YEAR, index, 1);
    return date.toLocaleDateString(undefined, {month: 'short'});
}

function localeDayName(index) {
    // This week started on a Sunday, I'm sure there's a better way...
    var date = new Date(2013, 11, index + 1);
    return date.toLocaleDateString(undefined, {weekday: 'short'});
}
/**
 * Returns the number of days in a given month.
 * @param  {int} month Month indexed by 0.
 * @param  {int} year The year.
 * @return {int} The number of days.
 */
function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function outputDate(event) {
    var DAY = event.target.value;
    var date = new Date(YEAR, MONTH, DAY);
    INPUT.value = date.toLocaleDateString();
    destroyCalendar();
}

function dateButton(date, disabled) {
    var b = button(date);
    b.className = 'btn btn-default calendar-date';
    if (disabled) {
        b.disabled = 'disabled';
    } else {
        b.onclick = outputDate;
    }
    return b;
}

function renderDateButtons(year, month, disabled) {
    var days = daysInMonth(year, month);
    //var week = div();
    var i;
    var startingDay = new Date(year, month, 1).getDay();
    var buttons = [];
    for (i = 1; i <= days; i++) {
        buttons.push(dateButton(i, disabled));
    }
    if (!disabled) {
        if (startingDay > 0) {
            var prev = renderDateButtons(year, month - 1, true);
            buttons = prev.slice(-startingDay).concat(buttons);
        }
        if (buttons.length < 35) {
            var next = renderDateButtons(year, month + 1, true);
            buttons = buttons.concat(next.slice(0, 35 - buttons.length));
        } else if (buttons.length > 35 && buttons.length < 42) {
            var next = renderDateButtons(year, month + 1, true);
            buttons = buttons.concat(next.slice(0, 42 - buttons.length));
        }
    }
    return buttons;
}

function previousMonth() {
    if (--MONTH < 0) {
        YEAR--;
        MONTH = 11;
    }
    renderCalendar();
}

function nextMonth() {
    if (++MONTH > 11) {
        YEAR++;
        MONTH = 0;
    }
    renderCalendar();
}

function createControls() {
    var container = div();
    container.className = 'btn-group btn-group-justified controls';
    var prev = wrappedButton('<');
    var year = wrappedButton(YEAR);
    var month = wrappedButton(localeMonthName(MONTH));
    var next = wrappedButton('>');
    prev.onclick = previousMonth;
    next.onclick = nextMonth;
    container.appendChild(prev);
    container.appendChild(year);
    container.appendChild(month);
    container.appendChild(next);
    return container;
}

function createWeekdays() {
    var container = div();
    container.className = 'btn-group btn-group-justified weekdays';
    for (var i = 0; i < 7; i++) {
        var day = localeDayName(i);
        container.appendChild(wrappedButton(localeDayName(i)));
    }
    return container;
}

function renderCalendar() {
    BOX.innerHTML = '';
    var buttons = renderDateButtons(YEAR, MONTH);
    var week = div();
    BOX.appendChild(createControls());
    BOX.appendChild(createWeekdays());
    for (var i = 1; i <= buttons.length; i++) {
        week.appendChild(buttons[i - 1]);
        if (i % 7 === 0 || i === buttons.length) {
            week.className = 'week-' + (i / 7);
            BOX.appendChild(week);
            week = div();
        }
    }
}

function createCalendar(elem) {
    INPUT = elem;
    var pos = elem.getBoundingClientRect();
    BOX = createContainer(pos.left, pos.botttom);
    renderCalendar();
    document.body.appendChild(BOX);
}

function destroyCalendar() {
    document.body.removeChild(BOX);
    BOX = undefined;
}

function DatePicker(elem) {
    if (BOX) destroyCalendar();
    else     createCalendar(elem);
}
window.DatePicker = DatePicker;
}());
