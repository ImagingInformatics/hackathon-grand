var patientSearchUrl = config.fhirRoot + "/Patient?family=SIIM";

function nameToString(name) {
    var family = name.family ? name.family[0] : '';
    var given = name.given ? name.given[0] : '';

    return family + ", " + given;
}


function onSuccess(data) {

    // TODO validate data is good
    console.log(data);

    data.entry.forEach(function(patient) {
        var patientName = nameToString(patient.content.name[0]);
        var pid = '';
        var gender = '';
        var dob = '';
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

function query() {
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

$(document).ready(function() {

    query();
});