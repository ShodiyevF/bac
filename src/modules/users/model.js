const { uniqRow } = require("../../lib/pg")

const companysGETModel = async (user_id) => {
    try {
        const companys = await uniqRow('select * from company where user_id = $1', user_id)
        return companys
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    companysGETModel
}