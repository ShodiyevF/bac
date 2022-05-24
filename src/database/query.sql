select 
*
from clients as cl
inner join company as c on c.company_id = cl.company_id
where c.user_id = 3;

select
*
from orders as o 
inner join company as c on c.company_id = 3
inner join users as u on u.user_id = 3;

        -- when c.client_status > 1 then c.client_fullname


select 
        * 
    from news
    where
    case
        WHEN $1 > 0 THEN  lang_id = $1
        ELSE true
    end and
    case
        WHEN $2 > 0 THEN  author_id = $2
        ELSE true
    end and
    case
        WHEN $3 >  0 THEN  category_id = $3
        ELSE true
    end and
    case
        WHEN $4 >  0 THEN  news_id = $4
        ELSE true
    end




delete from clients where client_id = 9;
