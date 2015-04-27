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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(document).ready(function() {

    patientResourceId = getParameterByName("id");
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