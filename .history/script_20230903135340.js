import { getEventContent } from './eventFunctions.js';

document.addEventListener('DOMContentLoaded', function ()
{
    let calendarEl1 = document.getElementById('one-calendar');
    let calendarEl2 = document.getElementById('two-calendar');
    let calendarEl3 = document.getElementById('tree-calendar');
    let calendarEl4 = document.getElementById('four-calendar');
    let calendarEl5 = document.getElementById('five-calendar');
    let calendarEl6 = document.getElementById('six-calendar');
    
    const eventInfo = {
        event: {
          extendedProps: {
            discipline: 'Matemática',
            mentor: 'João',
            student: 'Maria',
            beginEvent: '10:00',
            endEvent: '11:00'
          }
        }
      };

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

    let calendar1 = createCalendar(calendarEl1, 'Sala 1', FullCalendar);
    let calendar2 = createCalendar(calendarEl2, 'Sala 2', FullCalendar);
    let calendar3 = createCalendar(calendarEl3, 'Sala 3', FullCalendar);
    let calendar4 = createCalendar(calendarEl4, 'Sala 4', FullCalendar);
    let calendar5 = createCalendar(calendarEl5, 'Sala 5', FullCalendar);
    let calendar6 = createCalendar(calendarEl6, 'Sala 6', FullCalendar);


    calendar1.render();
    calendar2.render();
    calendar3.render();
    calendar3.render();
    calendar4.render();
    calendar5.render();
    calendar6.render();



    // Evento de clique em uma data do calend�rio
    calendar1.setOption('dateClick', function (info)
    {
        handleDateClick(info, 'Sala 1');
    });

    calendar2.setOption('dateClick', function (info)
    {
        handleDateClick(info, 'Sala 2');
    });

    calendar3.setOption('dateClick', function (info)
    {
        handleDateClick(info, 'Sala 3');
    });

    calendar4.setOption('dateClick', function (info)
    {
        handleDateClick(info, 'Sala 4');
    });

    calendar5.setOption('dateClick', function (info)
    {
        handleDateClick(info, 'Sala 5');
    });

    calendar6.setOption('dateClick', function (info)
    {
        handleDateClick(info, 'Sala 6');
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

