'use strict';

const fs = require('fs');

const diff = require('./diff');

const fromArray = fs.readFileSync('./b.json', 'utf8').split('\n');
const toArray = fs.readFileSync('./a.json', 'utf8').split('\n');

const result = diff(fromArray, toArray);
console.log(result.fromWithDiff.join('\n'));
console.log(result.toWithDiff.join('\n'));
