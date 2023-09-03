export function getEventContent(eventInfo) {
    let event = eventInfo.event;
    let discipline = event.extendedProps.discipline || '';
    let mentor = event.extendedProps.mentor || '';
    let student = event.extendedProps.student || '';
    let startTime = event.extendedProps.beginEvent || '';
    let endTime = event.extendedProps.endEvent || '';

    let content = '<div class="fc-event-main">' + discipline + '  -  ' + ' ' + startTime + ' - ' + endTime + '</div>';
    content += '<div class="fc-event-sub">' + mentor + ' - ' + student + '</div>';

    return { html: content };
}