create table bank_users (
    bank_user_id serial primary key,
    bank_user_email varchar(100),
    bank_user_password varchar(250)
);
create table user_account (
    user_account_id serial primary key,
    bank_user_id int references bank_users(bank_user_id),
    account_balance float
);