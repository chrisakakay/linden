var g           = global.LINDEN;
var fs          = require('fs');
var path        = require('path');
var helper      = require('./helper');
var webdriver   = require('selenium-webdriver');
var phantom     = webdriver.Capabilities.phantomjs().set('phantomjs.binary.path', g.phantomPath);
var driver      = null;
var cases       = [];

function saveScreenshot(testCase, image) {
    var fileName = `${testCase.name}_${Date.now().toString()}.png`;

    fs.writeFile(path.join(g.cwd, g.config.dir, fileName), image, 'base64', function(error) {
        if (error) { g.log(error); }
    });
}

function runNext() {
    if (cases.length === 0) {
        driver.quit();
        driver = null;
        g.log('Done');
        return;
    }

    var testCase = cases.shift();

    g.log('Running:', testCase.name, `(${testCase.url})`);

    driver.manage().deleteAllCookies();
    driver.manage().window().setSize(testCase.viewport.width, testCase.viewport.height);
    driver.get(testCase.url).then(function () {
        driver.takeScreenshot().then(function(image, err) {
            saveScreenshot(testCase, image);
            runNext(driver);
        });
    });
}

function validate(testCase) {
    if (!testCase || !testCase.name || !testCase.url || !helper.isObject(testCase.viewport)) {
        return false;
    }

    return true;
}

function addCase(testCase) {
    if (validate(testCase)) {
        //g.log(c.white('Test added:', testCase.name));
        cases.push(testCase);
    } else {
        g.log('Invalid case');
    }
}

function start() {
    if (cases.length > 0 && driver === null) {
        init();
        driver.get('about:blank').then(function () {
            g.log('Cases to run:', `${cases.length}`);
            runNext();
        });
    } else if (driver !== null) {
        g.log('Driver already initialized');
    } else {
        g.log('Nothing to run');
    }
}

function init() {
    g.log('Initializing driver');
    driver = new webdriver.Builder().withCapabilities(phantom).build();

    return driver;
}

module.exports = {
    init:       init,
    start:      start,
    addCase:    addCase,
    validate:   validate
}
