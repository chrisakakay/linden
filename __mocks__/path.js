/* eslint-env jest */

const path      = jest.genMockFromModule('path');
const mockPaths = {
        '../config/linden.json': 'linden.json'
    };

function dirname(name) {
    return name;
}

function join(...args) {
    return mockPaths[args[1]] || args[1];
}

path.dirname    = dirname;
path.join       = join;

module.exports  = path;
