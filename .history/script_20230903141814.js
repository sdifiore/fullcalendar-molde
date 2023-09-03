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

    // Fun��o para lidar com o clique em uma data
    function handleDateClick(info, place)
    {
        let selectedDate = moment(info.date).format('YYYY-MM-DD'); // Formate a data selecionada usando moment.js
        let isWeeklyOrMonthly = info.view.type !== 'dayGridDay';

        // Cria o objeto JSON com as informa��es necess�rias
        let jsonData = {
            place: place,
            selectedDate: selectedDate,
            isWeeklyOrMonthly: isWeeklyOrMonthly
        };

        // Converte o objeto JSON em uma string para passar como par�metro na URL
        let jsonDataString = encodeURIComponent(JSON.stringify(jsonData));

        // Redireciona para a outra p�gina com as informa��es no par�metro "data"
        window.location.href = '/indexTest.html?data=' + jsonDataString;
    }
});

