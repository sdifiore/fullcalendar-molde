import { getEventContent } from './eventFunctions.js';
export function createCalendar(calendarEl, place, FullCalendar)
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
