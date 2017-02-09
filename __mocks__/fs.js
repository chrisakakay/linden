'use strict';

const fs        = jest.genMockFromModule('fs');
const statData  = {
        'existing-file':    true,
        'existing-folder':  true
    };
const fileData  = {
        'linden.json': {
            dir: './linden',
            cases: []
        }
    };

function isTrue() {
    return true;
}

function isFalse() {
    return false;
}

function statSync(name) {
    return {
        isFile:         statData[name] ? isTrue : isFalse,
        isDirectory:    statData[name] ? isTrue : isFalse
    };
}

function readFileSync(name) {
    return fileData[name];
}

fs.statSync         = statSync;
fs.readFileSync     = readFileSync;

module.exports  = fs;
