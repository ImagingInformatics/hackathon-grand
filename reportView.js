function reportViewInit(reportUrl) {
    $('#reportViewInner').empty();

    $.ajax({
        url: reportUrl,
        headers: {
            "Accept" : "application/json"
        },
        success: function(data) {
            console.log(data);
            var reportText = $.parseHTML(data.text.div);
            $("#reportViewInner").append(reportText);
        },
        error: function() {
            alert('error');
        }
    });

}