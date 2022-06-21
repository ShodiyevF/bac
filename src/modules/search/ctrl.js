const { tokenchecker } = require("../../lib/tokenchecker")
const { searchModel } = require("./model")

const searchCtrl = async (req, res) => {
    try {
        
        const key = (req.body.key).split((req.body.key)[0] === '#' ? '#' : '@')
        
        if (key[1]) {
            if(!(isNaN(+(key[1])))){
                if (req.body.key && typeof +(key[1]) === 'number') {
                    const model = await searchModel(req.body.key, tokenchecker(req.body.token), req.body.company_id)
                    if (model === 400) {
                        return res.json({
                            status: 400,
                            message: 'error on keys'
                        })
                    } else {
                        if (model.rows.length) {
                            if ((model.rows)[0].order_id) {
                                return res.json({
                                    status: 200,
                                    role: 2,
                                    message: 'data has sended',
                                    data: model.rows
                                })
                            } else {
                                return res.json({
                                    status: 200,
                                    role: 1,
                                    message: 'data has sended',
                                    data: model.rows
                                })
                            }
                        } else {
                            return res.json({
                                status: 400,
                                message: 'error on keys'
                            })
                        }
                    }
                } else {
                    return res.json({
                        status: 404,
                        message: 'error on keys'
                    })
                }
            }
        }
    } catch (error) {
        console.log(error.message, 'searchCtrl');
    }
}

module.exports = {
    searchCtrl
}