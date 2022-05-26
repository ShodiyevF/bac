const { uniqRow } = require("./pg")

const checkcompany = async (user_id, company_id) => {
    try {
        const mycompany = await uniqRow('select * from company where user_id = $1 and company_id = $2 ', user_id, company_id)
        return mycompany.rows[0]
    } catch (error) {
        console.log(error.message, 'checkcompany');
    }
}

module.exports = {
    checkcompany
}