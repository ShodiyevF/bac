const { companysGETCTRL } = require('./ctrl')

const express = require('express').Router()

express.post('/companys', (req, res) => companysGETCTRL(req, res))

module.exports = express