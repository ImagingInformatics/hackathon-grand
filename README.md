SIIM 2015 Hackathon Grand Challenge
===================================

This repository contains the baseline source code for the SIIM 2015 Hackathon Grand Challenge.  The grand challenge
is to build a web based EMR client for displaying medical image information using RESTful APIs such as FHIR,
DICOMweb and SWIM.  This baseline project provides basic functionality for searching FHIR for patients and displaying
a radiology centric view for the selecte patient.  This radiology centric view includes the list of diagnostic reports
and corresponding images for that report.  The system uses FHIR API's to search for patients, find diagnostic reports
and imaging study resources.  Images are displayed using DICOMweb APIs.

[Click here to view this application live in your web browser!](http://imaginginformatics.github.io/hackathon-grand/)

Build and hacking
=================

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
-------

Hacking on this project only requires knowledge of HTML, CSS, JavaScript and jQuery.  The project uses the
[cornerstone library](https://github.com/chafey/cornerstone) for client side rendering which should make it easier
to hack new imaging specific functionality.  You can switch to server side rendering via WADO-URI by changing the
setting in the config.js file.

Want to make this project better?  Here are some things we could use help on:

* Visual Appearance - no effort has been put into the visual design - feel free to make it look better!  Just make sure
  you don't work against the design of bootstrap
* TODO's - There are various TODO's sprinkled throughout the code - find one and fix it!
* Adding more info from FHIR (e.g. Allergies, FamilyHistory, Medications, etc)

NOTE: Please avoid adding dependencies on other third party libraries such as angular, etc.  We want to keep the
learning curve as low as possible to make it easy to understand and start hacking!
