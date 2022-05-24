const { uniqRow } = require("./pg")

const checkcompany = async (user_id, company_id) => {
    try {
        const mycompany = await uniqRow('select * from company where user_id = $1', user_id)
        return mycompany.rows[+company_id]
    } catch (error) {
        console.log(error.message, 'checkcompany');
    }
}

module.exports = {
    checkcompany
}