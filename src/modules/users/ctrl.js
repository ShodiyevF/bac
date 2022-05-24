const { tokenchecker } = require("../../lib/tokenchecker")
const { companysGETModel } = require("./model")

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
        
    }
}

module.exports = {
    companysGETCTRL
}