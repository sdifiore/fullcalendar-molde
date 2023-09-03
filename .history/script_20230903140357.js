import { getEventContent } from './eventFunctions.js';

document.addEventListener('DOMContentLoaded', function ()
{
    const calendarNames = ['one', 'two', 'tree', 'four', 'five', 'six'];

    for (let i = 0; i < calendarNames.length; i++) {
    calendarEls[i] = document.getElementById(`${calendarNames[i]}-calendar`);
    }

    function createCalendar(calendarEl, place, FullCalendar)
    {
        let dataAtual = new Date();
        let ano = dataAtual.getFullYear();
        let mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
        let dia = ("0" + dataAtual.getDate()).slice(-2);
        let dataFormatada = ano + "-" + mes + "-" + dia;

        let calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,dayGridDay,listMonth'
            },
            initialView: 'dayGridDay',
            locale: 'pt-br',
            initialDate: dataFormatada,
            editable: false,
            eventContent: getEventContent,
            eventSources: [
                {
                    url: 'http://difiores-001-site3.etempurl.com/api/Agenda',

                    success: function (data)
                    {
                        let events = data.filter(function (event)
                        {
                            return event.place === place;
                        });
                        events.forEach(event =>
                        {
                            event.beginEvent = event.start;
                            event.endEvent = event.end;
                            delete event.start;
                            delete event.end;
                        });
                        // buscamos o valor que vem do JSON em event 
                        // guardamos os ids em uma v�riavel e usamos o m�todo has para verificar exist�ncia do id no json
                        // caso n�o exista ele ser� adicionado 
                        // e em seguida chamamos a o m�todo addEventSource para montar o calend�rio na tela. 
                        events.forEach(function (event)
                        {
                            let eventId = event.id;
                            if (!uniqueEvents.has(eventId))
                            {
                                uniqueEvents.add(eventId);
                                calendar.addEventSource(event);
                            }
                        });
                    }
                }
            ],
            eventLeave: function (info)
            {
                console.log('event left!', info.event);
            },
            dateClick: function (info)
            {
                setSelectedDay(info.date);
            }
        });

        return calendar;
    }

    const salaNames = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6'];

    for (let i = 0; i < salaNames.length; i++) {
      calendars[i] = createCalendar(calendarEls[i], salaNames[i], FullCalendar);
      calendars[i].render();
    }

    // Evento de clique em uma data do calend�rio
    calendar1.setOption('dateClick', function (info)
    {for (let i = 0; i < salaNames.length; i++) {
        calendars[i].setOption('dateClick', function(info) {
          handleDateClick(info, salaNames[i]);
        });
      }
    });     

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

