SIIM 2015 Hackathon Grand Challenge
===================================

Goal: Provide a baseline system that can be extended to support the development of creative new ideas

[Click here to view this application live in your web browser!](http://imaginginformatics.github.io/hackathon-grand/)

Requirements
------------

* Basic patient list with searching
* Use DICOMWeb API
* Use FHIR API
* Display report and the images at the same time

Getting Started
---------------

Install NodeJs - [click to visit web site for installation instructions](http://nodejs.org).

install grunt-cli

> npm install -g grunt-cli

install bower

> npm install -g bower

Install NPM dependencies

> npm install

Install bower dependencies

> bower install

Building and Hacking
--------------------

The gruntfile will generate the build output in ../build.  You can use any http server to
serve up that folder (I use [live-server](https://github.com/tapio/live-server))

Running the build:
> grunt --force

Automatically running the build and unit tests after each source change:
> grunt watch

