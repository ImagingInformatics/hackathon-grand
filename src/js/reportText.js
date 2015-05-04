function displayReportText(report) {
    $('#reportViewInner').empty();
    var reportText = $.parseHTML(report.text.div);
    $("#reportViewInner").append(reportText);
}