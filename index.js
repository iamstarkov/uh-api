const { send } = require('micro');
const pify = require('pify');
const fs = require('fs');
const pathToRegexp = require('path-to-regexp')

const readFile = pify(fs.readFile);

const api = ({ authorId, area }) =>
  readFile(`./dump/${authorId}-${area}.json`)
    .then(str => JSON.parse(str));

const urlReg = pathToRegexp('/:authorId/:area', ['authorId', 'area']);

const parse = url => {
  const [, authorId, area ] = urlReg.exec(url);
  return { authorId, area };
}

module.exports = async ({ url }) => api(parse(url));
