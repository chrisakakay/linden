'use strict';

/* eslint-env jest */

const fs        = jest.genMockFromModule('fs');
const statData  = {
        'existing-file':    true,
        'existing-config':  true,
        'existing-folder':  true
    };
const fileData  = {
        'linden.json': {
            dir: './linden',
            cases: []
        },
        'existing-config': '{}'
    };

function isTrue() {
    return true;
}

function isFalse() {
    return false;
}

function statSync(name) {
    if (statData[name]) {
        return {
            isFile:         statData[name] ? isTrue : isFalse,
            isDirectory:    statData[name] ? isTrue : isFalse
        };
    } else {
        throw new Error('');
    }
}

function readFileSync(name) {
    return fileData[name];
}

function writeFileSync(name) {
    if (name === 'file-with-error') throw new Error('File error');
}

fs.statSync         = statSync;
fs.readFileSync     = readFileSync;
fs.writeFileSync    = writeFileSync;

module.exports  = fs;
