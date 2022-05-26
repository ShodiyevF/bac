insert into users (user_fullname, user_login, user_password) values 
('shodiyev Fayzulloh', 'fayzulloh6757@gmail.com', 1234),
('sodirxon mahmudov', '1234', 1234),
('adhamov temurbek', '998919999999', 1234);

insert into company(company_fullname, user_id) values 
('talim', 3);
('universe y', 1);

insert into permissions_names(permissions_name) values 
('read'),
('write'),
('delete'),
('put');

insert into actions(action_name) values
('foydalanuvchilar'),
('arxivlar');

insert into permissions_access(permissions_names_id, company_id, action_id) values
(2,1,1),
(4,1,2);

insert into permissions_access(permissions_names_id, company_id, action_id) values (1,1,1);
insert into permissions_access(permissions_names_id, company_id, action_id) values (1,3,2);
insert into permissions_access(permissions_names_id, company_id, action_id) values (1,1,2);
insert into permissions_access(permissions_names_id, company_id, action_id) values (4,1,2);
insert into permissions_access(permissions_names_id, company_id, action_id) values (2,1,1);
insert into permissions_access(permissions_names_id, company_id, action_id) values (4,1,2);

insert into clients(client_status, client_fullname, client_phone_number_first, client_phone_number_second, client_about, client_address, client_age, company_id) values 
(1, 'shodiyev fayzulloh', '998912007435', '998993646891', 'birnima13', 'bradsfdvd', 30, 1),
(3, 'ilhomov ikrom', '998912004141', '998910511242', 'hakjsldjvhkbnkljdoudisfahsdj', 'bradsfdvd', 30, 1),
(2, 'abdusattorov abdusattor', '998911949145', '998991758191', 'fvjfaskndmvkjouhsdadjsndkms', 'bradsfdvd', 30, 1),
(3, 'valiyev anasxon', '998941384819', '998991849105', 'fjshakndlskdpsiodjadnlk;svfoivo', 'bradsfdvd', 30, 1),
(4, 'shodiyev abdulhakim', '998905073993', '998905063993', 'fgaadsfdsdsfasfdsffcc', 'bradsfdvd', 30, 1),
(2, 'gulomov abdulatif', '998918504842', '998991457151', 'fgskgfjladnkf;ldfoipdfjkdlm', 'bradsfdvd', 30, 1);

insert into orders(order_device_name, order_device_bug, order_price, client_id, company_id) values 
('galaxy S99', 'glezdo', '310.500', 1, 1),
('galaxy A15', 'microfon', '310.500', 2, 2),
('galaxy S99', 'glezdo', '310.500', 3, 1);

insert into orders(order_device_name, order_device_bug, order_price, client_id, company_id, order_over_time) values 
('galaxy S99', 'glezdo', '310.500', 1, 3, '20.06.2022|12:00');