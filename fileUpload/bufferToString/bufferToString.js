const Datauri = require('datauri');
const datauri = new Datauri()

module.exports = (originalname, buffer) => {
    const extname = require('path').extname(originalname)
    return datauri.format(extname, buffer).content
}