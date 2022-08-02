const { clientGETCtrl, clientPOSTCtrl, clientStatusPUTCtrl, clientDELETECtrl, clientPUTFullnameCtrl, clientPUTNumber1Ctrl } = require('./ctrl')

const express = require('express').Router()

express.post('/users', (req, res) => clientGETCtrl(req, res))
express.post('/userspost', (req, res) => clientPOSTCtrl(req, res))
express.put('/userstatus', (req, res) => clientStatusPUTCtrl(req, res))
express.delete('/userdelete', (req, res) => clientDELETECtrl(req, res))
express.put('/user/put/fullname', (req, res) => clientPUTFullnameCtrl(req, res))
express.put('/user/put/number1', (req, res) => clientPUTNumber1Ctrl(req, res))

module.exports = express