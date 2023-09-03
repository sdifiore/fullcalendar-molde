import { createCalendar } from './calendar.js';
import { handleDateClick } from './handleDateClick.js';
import { getEventContent } from './eventFunctions.js';
import { getCalendarElements } from './calendarNames.js';


document.addEventListener('DOMContentLoaded', function ()
{
    const calendarNames = ['one', 'two', 'tree', 'four', 'five', 'six'];
    const calendarEls = getCalendarElements(calendarNames);
    
    const salaNames = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6'];

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

