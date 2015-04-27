function getUid(uid) {
    return uid.substring(8);
}
function displayImagingStudy(imagingStudy) {

    if(imagingStudy.series.length === 0) {
        return;
    }
    var studyUid = getUid(imagingStudy.uid);
    var firstSeries = imagingStudy.series[0];
    var seriesUid = getUid(firstSeries.uid);//"1.3.6.1.4.1.14519.5.2.1.7777.9002.209790382569215452249761599322";
    var firstImage = firstSeries.instance[0];
    var instanceUid = getUid(firstImage.uid);// "1.3.6.1.4.1.14519.5.2.1.7777.9002.218501516022520858633325180946";
    loadTemplate('image.html', function(imageElement)
    {
        $('#imageList').append(imageElement);
        var imageId = 'dicomweb://vna.hackathon.siim.org/dcm4chee-arc/wado/DCM4CHEE?requestType=WADO&studyUID=' + studyUid + '&seriesUID=' + seriesUid + '&objectUID=' + instanceUid + "&contentType=application%2Fdicom";
        var element = imageElement.get(0);//document.getElementById('dicomImage');
        cornerstone.enable(element);
        cornerstone.loadImage(imageId).then(function(image) {
            cornerstone.displayImage(element, image);
        });

    })

}

function loadImagingStudy(acc) {
    // TODO: include patient as search criteria in case of acc collisions
    var imagingStudyQueryUrl = fhirRoot + "/ImagingStudy?accession=" + acc;
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