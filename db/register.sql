
INSERT INTO bank_users (
    bank_user_email,
    bank_user_password
) VALUES (
    ${email},
    ${password}
)
RETURNING *;