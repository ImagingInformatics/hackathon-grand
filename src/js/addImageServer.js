function addImageServer(imagingStudy, series, instance) {
    var studyUid = getUid(imagingStudy.uid);
    var seriesUid = getUid(series.uid);
    var instanceUid = getUid(instance.uid);
    loadTemplate('imageServer.html', function(imageElement)
    {
        $('#imageView').append(imageElement);
        var imageIdRoot = config.wadoUriRoot;
        var imageId = imageIdRoot + '?requestType=WADO&studyUID=' + studyUid + '&seriesUID=' + seriesUid + '&objectUID=' + instanceUid + "&columns=256&rows=256";
        var img = $(imageElement).find('img')[0];
        $(img).attr("src", imageId);
    })
}
