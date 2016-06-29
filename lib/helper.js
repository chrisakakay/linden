var fs = require('fs');

function fileExists(fName) {
    try {
        return fs.statSync(fName).isFile();
    } catch (err) {
        return false;
    }
}

function folderExists(fName) {
    try {
        return fs.statSync(fName).isDirectory();
    } catch (err) {
        return false;
    }
}

function savePNG(fName, imageData) {
    if (!fName || !imageData) return;

    fs.writeFile(fName, imageData, 'base64');
}

function isObject(obj) {
    return (obj !== undefined && obj !== '' && obj !== null && obj.constructor === Object && Object.keys(obj).length > 0);
}

function isArray(arr) {
    return (arr !== undefined && arr !== '' && arr !== null && arr.constructor === Array && arr.length > 0);
}

module.exports = {
    fileExists:     fileExists,
    folderExists:   folderExists,
    savePNG:        savePNG,
    isObject:       isObject,
    isArray:        isArray
};
