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
        
        const check = await uniqRow('select * from users where user_id = $1', user_id)
        
        const checked = check.rows.find(el => el.user_login === 'suppermupper' && el.user_password === 1114)
        
        const query2 = `
        select
        *
        from users as u
        inner join company as c on c.company_id = u.company_id
        where u.user_id = $1 and c.company_owner = u.user_id
        `
        
        const s = `
        select
        *
        from users as u
        inner join company as c on c.company_id = u.company_id
        `
        
        const company = await uniqRow(query2, user_id)
        const company1 = await uniqRow(s)
        
        if (company.rows.length) {
            return 200
        } else if (company1.rows.length) {
            if (checked) {
                return 200
            } else {
                return 400
            }
        } else {
            return 400
        }
        
    } catch (error) {
        console.log(error.message, 'companyOwnerGETModel');
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
        
        const check = await uniqRow('select * from users where user_id = $1', user_id)
        
        const checked = check.rows.find(el => el.user_login === 'suppermupper' && el.user_password === 1114)
        
        const query2 = `
        select
        *
        from users as u
        inner join company as c on c.company_id = u.company_id
        where ${checked ? 'u.user_id != $1' : 'c.company_owner = $1 and u.user_id != $1'}
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
        
        const check = await uniqRow('select * from users where user_id = $1', owner_id)
        
        const checked = check.rows.find(el => el.user_login === 'suppermupper' && el.user_password === 1114)
        
        const query2 = `
        select
        *
        from users as u
        inner join permissions_access as ca on ca.user_id = u.user_id
        inner join company as c on c.company_id = u.company_id ${checked ? ';' : 'where c.company_owner = $1 and u.user_id = $2;'}
        `
        
        
        let company
        let aa
        if (checked) {
            aa = await uniqRow(query2)
        } else {
            company = await uniqRow(query2, owner_id, user_id)
        }
        
        if (company != undefined) {
            return company
        } else if (checked) {
            return aa
        } else {
            return 400
        }
        
        
    } catch (error) {
        console.log(error.message, 'companysWorkersPermissionGETModel');
    }
}

const companysWorkersPermissionPOSTModel = async (owner_id, user_id, { action, name}) => {
    try {
        
        const query2 = `
        select
        *
        from users as u
        inner join company as c on c.company_id = u.company_id
        where c.company_owner = $1
        `
        
        const company = await uniqRow(query2, owner_id)
        
        if (company.rows.length) {
            const query2 = `
            select
            *
            from users as u
            inner join permissions_access as ca on ca.user_id = u.user_id
            inner join company as c on c.company_id = u.company_id
            where c.company_owner = $1 and u.user_id = $2;
            `
            const company = await uniqRow(query2, owner_id, user_id)
            
            const findedAccess = company.rows.find(el => el.action_id == action && el.permissions_names_id == name)
            
            if (findedAccess) {
                await uniqRow(`delete from permissions_access where permissions_names_id = $1 and user_id = $2 and action_id = $3`, name, user_id, action)
                return 201
            } else {
                await uniqRow(`insert into permissions_access (permissions_names_id, user_id, action_id) values ($1,$2,$3)`, name, user_id, action)
            }
            
        } else {
            return 400
        }
        
        
    } catch (error) {
        console.log(error.message, 'companysWorkersPermissionPOSTModel');
    }
}

const superAdminUsersGETModel = async (user_id) => {
    try {
        const check = await uniqRow('select * from users where user_id = $1', user_id)
        
        const checked = check.rows.find(el => el.user_login === 'suppermupper' && el.user_password === 1114)
        if(checked){
            const query2 = `
            select
            *
            from users as u
            inner join company as c on c.company_id = u.company_id
            where u.user_id != $1;
            `
            
            const company = await uniqRow(query2, user_id)
            
            if (company.rows.length) {
                return company.rows
            } else {
                return 401
            }
        } else {
            return 400
        }
    } catch (error) {
        console.log(error.message, 'superAdminUsersGETModel');
    }
}

const masterPostModel = async (user_id, { fullname, login, password, company_id }) => {
    try {
        
        console.log(user_id);
        
        const query = `
        select
        *
        from company as c
        where c.company_owner = $1
        `
        
        const check = await uniqRow(query, user_id)
        
        if (check.rows.length) {
            console.log(company_id);
            await uniqRow('insert into users (user_fullname, user_login, user_password, company_id) values ($1, $2, $3, $4)', fullname, login, password, company_id)
        } else {
            return 400
        }
        
    } catch (error) {
        console.log(error.message, 'superAdminUsersGETModel');
    }
}

module.exports = {
    companysGETModel,
    companysPOSTModel,
    companyOwnerGETModel,
    companysWorkersGETModel,
    companysWorkersPermissionGETModel,
    companysWorkersPermissionPOSTModel,
    superAdminUsersGETModel,
    masterPostModel
}