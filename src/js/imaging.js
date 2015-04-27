var fhirRoot = "http://fhir.hackathon.siim.org/fhir";
var patient = undefined;
var patientResourceId;

function loadPatient(patientResourceId, callback) {
    var patientUrl = "http://fhir.hackathon.siim.org/fhir/Patient/" + patientResourceId;

    $.ajax({
        url: patientUrl,
        headers: {
            "Accept" : "application/json"
        },
        success: function(data) {
            patient = data;
            callback();
        },
        error: function() {
            alert('error');
        }
    });

}

$(document).ready(function() {

    patientResourceId = "siimjoe";
    loadPatient(patientResourceId, function() {
        loadTemplate("reportList.html", function(element) {
            $('#reportList').append(element);
            reportListInit();
        });
        loadTemplate("reportView.html", function(element) {
            $('#reportView').append(element);
            reportViewInit();
        });
    });

});