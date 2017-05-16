'use strict';

var factory = require('../factories/avatar');
var numFemale = 40
var numMale = 35
var numOther = 2
module.exports = factory.insert(numMale,numFemale,numOther, true);