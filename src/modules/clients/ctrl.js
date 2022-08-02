const {checkcompany} = require("../../lib/checkcompany");
const { permissionCtrl } = require("../../lib/permissions/ctrl");
const { tokenchecker } = require('../../lib/tokenchecker');
const { clientsGETModel, clientsPOSTModel, clientsStatusPUTModel, clientsMODEL,  clientDELETEModel, clientPUTModel } = require("./model")

const clientGETCtrl = async (req, res) => {
    try {
        
        const permission = await permissionCtrl(tokenchecker(req.body.token).id, 1, 1)
        
        if ((await checkcompany(req.body.company_id))) {
            if(permission){
                const company_id = (req.body.company_id)
                res.json({
                    status: 200,
                    message: 'data has sended',
                    data: await clientsGETModel(tokenchecker(req.body.token).id, company_id ? company_id : 0)
                })
            } else {
                res.json({
                    status: 404,
                    message: `you do'nt have any permissions`
                })
            }
        } else {
            res.json({
                status: 404,
                message: 'this company not found !!'
            })
        }
        
    } catch (error) {
        console.log(error.message, 'clientGETCtrl');
    }
}

const clientPOSTCtrl = async (req, res) => {
    try {
        const permission = await permissionCtrl(tokenchecker(req.body.token).id, 2, 1)
        
        if(permission){
            const { phone_number_first, phone_number_second } = req.body
            if (phone_number_first || phone_number_first.length <= 9 || phone_number_second || phone_number_second.length <= 9) {
                const company_id = (req.body.company_id)
                res.json({
                    status: 200,
                    message: 'data has sended',
                    data: await clientsPOSTModel(req.body, tokenchecker(req.body.token).id, company_id ? company_id : 0)
                })
            }
        } else {
            res.json({ 
                status: 404,
                message: `you do'nt have any permissions`
            })
        }
        
    } catch (error) {
        console.log(error.message, 'clientPOSTCtrl');
    }
}

const clientStatusPUTCtrl = async (req, res) => {
    try {
        const permission = await permissionCtrl(tokenchecker(req.body.token).id, 4, 1)
        
        if(permission){
            const company_id = (req.body.company_id)-1
            res.json({
                status: 200,
                message: 'data has sended',
                data: await clientsStatusPUTModel(req.body)
            })
        } else {
            res.json({
                status: 404,
                message: `you do'nt have any permissions`
            })
        }
        
    } catch (error) {
        console.log(error.message, 'clientStatusPUTCtrl');
    }
}

const clientDELETECtrl = async (req, res) => {
    try {
        const permission = await permissionCtrl(tokenchecker(req.body.token).id, 3, 1)
        
        const clientDELETE = await clientDELETEModel(await tokenchecker(req.body.token), req.body)
        
        if(permission){
            if (clientDELETE === 200) {
                res.json({
                    status: 200,
                    message: 'user has deleted',
                })
            } else if(clientDELETE === 400) {
                res.json({
                    status: 404,
                    message: 'company not found',
                })
            } else {
                res.json({
                    status: 404,
                    message: 'user not found',
                })
            }
        } else {
            res.json({
                status: 500,
                message: `you do'nt have any permissions`
            })
        }
        
    } catch (error) {
        console.log(error.message, 'clientDELETECtrl');
    }
}

const clientPUTCtrl = async (req, res) => {
    try {
        const permission = await permissionCtrl(tokenchecker(req.body.token).id, 5, 1)

        const clientPUT = await clientPUTModel(await tokenchecker(req.body.token), req.body)

        if (permission) {
            if (clientPUT === 200) {
                res.json({
                    status: 200,
                    message: 'user has update'
                })
            } else if (clientPUT === 400) {
                res.json({
                    status: 404,
                    message: 'company not found',
                })
            } else {
                res.json({
                    status: 404,
                    message: 'user not found',
                })
            }
        } else {
            res.json({
                status: 500,
                message: `you do'nt have any permissions`
            })
        }

    } catch (error) {
        console.log(error.message, 'clientPUTCtrl');
    }
}

const clientCTRL = async (req, res) => {
    try {
        res.json({
            data: (await clientsMODEL()).rows
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    clientGETCtrl,
    clientPOSTCtrl,
    clientStatusPUTCtrl,
    clientDELETECtrl,
    clientCTRL
}