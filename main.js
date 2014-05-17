function addBox(x, y) {
    var box = document.createElement('div');
    var s = box.style;
    function px(n) { return n + 'px'; }
    s.position = 'absolute';
    s.left = px(x);
    s.top = px(y);
    s.backgroundColor = '#e8e8e8';
    return box;
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

function dateButton(date, disabled) {
    var button = document.createElement('button');
    button.value = date;
    button.className = 'btn btn-default calendar-date';
    button.textContent = date;
    if (disabled) {
        button.disabled = 'disabled';
    }
    return button;
}

function renderDateButtons(year, month, disabled) {
    var days = daysInMonth(year, month);
    //var week = document.createElement('div');
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

function showCalendar(elem) {
    var pos = elem.getBoundingClientRect();
    var box = addBox(pos.left, pos.botttom);
    var b = renderDateButtons(new Date().getFullYear(), new Date().getMonth() - 2);
    var week = document.createElement('div');
    for (var i = 1; i <= b.length; i++) {
        week.appendChild(b[i - 1]);
        if (i % 7 === 0 || i === b.length) {
            box.appendChild(week);
            week = document.createElement('div');
        }
    }
    document.body.appendChild(box);
}
