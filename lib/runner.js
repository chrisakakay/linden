var g           = global.LINDEN;
var c           = require('chalk');
var fs          = require('fs');
var path        = require('path');
var helper      = require('./helper');
var webdriver   = require('selenium-webdriver');
var phantom     = webdriver.Capabilities.phantomjs().set('phantomjs.binary.path', g.phantomPath);

var cases       = [];

function validate(testCase) {
    if (!testCase || !testCase.name || !testCase.url || !helper.isObject(testCase.viewport)) {
        return false;
    }

    return true;
}

function createDriver() {
    var driver = new webdriver.Builder().withCapabilities(phantom).build();

    driver.manage().deleteAllCookies();

    g.log(c.white('Starting driver'));

    driver.get('about:blank').then(function () {
        runNext(driver);
    });
}

function saveScreenshot(testCase, image) {
    var fileName = `${testCase.name}_${Date.now().toString()}.png`;

    //g.log(c.white('Saving File:'), testCase.name, c.yellow(fileName));

    fs.writeFile(path.join(g.cwd, g.config.dir, fileName), image, 'base64', function(error) {
        if (error) { console.log(error); }

        //g.log(c.white('File saved:'), testCase.name, c.yellow(fileName));
    });
}

function runNext(driver) {
    if (cases.length === 0) {
        driver.quit();
        return;
    }

    var testCase = cases.shift();

    g.log(c.white('Running:'), testCase.name, c.yellow(`(${testCase.url})`));

    driver.manage().window().setSize(testCase.viewport.width, testCase.viewport.height);
    driver.get(testCase.url).then(function () {
        driver.takeScreenshot().then(function(image, err) {
            saveScreenshot(testCase, image);
            runNext(driver);
        });
    });
}

function start() {
    if (cases.length > 0) {
        g.log(c.white('Tests to run:', cases.length));
        createDriver();
    } else {
        g.log(c.white('Nothing to run'));
    }
}

function addCase(testCase) {
    if (validate(testCase)) {
        //g.log(c.white('Test added:', testCase.name));
        cases.push(testCase);
    } else {
        g.log(c.red('Invalid case'));
    }
}

module.exports = {
    addCase: addCase,
    start: start
}
