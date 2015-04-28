function addImage(imagingStudy, series, instance) {
    var client = config.imageRenderMode === 'client';
    // user server side rendering for large images
    if(series.modality === 'MG' || series.modality === 'CR')
    {
        client = false;
    }

    if(client) {
        addImageClient(imagingStudy, series, instance);
    } else {
        addImageServer(imagingStudy, series, instance);
    }
}

function displayImagingStudy(imagingStudy) {
    // TODO: get the full metadata via WADO-RS Retreive Metadata so we can figure out how to display this
    // study properly

    // create a thumbnail for each display set
    imagingStudy.series.forEach(function(series) {
        // Skip over PR, KO and SR (for now)
        if(series.modality === 'PR' || series.modality == 'KO' || series.modalty == 'SR') {
            return;
        }
        // TODO: Sort images by instance number so its not random
        var firstImage = series.instance[0];
        addImage(imagingStudy, series, firstImage);
    });

}