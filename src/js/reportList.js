function reportListQuery() {

    $('#reportListTable').empty();

    var reportListQueryUrl = fhirRoot + "/DiagnosticReport?subject=Patient/" + patientResourceId;

    $.ajax({
        url: reportListQueryUrl,
        headers: {
            "Accept" : "application/json"
        },
        success: function(data) {
            console.log(data);
            data.entry.forEach(function(report) {
                var dateTime = report.content.issued;
                var text = report.content.name.text;
                var reportRow = '<tr><td>' +
                    dateTime +'</td><td>' +
                    text + '</td><td>' +
                    '</tr>';
                var patientRowElement = $(reportRow).appendTo('#reportListTable');

            });
        },
        error: function() {
        alert('error');
        }
    });
}

function reportListInit() {
    reportListQuery();


}