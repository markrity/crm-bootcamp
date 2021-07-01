const sessionHelper = new SessionHelper();
const sqlHelper = new SqlHelper();
const mailgunHelper = new MailgunHelper();

class UsersManager {

    /**
     * @param {object} fields 
     * @returns object with all the invalid fields.
     */
    validateAll(fields){
        let resData = {valid: true, errors: []};
        for(let field in fields){
            let content = fields[`${field}`];
            if(!validate(content.type, true, content.value)){
                resData.valid = false;
                resData.errors.push(field);
            }
        }
        return resData;
    }
    
    editUser(fields, token){
        let resData = {valid: true, errors: [], serverError: ''};

        // fields validations
        resData =  validateAll(fields);
        if(!resData.valid){
            res.send(resData);
            return;
        }

        const tokenBody = sessionHelper.verifyToken(token);
        if(tokenBody) {
            const {accountId, userId} = tokenBody;
            
            // insert the account to the db
            let sql = `UPDATE users SET user_name = '${fields.name.value}', user_password = '${encodePassword(fields.password.value)}', user_phone = '${fields.phone.value}' WHERE user_id = ${userId};`;
            let result = await sqlHelper.update(sql).catch((err)=>{});

            if(!result){
                resData.valid = false;
                resData.serverError = 'serverError';
                return resData;
            }

            sql = `SELECT * FROM accounts WHERE account_id = '${accountId}'`;
            result = await sqlHelper.select(sql).catch((err)=>{});
            if(!result || result == 0){
            resData.valid = false;
            resData.serverError = 'serverError';
            return resData;
            }

            const adminMail = result[0].first_user_mail;

            try {
                resData = await mailgunHelper.sendMail('coheen1@gmail.com', 
                adminMail, 'RGB - Invitation accepted', `The invitation you sent to <b>${fields.name.value}</b> was accepted.`);
            } catch {}

            // userMail
            const user = {userName: fields.name.value,  userId: userId, accountId: accountId };
            resData.accessToken = sessionHelper.createSession(user);
            resData.user_name = result.user_name;

        } else {
            resData.valid = false;
            resData.serverError = "serverError";
        }
        return resData;
    }


    // getUser(){
    //     const user = req.user;
    //     const resData = {valid: true};
    //     // TODO check if the user is an admin
    //     let sql = `SELECT * FROM users WHERE account_id = '${user.accountId}'`;
    //     let result = await sqlHelper.select(sql).catch((err)=>{});

    //     // The query failed
    //     if(!result){
    //         resData.valid = false;
    //         resData.serverError = "serverError";
    //         res.send(resData);
    //         return;
    //     };

    //     resData.usersList = result;
    //     res.send(resData);
    // }
} 