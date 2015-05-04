SIIM 2015 Hackathon Grand Challenge
===================================

This repository contains the baseline source code for the SIIM 2015 Hackathon Grand Challenge.  The grand challenge
is to build a web based EMR client for displaying medical image information using RESTful APIs such as FHIR,
DICOMweb and SWIM.  This baseline project provides basic functionality for searching FHIR for patients and displaying
a radiology centric view for the selected patient.  This radiology centric view includes the list of diagnostic reports
and corresponding images for that report.  The system uses FHIR API's to search for patients, find diagnostic reports
and imaging study resources.  Images are displayed using DICOMweb APIs.

[Click here to view this application live in your web browser!](http://imaginginformatics.github.io/hackathon-grand/)

Building
========

Pre-requisites
---------------

The following has been verified to work on Mac OS X Yosemite but should work on any platform supported by Node.js
(including Windows and Linux)

Install NodeJs - [click to visit web site for installation instructions](http://nodejs.org).

install grunt-cli

> npm install -g grunt-cli

install bower

> npm install -g bower

Install NPM dependencies

> npm install

Install bower dependencies

> bower install

Building
--------

The gruntfile will generate the build output in ../build.  You can use any http server to
serve up that folder (I use [live-server](https://github.com/tapio/live-server))

Running the build:
> grunt --force

Automatically running the build and unit tests after each source change:
> grunt watch

Hacking
=======

Hacking on this project only requires knowledge of HTML, CSS, JavaScript, jQuery and bootstrap.  The project uses the
[cornerstone library](https://github.com/chafey/cornerstone) for client side rendering which should make it easier
to hack new imaging specific functionality.

I created a [blog post](http://chafey.blogspot.com/2015/04/siim-2015-hackathon-grand-challenge.html) about how
I built this project that should help explain how things work a bit.

NOTE: Please avoid adding dependencies on other third party libraries such as angular, etc.  We want to keep the
learning curve as low as possible to make it easy for people to get started hacking!

Hacking Ideas
-------------

* Improve the visual design (colors, appearance)
* Add a screen to show the list of ImagingStudies for a patient
* Add a screen to create a new DiagnosticOrder for a patient (e.g. new order or follow-up)
* Add a screen to create a new DiagnosticReport for a Patient/DiagnosticOrder/ImagingStudy
* Add a combo box to allow user to select between different ImagingStudyies for a DiagnosticOrder
* Add additional patient search functionality (birthdate, first name, ?)
* Add more FHIR resources (DiagnosticOrder, Allergies, FamilyHistory, Medications)
* Add ability to filter DiagnosticReports by type (Radiology vs Pathology vs both)
* Create clinically correct DICOM PR, KO and SR instances for the datasets
* Add a date/time formatter and apply it to the report list
* Improve the display of key images
* Parse the report text for image references and make it interactive in some way (image as popover?)
* Add dictionaries for freely available codes like LOINC, etc
* Add ability to show patient's picture/photo
* Add picture/photo for each patient to the FHIR dataset
* Add mini "Study Viewer" that shows all images for an ImagingStudy (e.g. like [cornerstoneDemo](https://github.com/chafey/cornerstoneDemo)
* Add support for displaying DICOM PR, KO and SR

