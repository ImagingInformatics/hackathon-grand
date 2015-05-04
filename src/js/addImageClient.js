function addImageClient(imagingStudy, series, instance) {
    var studyUid = getUid(imagingStudy.uid);
    var seriesUid = getUid(series.uid);
    var instanceUid = getUid(instance.uid);
    loadTemplate('imageClient.html', function(imageElement)
    {
        $('#imageView').append(imageElement);
        var imageIdRoot = config.wadoUriRoot.replace('http', "dicomweb");
        var imageId = imageIdRoot + '?requestType=WADO&studyUID=' + studyUid + '&seriesUID=' + seriesUid + '&objectUID=' + instanceUid + "&contentType=application%2Fdicom";
        var element = imageElement.get(0);
        cornerstone.enable(element);
        cornerstone.loadImage(imageId).then(function(image) {
            function onImageRendered(e, eventData) {
                var seriesDesc = eventData.image.data.string('x0008103e');
                $(element).find('.image-topLeft').text(seriesDesc);
                var seriesNum = eventData.image.data.string('x00200011');
                var instanceNum = eventData.image.data.string('x00200013');
                var bl = "S:" + seriesNum + ", I:" + instanceNum;
                $(element).find('.image-bottomLeft').text(bl);
                //$(element).find('.image-topRight').text(seriesDesc);
                //$(element).find('.image-bottomLeft').text("WW/WL:" + Math.round(eventData.viewport.voi.windowWidth) + "/" + Math.round(eventData.viewport.voi.windowCenter));
                //$(element).find('.image-bottomRight').text("Zoom:" + eventData.viewport.scale.toFixed(2));
            };
            $(element).on("CornerstoneImageRendered", onImageRendered);
            cornerstone.displayImage(element, image);
            cornerstoneTools.mouseInput.enable(element);
            cornerstoneTools.mouseWheelInput.enable(element);
            cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
            cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
            cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button

        });
    })

}
