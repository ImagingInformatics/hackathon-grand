function getUid(uid) {
    return uid.substring(8);
}

function addImage(imagingStudy, series, instance) {
    if(config.imageRenderMode === 'client') {
        addImageClient(imagingStudy, series, instance);
    } else if(config.imageRenderMode === 'server') {
        addImageServer(imagingStudy, series, instance);
    }
}

function displayImagingStudy(imagingStudy) {

    if(imagingStudy.series.length === 0) {
        return;
    }
    // TODO: add logic to display imaging studies - for now just display the first image in the first series
    var firstSeries = imagingStudy.series[0];
    var firstImage = firstSeries.instance[0];
    addImage(imagingStudy, firstSeries, firstImage);
}

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
            // TODO: Need logic to figure out which ImagingStudy to use as there may be more than one (key images, full study, etc)
            // For now we just pick the first one
            var imagingStudy = data.entry[0];
            displayImagingStudy(imagingStudy.content);
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