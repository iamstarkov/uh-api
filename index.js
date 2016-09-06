const { send } = require('micro');
const pify = require('pify');
const fs = require('fs');
const path = require('path');
const pathToRegexp = require('path-to-regexp')

const readFile = pify(fs.readFile);

const api = ({ authorId, area }) =>
  readFile(path.join(__dirname, `./node_modules/jsunderhood/dump/${authorId}-${area}.json`))
    .then(str => JSON.parse(str));

const urlReg = pathToRegexp('/:authorId/:area', ['authorId', 'area']);

const parse = url => {
  const [_, authorId, area ] = urlReg.exec(url);
  return { authorId, area };
}

module.exports = async ({ url }) => api(parse(url));
