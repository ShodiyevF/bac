const { tokenchecker } = require("../../lib/tokenchecker")
const { companysGETModel, companysPOSTModel } = require("./model")

const companysGETCTRL = async (req, res) => {
    try {
        if (req.body.token) {
            const token = tokenchecker(req.body.token)
            if (token.id) {
                res.json({
                    status: 200,
                    message: 'companys sended',
                    data: (await companysGETModel(token.id)).rows
                })
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

const companyPOSTCTRL = async (req, res) => {
    try {
        if (req.body.token && req.body.company_name ) {
            const token = await tokenchecker(req.body.token)
            if (token.id) {
                await companysPOSTModel(token.id, req.body.company_name)
                return res.json({
                    status: 200,
                    message: 'companys has writed'
                })
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
    companyPOSTCTRL
}