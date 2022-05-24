const { loginCtrl, registerCtrl, recoverPassCTRL } = require('./ctrl')

const express = require('express').Router()

express.post('/login', (req, res) => loginCtrl(req, res))
express.post('/register', (req, res) => registerCtrl(req, res))
express.post('/recoverpass', (req, res) => recoverPassCTRL(req, res))

module.exports = express