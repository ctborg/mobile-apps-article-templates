# Article Templates for Mobile Apps
Article templates used within the Guardian’s next-generation iOS and Android applications. This repo also contains documentation that describes the components and layouts used across these templates.

## Requirements
* A Mac or Linux PC
* Ruby >= v1.9.x. You may already have this, but run `ruby -v` to check which version you have installed.
* [Bundler](http://bundler.io). Install using `gem install bundler`.
* [NodeJS](http://nodejs.org/). Install following the instructions from the website or with [NVM](https://github.com/creationix/nvm).
* [Grunt](http://gruntjs.com/). Install using `npm install -g grunt grunt-cli`.

## Usage
* checkout the project in a separate directory, outside the iOs and the Android app.
* run `npm install` 
* run `bundle install`
* copy config.sample.js to config.js and fill in the details
* run `grunt` 

Grunt will provide the following services:
* sass linting and compilation
* javascript linting and minification
* rsync with both the iOs and the Android local codebase.

## Experimental performance measurement
This feature allows us to record several timelines from a page loaded into the device and then it extracts some 
particular features (such as frame rate, page load time and more) and it creates a chart for it. 
To use this feature there are a few steps involved:
* make sure your device can reach your laptop over LAN and fill the `performance.server` field in `config.js` with your laptop LAN address (eg: `http://192.168.1.1`)
* connect your device over USB and open chrome
* collect the page you want to test under test/fixture folder and be sure to add the session name to each page. Session names should be used during measurements to describe the device used and any other extra features, e.g.
```bash
<!--
article1_s3_nocss
-->
```
* run `grunt`
* in a separate shell run `grunt shell:timeline --fixture=article1.html --times=10` where article1.html is the name of the fixture you want to load and 10 is the number of timelines you want to record
* head to http://localhost:3000/performances/#yoursession to see the results
* individual timelines are also recorded under `/Performance/timelines` and CSVs of each session under `/Performance/session`

## Visual Regressions
Use this feature to check for CSS regressions:
* install imagemagick and phantomjs (eg: `brew install phantomjs imagemagick`)
* run `grunt`
* in a separate shell run `grunt shell:wraithhistory` from the project root to collect baseline screenshots
* when you're ready run `grunt shell:wraith` from the project root to take a new set of screenshots and compare the with the baseline
* browse http://localhost:3000/root/test/visual/shots/gallery.html to see the differences between the to sets of shots

## Updating the Documentation
Documentation is built locally, to rebuild the documentation just type: `grunt hologram`

Documentation is also available on the web at: http://guardian.github.io/mobile-apps-article-templates/, which displays the static files stored in the gh-pages branch. To update this publicly viewable site with your latest changes, run the following commands:

```bash
$ git commit -am "Commit message"
$ git checkout gh-pages
$ git merge master
$ git push origin master gh-pages
```

Alternatively, you can set up your local git repository to automatically push changes to both master and gh-pages branches. Simply add the following 2 lines to the ``[remote "origin"]`` section of ``.git/config``:

```
push = +refs/heads/master:refs/heads/gh-pages
push = +refs/heads/master:refs/heads/master
```

## Error monitoring system
This project uses Sentry to monitor errors and failures. Sentry can be configured by adding the appropriate dsn in the config.js file (have a look at config.sample.js for reference). Sentry is disabled by default, in order not to be used during debugging sessions. To enable it use the --sentry flag while building. (eg: `grunt build --sentry`).

## APKs and IPAs
When everything is properly configured type `grunt installer` to create in the root folder of the project the debuggable APK and IPA.
