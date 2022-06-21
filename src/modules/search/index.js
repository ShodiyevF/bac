const { searchCtrl } = require('./ctrl')

const express = require('express').Router()

express.post('/search', searchCtrl)

module.exports = express