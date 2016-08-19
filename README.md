# Linden
[![Build Status](https://travis-ci.org/chrisakakay/linden.svg?branch=master)](https://travis-ci.org/chrisakakay/linden)
[![Coverage Status](https://coveralls.io/repos/github/chrisakakay/linden/badge.svg?branch=master)](https://coveralls.io/github/chrisakakay/linden?branch=master)
[![codecov](https://codecov.io/gh/chrisakakay/linden/branch/master/graph/badge.svg)](https://codecov.io/gh/chrisakakay/linden)
[![NPM version](https://img.shields.io/npm/v/linden.svg)](https://www.npmjs.com/package/linden)
[![Gitter chat](https://badges.gitter.im/chrisakakay/linden.svg)](https://gitter.im/chrisakakay/linden)

Visual regression made easy.

## What is linden?

Linden is a visual regression tool made for you, so you can catch visual bugs early.

It is easy to use, easy to configure and it will be easy to integrate to any build system.

## How to use

- Install it globally ```npm install -g linden```
- Create a configuration in the desired folder ```linden init``` or manually ```linden.json``` (you can name it to anything)
- Add your stuff to the configuration file (ex.) ([configuration guide](/CONFIGURING.md)): 
```
{
    "dir": "./linden",
    "cases": [
        {
            "name": "chrisakakay-m",
            "url": "http://chrisakakay.github.io",
            "viewport": { "width": 900, "height": 768 }
        }
    ]
}
```
- Run linden with ```linden run``` or just simple ```linden``` or ```linden --config="my_config.json"```
- Report will be generated with screenshots **[COMING SOON]**

## How to contribute

If you want to contribute or just use the lates unreleased version, check out the [contributing guide](/CONTRIBUTING.md)!

Feel free to contact us if you need some help!
