export const calendarEls = [];
const calendarNames = ['one', 'two', 'tree', 'four', 'five', 'six'];

for (let i = 0; i < calendarNames.length; i++) {
  calendarEls[i] = document.getElementById(`${calendarNames[i]}-calendar`);
}
