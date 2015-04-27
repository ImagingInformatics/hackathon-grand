function getReportDate(report) {
    return report.issued || '';
}

function getAccessionNumber(report) {
    if(report.identifier && report.identifier.value) {
        return report.identifier.value;
    }
    return "";
}

function getReportDescription(report) {
    if(report.name && report.name.text) {
        return report.name.text;
    }
    return "";
}

function reportListQuery() {

    $('#reportListTable').empty();

    var reportListQueryUrl = config.fhirRoot + "/DiagnosticReport?subject=Patient/" + patientResourceId;

    $.ajax({
        url: reportListQueryUrl,
        headers: {
            "Accept" : "application/json"
        },
        success: function(data) {
            console.log(data);
            data.entry.forEach(function(report) {
                var dateTime = getReportDate(report.content);
                var text = getReportDescription(report.content);
                var acc = getAccessionNumber(report.content);
                var reportRow = '<tr><td>' +
                    dateTime + '</td><td>' +
                    acc +'</td><td>' +
                    text + '</td><td>' +
                    '</tr>';
                var reportRowElement = $(reportRow).appendTo('#reportListTable');
                $(reportRowElement).click(function() {
                    reportViewInit(report.id);
                });
            });
            reportViewInit(data.entry[0].id);
        },
        error: function() {
        alert('error');
        }
    });
}

function reportListInit() {
    reportListQuery();


}