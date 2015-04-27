function nameToString(name) {
    var family = name.family ? name.family[0] : '';
    var given = name.given ? name.given[0] : '';
    return family + ", " + given;
}

function getMRN(patient) {
    if(patient.identifier && patient.identifier.length > 0 && patient.identifier[0].value)
    {
        return patient.identifier[0].value;
    }
    return "";
}

function getGender(patient) {
    if(patient.gender && patient.gender.coding && patient.gender.coding.length > 0 && patient.gender.coding[0].code)
    {
        return patient.gender.coding[0].code;
    }
    return "";
}

function getDOB(patient) {
    if (patient.birthDate) {
        return patient.birthDate;
    }
    return "";
}