export     function handleDateClick(info, place)
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