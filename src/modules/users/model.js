const { uniqRow } = require("../../lib/pg")

const companysGETModel = async (company_id, user_id) => {
    try {
        const tes = await uniqRow('select * from company where company_owner = $1', user_id)
        
        
        const query = `
        select
        *
        from users as u
        inner join company as c on c.company_id = u.company_id
        where user_id = $1
        `
        const companys = await uniqRow(query, user_id)
        
        if (tes.rows.length) {
            return tes
        } else if (companys.rows.length) {
            return companys
        }
    } catch (error) {
        console.log(error.message, 'companysGETModel');
    }
}

const companyOwnerGETModel = async (user_id) => {
    try {
        const query2 = `
        select
        *
        from users as u
        inner join company as c on c.company_id = u.company_id
        where u.user_id = $1 and c.company_owner = u.user_id
        `
        const company = await uniqRow(query2, user_id)


        if (company.rows.length) {
            return 200
        } else {
            return 400
        }

    } catch (error) {
        console.log(error.message, 'companysGETModel');
    }
}

const companysPOSTModel = async (user_id, company_name) => {
    try {

        const query2 = `
        select
        *
        from users as u
        inner join company as c on c.company_id = u.company_id
        where u.user_id = $1 and c.company_owner = u.user_id;
        `
        
        const company = await uniqRow(query2, user_id)

        if (company.rows.length) {
            await uniqRow(`insert into company(company_fullname, company_owner) values ($1, $2)`, company_name, user_id)
            return 200
        } else {
            return 400
        }

        
    } catch (error) {
        console.log(error.message, 'companysPOSTModel');
    }
}

const companysWorkersGETModel = async (user_id) => {
    try {

        const query2 = `
        select
        *
        from users as u
        inner join company as c on c.company_id = u.company_id
        where c.company_owner = $1
        `

        const company = await uniqRow(query2, user_id)

        if (company.rows.length) {
            return company
        } else {
            return 400
        }


    } catch (error) {
        console.log(error.message, 'companysWorkersGETModel');
    }
}

const companysWorkersPermissionGETModel = async (owner_id, user_id) => {
    try {

        const query2 = `
        select
        *
        from users as u
        inner join permissions_access as ca on ca.user_id = u.user_id
        inner join company as c on c.company_id = u.company_id
        where u.company_owner = $1 and u.user_id = $2;
        `

        const company = await uniqRow(query2, owner_id, user_id)

        if (company.rows.length) {
            return company
        } else {
            return 400
        }


    } catch (error) {
        console.log(error.message, 'companysWorkersGETModel');
    }
}

module.exports = {
    companysGETModel,
    companysPOSTModel,
    companyOwnerGETModel,
    companysWorkersGETModel,
    companysWorkersPermissionGETModel
}