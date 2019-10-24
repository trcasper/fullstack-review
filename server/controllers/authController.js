

const bcrypt = require('bcryptjs');

module.exports = {
    login: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        let foundUser = await db.check_email(email);
        foundUser = foundUser[0]

        if(!foundUser) {
            res.status(401).send('Email does not exist')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.bank_user_password)

        if(authenticated) {
            delete foundUser.bank_user_password;
            req.session.user = foundUser;
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send('Incorrect Password')
        }

    },

    // register: async(req, res) => {
    //     const {email, password} = req.body;
    //     const db = req.app.get('db');

    //     let foundUser = await db.check_email(email);
    //     if(foundUser) {
    //         res.status(409).send('Email already exists');
    //     }
    //     const salt = bcrypt.genSaltSync(10);//extra characters to make our password more secure
    //     const hash = bcrypt.hashSync(password, salt); //combines password + salt

    //     let newUser = await db.register({email, password: hash}); //password is now labeled as 'hash' so we call it 'password' with 'hash' as the value
    //     newUser = newUser[0];
    //     let accountBalance = await db.create_account(newUser.bank_user_id)
    //     accountBalance = accountBalance[0].account_balance;
    //     req.session.user = {...newUser, accountBalance};
    //     res.status(200).send(req.session.user);
    //     //merged the result of two queries to create one session object

    // },

    register: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        let foundUser = await db.check_email(email);
        foundUser = foundUser[0]
        if(foundUser){
            res.status(409).send('Email already exists');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.register({email, password: hash});
        newUser = newUser[0];
        let accountBalance = await db.create_account(newUser.bank_user_id)
        accountBalance = accountBalance[0].account_balance
        req.session.user = {...newUser, accountBalance};
        res.status(200).send(req.session.user);
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200);
        //destroys the session cookie
    },

    getUser: (req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user)
            //finds if there are any available sessions
        }
        res.sendStatus(200)
        //still sends a status that it worked even if there weren't any available sessions
    }
}