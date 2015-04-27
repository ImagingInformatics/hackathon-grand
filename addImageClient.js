function addImageClient(imagingStudy, series, instance) {
    var studyUid = getUid(imagingStudy.uid);
    var seriesUid = getUid(series.uid);
    var instanceUid = getUid(instance.uid);
    loadTemplate('imageClient.html', function(imageElement)
    {
        $('#imageList').append(imageElement);
        var imageIdRoot = config.wadoUriRoot.replace('http', "dicomweb");
        var imageId = imageIdRoot + '?requestType=WADO&studyUID=' + studyUid + '&seriesUID=' + seriesUid + '&objectUID=' + instanceUid + "&contentType=application%2Fdicom";
        var element = imageElement.get(0);
        cornerstone.enable(element);
        cornerstone.loadImage(imageId).then(function(image) {
            cornerstone.displayImage(element, image);
        });
    })

}
