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
        
        const companys = await (await uniqRow('select * from company where user_id = $1', user_id)).rows
        
        const clients = await (await uniqRow(query, user_id, companys[company_id].company_id)).rows
        
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
        
        await (await uniqRow(query, fullname, phone_number_first, phone_number_second, about, address, age, companys[company_id].company_id)).rows
        
    } catch (error) {
        console.log(error.message)
    }
}

const clientsStatusPUTModel = async ({client_status, client_id}) => {
    try {
        const query = `
        update clients set client_status = $1 where client_id = $2`
        
        await uniqRow(query, client_status, client_id)
    } catch (error) {
        console.log(error.message)
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
    clientsMODEL
}