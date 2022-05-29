const { uniqRow } = require("../../lib/pg")

const companysGETModel = async (user_id) => {
    try {
        const companys = await uniqRow('select * from company where user_id = $1', user_id)
        return companys
    } catch (error) {
        console.log(error);
    }
}

const companysPOSTModel = async (user_id, company_name) => {
    try {
        await uniqRow(`insert into company(company_fullname, user_id) values ($1,$2)`, company_name, user_id)
    } catch (error) {
        console.log(error.message, 'companysPOSTModel');
    }
}

module.exports = {
    companysGETModel,
    companysPOSTModel
}