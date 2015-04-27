var patient = undefined;
var patientResourceId;

function loadPatient(patientResourceId, callback) {
    var patientUrl = config.fhirRoot + "/Patient/" + patientResourceId;

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
        loadTemplate("patientInfo.html", function(element) {
            $('#patientInfo').append(element);
            patientInfoInit();
        });
        loadTemplate("reportView.html", function(repelement) {
            $('#reportView').append(repelement);
            loadTemplate("reportList.html", function(replistelement) {
                $('#reportList').append(replistelement);
                reportListInit();
            });
        });
    });

});