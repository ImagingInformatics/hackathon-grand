
function loadImagingStudy(acc) {
    // TODO: include patient as search criteria in case of acc collisions
    var imagingStudyQueryUrl = config.fhirRoot + "/ImagingStudy?accession=" + acc;
    $.ajax({
        url: imagingStudyQueryUrl,
        headers: {
            "Accept" : "application/json"
        },
        success: function(data) {
            console.log(data);
            if(data.entry.length ===0) {
                return;
            }
            var imagingStudy = pickImagingStudy(data.entry);
            displayImagingStudy(imagingStudy);
        },
        error: function() {
            alert('error');
        }
    });
}

function reportViewInit(reportUrl) {
    $('#reportViewInner').empty();
    $('#imageList').empty();
    $.ajax({
        url: reportUrl,
        headers: {
            "Accept" : "application/json"
        },
        success: function(data) {
            console.log(data);
            var reportText = $.parseHTML(data.text.div);
            $("#reportViewInner").append(reportText);
            var acc = data.identifier ? data.identifier.value : undefined;
            if(acc) {
                loadImagingStudy(acc);
            }
        },
        error: function() {
            alert('error');
        }
    });

}