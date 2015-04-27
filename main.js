var patientSearchUrl = config.fhirRoot + "/Patient";

function onSuccess(data) {

    // TODO validate data is good
    console.log(data);

    data.entry.forEach(function(patient) {
        var patientName = nameToString(patient.content.name[0]);
        var pid = getMRN(patient.content);
        var gender = getGender(patient.content);
        var dob = getDOB(patient.content);
        var patientRow = '<tr><td>' +
            patientName +'</td><td>' +
            pid + '</td><td>' +
            gender + '</td><td>' +
            dob + '</td><td>' +
            '</tr>';
        var patientRowElement = $(patientRow).appendTo('#patientList');
        $(patientRowElement).click(function() {
            var n = patient.id.lastIndexOf('/');
            var id = patient.id.substring(n + 1);
            window.location = "imaging.html?id=" + id;
        })
    });


    $('#links').empty();

    data.link.forEach(function(link) {
        if(link.rel === 'self' || link.rel === 'fhir-base') {
            return;
        }
        var linkElement = "<button class='btn' data-uri='" + link.href + "'>" + link.rel + "</button>";
        var ele = $(linkElement).appendTo('#links');
        ele.click(function() {
            patientSearchUrl = $(ele).attr('data-uri');
            query();
        })
    })
}

function onError() {
    alert('error');
}

function addQueryParam(param) {
    if(patientSearchUrl.indexOf('?') >= 0) {
        patientSearchUrl += "&" + param;
    } else {
        patientSearchUrl += "?" + param;
    }
}

function query() {

    var nameFilter = $('#inputName').val();
    var mrnFilter = $('#inputPatientId').val();

    if(nameFilter.length > 0) {
        addQueryParam('family=' + nameFilter);
    }
    if(mrnFilter.length > 0) {
        addQueryParam('identifier=' + mrnFilter);
    }

    $('#patientList').empty();

    $.ajax({
        url: patientSearchUrl,
        headers: {
            "Accept" : "application/json"
        },
        success: onSuccess,
        error: onError
    });
}

var isIE9OrBelow = function()
{
    return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}

function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}


$(document).ready(function() {

    if(isIE9OrBelow() || isCanvasSupported() === false) {
        $('#main').text("This application does not support your web browser, please try using Chrome, Safari, FireFox or IE10+");
        return;
    }

    $('form').submit(function(e) {
        patientSearchUrl = config.fhirRoot + "/Patient";
       query();
        e.preventDefault();
    });

    query();
});