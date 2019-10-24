
INSERT INTO user_account(
    bank_user_id,
    account_balance
) VALUES (
    $1,
    0.00
)
RETURNING account_balance;