# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 25.10.2017
### [Added]

* Dependency CI status to readme

## [1.0.1] - 17.10.2017
### [Fixed]

* error-handling in case of an existing image, but with an invalid parameter, now the middleware flow will be continued and an error will be issued

## [1.0.0] - 02.10.2017

### [Added]

* middleware function to read from directories
* added pipe through ffmpeg
* added image return in correct mime
