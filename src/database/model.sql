create database servicecenter;

drop table if exists permissions_names cascade;
create table permissions_names(
    permissions_names_id int generated always as identity primary key,
    permissions_name varchar(20) not null
);

drop table if exists actions cascade;
create table actions(
    action_id int generated always as identity primary key,
    action_name varchar(56) not null
);

drop table if exists users cascade;
create table users(
    user_id int generated always as identity primary key,
    user_fullname varchar(56) not null,
    user_login text not null unique,
    user_password int not null
);

drop table if exists company cascade;
create table company(
    company_id int generated always as identity primary key,
    company_fullname varchar(56) not null,
    user_id int not null references users(user_id)
);

drop table if exists clients cascade;
create table clients(
    client_id int generated always as identity primary key,
    client_status smallint not null default 1,
    client_fullname text not null,
    client_phone_number_first varchar(13) not null,
    client_phone_number_second varchar(13) not null,
    client_add_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    client_about text not null,
    client_address text not null,
    client_age smallint not null,
    company_id int not null references company(company_id)
);

drop table if exists orders cascade;
create table orders(
    order_id int generated always as identity primary key,
    order_status smallint not null default 1,
    order_device_type text not null,
    order_device_name text not null,
    order_device_bug text not null,
    order_get_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    order_over_time text,
    order_price text not null,
    order_about text not null,
    client_id int not null references clients(client_id),
    company_id int not null references company(company_id)
);

drop table if exists permissions_access cascade;
create table permissions_access(
    permissions_access_id int generated always as identity primary key,
    permissions_names_id int not null references permissions_names(permissions_names_id),
    company_id int not null references company(company_id),
    action_id int not null references actions(action_id)
);

drop table if exists permissions_access cascade;
create table permissions_access(
    permissions_access_id int generated always as identity primary key,
    permissions_names_id int not null references permissions_names(permissions_names_id),
    company_id int not null references company(company_id),
    action_id int not null references actions(action_id)
);