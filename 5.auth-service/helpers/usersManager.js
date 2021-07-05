import SessionHelper from './sessionHelper.js';
import MailgunHelper from './mailgunHelper.js'
import ValidationHelper from './validationHelper.js';
import SqlHelper from './sqlHelper.js';
import md5 from 'md5';

const sessionHelper = new SessionHelper();
const sqlHelper = new SqlHelper();
const mailgunHelper = new MailgunHelper();
const validation = new ValidationHelper();


class UsersManager {

    /**
     * Updates the new details of the user in the db.
     * @param {object} fields 
     * @param {string} token 
     * @returns 
     */
   async editUser(fields, token){
        let resData = {valid: true, errors: [], serverError: ''};

        // fields validations
        resData =  validation.validateAll(fields);
        if(!resData.valid){
            res.send(resData);
            return;
        }

        const tokenBody = sessionHelper.verifyToken(token);
        if(tokenBody) {
            const {accountId, userId} = tokenBody;
            
            // insert the account to the db
            let sql = `UPDATE users SET user_name = '${fields.name.value}', user_password = '${this.encodePassword(fields.password.value)}', user_phone = '${fields.phone.value}' WHERE user_id = ${userId};`;
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

    /**
     * @param {string} password 
     * @returns the encoded password.
     */
    encodePassword(password){
        return md5(password);
    }

    /**
     * Removes the user from the db.
     * @param {object} user 
     */
    async removeUser(user){
        let response = {valid: true};
        let sql = `DELETE FROM users WHERE user_id = '${user.user_id}'`;
        let result = await sqlHelper.delete(sql).catch((err)=>{});

        // The query failed
        if(!result){
            response.valid = false;
            response.serverError = "serverError";
        } 
        return response;
    }

    /**
     * @param {object} user 
     * @returns All the users from the same account
     */
    async getUsers(user){
        const response = {valid: true};
        // TODO check if the user is an admin
        let sql = `SELECT * FROM users WHERE account_id = '${user.accountId}'`;
        let result = await sqlHelper.select(sql).catch((err)=>{});

        // The query failed
        if(!result){
            response.valid = false;
            response.serverError = "serverError";
        } else {
            response.usersList = result;
        }

        return response;
    }

    /**
     * Add new user to the db and send him a sign up link
     * @param {object} fields 
     * @param {string} token 
     * @returns returns the new user details or in case of error return errors list.
     */
    async addUser(fields, token){
        let resData = {valid: true};

        // fields validations
        resData =  validation.validateAll(fields);
        if(!resData.valid){
            return resData;
        }
        
        const userMail = fields.mail.value;
        const tokenBody = sessionHelper.verifySession(token);
        console.log(userMail);
        if(userMail && tokenBody){

            // Check if the user is already in the db
            var sql = `SELECT * FROM users WHERE user_mail = '${userMail}'`;
            let result = await sqlHelper.select(sql).catch((err)=>{});

            // The query failed
            if(!result){
                resData.valid = false;
                resData.serverError = "serverError";
                console.log("here2");
                return resData;
            };

            // User mail is already in the db
            if(result.length > 0){
                resData.valid = false;
                resData.serverError = "userMailAlreadyExist";
                console.log("here3");
                return resData;
            }

            // New user - insert the new user to the db
            sql = `INSERT INTO users (account_id, user_mail) VALUES ('${tokenBody.accountId}', '${userMail}');`;
            result = await sqlHelper.insert(sql).catch((err)=>{});
            if(!result){
                resData.valid = false;
                resData.serverError = 'serverError';
                console.log("here4");
                return resData;
            }
            
            // Encoding the mail address and the account id 
            const mailToken = sessionHelper.createToken({userMail: userMail, accountId: tokenBody.accountId, userId: result.insertId}, 86400 * 10);
            // send the invite mail to the user
            // TODO replace my mail with userMail
            try {
                resData = await mailgunHelper.sendMail('coheen1@gmail.com', 'coheen1@gmail.com', 'RGB - Invitation', `You have received an invitation to join RGB! <br/> <a href=${`${process.env.URL}/newUser/${mailToken}`}>Click to sign up.</a>`);
                resData.user = {user_mail: userMail, user_id: result.insertId};
            } catch {
                resData.valid = false;
                resData.serverError = "serverError";
                console.log("here5");
            }
            return resData;

        //  Mail is undefined
        } else {
            resData.valid = false;
            resData.serverError = "serverError";
            console.log("here6");
            return resData;
        }
           
    }

} 

export default UsersManager;