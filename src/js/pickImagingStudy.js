function countReferencedImages(imagingStudy) {
    var numInstances = 0;
    imagingStudy.series.forEach(function(series) {
        numInstances += series.instance.length;
    });
    return numInstances;
}

// Current logic is to pick the imaging study with the fewest images in it as those images are probably
// key
function pickImagingStudy(imagingStudies) {
    var bestImagingStudy;
    var bestNumInstances = 999999999;
    imagingStudies.forEach(function(imagingStudy) {
        var numInstances = countReferencedImages(imagingStudy.content);
        if(numInstances < bestNumInstances) {
            bestNumInstances = numInstances;
            bestImagingStudy = imagingStudy.content;
        }
    });

    return bestImagingStudy;
}