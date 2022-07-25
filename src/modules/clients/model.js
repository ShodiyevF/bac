const { uniqRow } = require("../../lib/pg")

const clientsGETModel = async (user_id, company_id) => {
    try {
        
        const query =`
        select
        *
        from clients as cl
        inner join company as c on c.company_id = cl.company_id
        where c.user_id = $1 and c.company_id = $2
        order by cl.client_id desc;
        `
        
        const companys = (await uniqRow('select * from company where user_id = $1', user_id)).rows

        const findedCompany = companys.find(el => el.company_id === +company_id)

        const clients = await (await uniqRow(query, user_id, findedCompany.company_id)).rows
        
        return clients
        
    } catch (error) {
        console.log(error.message)
    }
}


const clientsPOSTModel = async ({fullname, phone_number_first, phone_number_second, about, address, age}, user_id, company_id) => {
    try {
        const query = `
        insert into clients (client_fullname, client_phone_number_first, client_phone_number_second, client_about, client_address, client_age, company_id) values ($1,$2,$3,$4,$5,$6,$7)`
        
        const companys = await (await uniqRow('select * from company where user_id = $1', user_id)).rows

        const company_ida = companys.find(el => el.company_id === +company_id)
        
        await (await uniqRow(query, fullname, phone_number_first, phone_number_second, about, address, age, company_ida.company_id)).rows
        
    } catch (error) {
        console.log(error.message, 'clientsPOSTModel')
    }
}

const clientsStatusPUTModel = async ({client_status, client_id}) => {
    try {
        const query = `
        update clients set client_status = $1 where client_id = $2`
        
        await uniqRow(query, client_status, client_id)
    } catch (error) {
        console.log(error.message, 'clientsStatusPUTModel')
    }
}

const clientDELETEModel = async(user_id, {company_id, client_id}) => {
    try {

        const checkuser = await uniqRow('select * from company where user_id = $1 and company_id = $2', user_id.id, company_id)

        
        if (checkuser.rows.length) {
            const checkcompany = await uniqRow('select * from clients where company_id = $1 and client_id = $2', company_id, client_id)
            if (checkcompany.rows.length) {
                await uniqRow('delete from orders where client_id = $1', client_id)
                await uniqRow('delete from clients where company_id = $1 and client_id = $2', company_id, client_id)
                return 200
            } else {
                return 404
            }
        } else {
            return 400
        }
        
    } catch (error) {
        console.log(error.message, 'clientDELETEModel')
    }
}

const clientsMODEL = async () => {
    try {
        const query = `
        select
        *
        from clients as c;
        `
        
        return await uniqRow(query)
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    clientsGETModel,
    clientsPOSTModel,
    clientsStatusPUTModel,
    clientDELETEModel,
    clientsMODEL
}