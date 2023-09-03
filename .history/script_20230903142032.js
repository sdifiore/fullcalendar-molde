import { createCalendar } from './calendar.js';

document.addEventListener('DOMContentLoaded', function ()
{
    const calendarNames = ['one', 'two', 'tree', 'four', 'five', 'six'];

    for (let i = 0; i < calendarNames.length; i++) {
    calendarEls[i] = document.getElementById(`${calendarNames[i]}-calendar`);
    }
    
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

