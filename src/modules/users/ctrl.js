const { tokenchecker } = require("../../lib/tokenchecker")
const { companysGETModel, companysPOSTModel, companyOwnerGETModel } = require("./model")

const companysGETCTRL = async (req, res) => {
    try {
        if (req.body.token) {
            const token = tokenchecker(req.body.token)
            if (token.id) {
                const data = await companysGETModel(req.body.company_id, token.id)
                if (data === 400) {
                    res.json({
                        status: 400,
                        message: 'companys not sended'
                    })
                } else {
                    res.json({
                        status: 200,
                        message: 'companys sended',
                        data: data.rows
                    })
                }
            } else {
                res.json({
                    status: 404,
                    message: 'you dont have token'
                })
            }
        }
        
    } catch (error) {
        console.log(error.message, 'companysGETCTRL'); 
    }
}

const companyOwnerGETCtrl = async (req, res) => {
    try {
        const test = await companyOwnerGETModel((tokenchecker(req.body.token)).id)
        if (test == 200) {
            res.json({
                status: 200,
                message: 'company owner hehe'
            })
        } else {
            res.json({
                status: 400,
                message: 'not owner'
            })
        }
    } catch (error) {
        console.log(error.message, 'companysGETCTRL');
    }
}

const companyPOSTCTRL = async (req, res) => {
    try {
        if (req.body.token && req.body.company_name ) {
            const token = await tokenchecker(req.body.token)
            if (token.id) {
                const check = await companysPOSTModel(token.id, req.body.company_name)
                if (check == 200) {
                    return res.json({
                        status: 200,
                        message: 'companys has writed'
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'you are not owner'
                    })
                }
            } else {
                return req.json({
                    status: 400,
                    message: `you do'nt have token`
                })
            }
        }
    } catch (error) {
        console.log(error.message, 'companyPOSTCTRL'); 
    }
}

module.exports = {
    companysGETCTRL,
    companyPOSTCTRL,
    companyOwnerGETCtrl
}