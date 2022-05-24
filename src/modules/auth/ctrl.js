const jwt = require('jsonwebtoken')
const { jwtkey } = require('../../config')
const { recoverpass } = require('../../lib/recoverpassword')
const { login, register, recoverPassword } = require("./model")

const loginCtrl = async (req, res) => {
    try {
        if(req.body && req.body.login && req.body.password && typeof req.body.password === "number" && req.body.password.toString().length <= 6){
            const loginModel = await login(req.body)
            if(loginModel !== 400){
                res.json({
                    status: 200,
                    message: 'user has been succesfyly logined !',
                    key: jwt.sign({id: (await loginModel).user_id}, jwtkey),
                    company_key: jwt.sign({id: (await loginModel).user_id}, jwtkey)
                })
            } else {
                res.json({
                    status: 400,
                    message: 'user has been not succesfyly logined !!!',
                })
            }
        } else {
            res.json({
                status: 400,
                message: 'keys not have',
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const registerCtrl = async (req, res) => {
    try {
        if (req.body && req.body.fullname && req.body.fullname.length <= 36 && req.body.login && req.body.login.toString().length <= 13 && typeof req.body.login === 'number' && req.body.password && typeof req.body.password === "number" && req.body.password >= 4) {
            const registerModel = await register(req.body)
            
            res.json(registerModel ? {
                status: 400,
                message: registerModel
            } : {
                status: 200,
                message: 'user has been succesfyllu registered'
            })
        } else {
            res.json({
                status: 200,
                message: 'error on keys'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const recoverPassCTRL = async (req, res) => {
    try {
        
        const password = await Math.random() * 99999999
        const rusult = password.toString()[0] + password.toString()[1] + password.toString()[2] + password.toString()[3] + password.toString()[4] + password.toString()[5]
        
        if (req.body.login && (req.body.login).includes('@')) {
            const recoverModel = await recoverPassword(req.body, +rusult)
            const test = recoverpass(req.body.login, rusult)

            res.json({
                status: 200,
                message: 'new password send to email'
            })
        } else {
            res.json({
                status: 400,
                message: 'new password send to email'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginCtrl,
    registerCtrl,
    recoverPassCTRL
}