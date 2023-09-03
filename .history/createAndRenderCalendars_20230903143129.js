export function createAndRenderCalendars(calendarEls, salaNames, FullCalendar) {
  const calendars = [];
  
  for (let i = 0; i < salaNames.length; i++) {
    calendars[i] = createCalendar(calendarEls[i], salaNames[i], FullCalendar);
    calendars[i].render();
  }
  
  return calendars;
}

// Uso da função
const salaNames = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6'];
const calendars = createAndRenderCalendars(calendarEls, salaNames, FullCalendar);
