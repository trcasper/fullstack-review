
-- SELECT * FROM bank_users
-- WHERE bank_user_email = $1;

SELECT b.bank_user_id, b.bank_user_email, b.bank_user_password, a.account_balance FROM bank_users b
-- 'b' / 'a' are aliases 
JOIN user_account a ON b.bank_user_id = a.bank_user_id
-- using the 'join' because they are two different tables
WHERE b.bank_user_email = $1;