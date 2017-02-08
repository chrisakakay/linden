'use strict';

const helper    = require('./helper');
const fs        = require('fs');
const path      = require('path');
const webdriver = require('selenium-webdriver');
const phantom   = webdriver.Capabilities.phantomjs().set('phantomjs.binary.path', require('phantomjs-prebuilt').path);
let cases       = [];
let driver      = null;
let savePath;

function runNext() {
    if (cases.length === 0) {
        driver.quit();
        return;
    }

    const testCase = cases.shift();

    console.log('Running:', testCase.name, `(${testCase.url})`);

    driver.manage().deleteAllCookies();
    driver.manage().window().setSize(testCase.viewport.width, testCase.viewport.height);
    driver.get(testCase.url)
        .then(() => {
            return driver.takeScreenshot();
        })
        .then((image, err) => {
            fs.writeFile(path.join(savePath, `${testCase.name}.png`), image, 'base64');
            runNext();
        });
}

module.exports.init = (config) => {
    cases = config.cases;

    if (cases.length < 1) return;

    savePath = path.join(helper.getCWD(), config.dir, config.timestamp);
    driver = new webdriver.Builder().withCapabilities(phantom).build();
    driver.get('about:blank').then(function () {
        console.log('Cases to run:', `${cases.length}`);
        runNext();
    });
};
