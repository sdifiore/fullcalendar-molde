export function getCalendarElements(calendarNames) {
    const calendarEls = [];
    
    for (let i = 0; i < calendarNames.length; i++) {
      calendarEls[i] = document.getElementById(`${calendarNames[i]}-calendar`);
    }
    
    return calendarEls;
  }