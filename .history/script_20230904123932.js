import { createCalendar } from './calendar.js';
import { handleDateClick } from './handleDateClick.js';
import { getCalendarElements } from './getCalendarElements.js';
import { createAndRenderCalendars } from './createAndRenderCalendars.js';

document.addEventListener('DOMContentLoaded', function ()
{
    const calendarEls = getCalendarElements(calendarNames);

const selectedDayElement = document.getElementById('selectedDay');

    const calendars = createAndRenderCalendars(calendarEls, salaNames, FullCalendar);

    for (let i = 0; i < salaNames.length; i++) {
      calendars[i] = createCalendar(calendarEls[i], salaNames[i], FullCalendar);
      calendars[i].render();
    }

    for (let i = 0; i < salaNames.length; i++) {
        calendars[i].setOption('dateClick', function(info) {
          handleDateClick(info, salaNames[i]);
        });
      }
});

