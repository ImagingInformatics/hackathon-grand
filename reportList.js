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

function reportClicked(reportRowElement, report) {
    $clicked_tr = $(reportRowElement);
    $clicked_tr.parent().children().each(function() {
        $(this).removeClass('highlight')
    });
    $clicked_tr.addClass('highlight');
    reportViewInit(report.id);
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
            // sort the reports by date
            data.entry.sort(function (a,b) {
                    if (a.content.issued < b.content.issued)
                        return 1;
                    if (a.content.issued > b.content.issued)
                        return -1;
                    return 0;
                }
            );


            data.entry.forEach(function(report, index) {
                var dateTime = getReportDate(report.content);
                var text = getReportDescription(report.content);
                var acc = getAccessionNumber(report.content);
                var reportRow = '<tr><td>' +
                    dateTime + '</td><td>' +
                    acc +'</td><td>' +
                    text + '</td><td>' +
                    '</tr>';
                var reportRowElement = $(reportRow).appendTo('#reportListTable');
                if(index ===0) {
                    reportClicked(reportRowElement, report);
                }
                $(reportRowElement).click(function() {
                    reportClicked(this, report);
                });
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