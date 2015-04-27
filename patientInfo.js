function patientInfoInit() {
    var name = nameToString(patient.name[0]);
    var mrn = getMRN(patient);
    var line1 = name + ", " + mrn;
    $('#patientInfoLine1').text(line1);
    var dob = getDOB(patient);
    var gender = getGender(patient);
    var line2 = gender + "," + dob;
    $('#patientInfoLine2').text(line2);
}