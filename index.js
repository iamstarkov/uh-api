const { send } = require('micro');
const pify = require('pify');
const fs = require('fs');
const pathToRegexp = require('path-to-regexp')
// querystring.parse(str[, sep[, eq[, options]]])

const readFile = pify(fs.readFile);

const api = ({ authorId, area }) =>
  readFile(`./dump/${authorId}-${area}.json`)
    .then(str => JSON.parse(str));

// :id/:area/
const urlReg = pathToRegexp('/:authorId/:area', ['authorId', 'area']);

const parse = url => {
  const [_, authorId, area ] = urlReg.exec(url);
  return { authorId, area };
}

module.exports = async ({ url }) => api(parse(url));
