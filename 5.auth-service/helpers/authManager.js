import SessionHelper from './sessionHelper.js';
import MailgunHelper from './mailgunHelper.js'
import ValidationHelper from './validationHelper.js';
import SqlHelper from './sqlHelper.js';
import md5 from 'md5';

const sessionHelper = new SessionHelper();
const sqlHelper = new SqlHelper();
const mailgunHelper = new MailgunHelper();
const validation = new ValidationHelper();


class AuthManager {

    /**
     * Inserts new user and account to the db.
     * @param {object} fields 
     * @returns jwt token
     */
    async signup(fields){
        let response = { valid: true, errors: [], serverError: '' }
        
        response = validation.validateAll(fields);
        if(!response.valid){
            return response;
        }

        // Check if the user already signed up
        var sql = `SELECT * FROM users WHERE user_mail = '${fields.mail.value}';`;
        let result = await sqlHelper.select(sql).catch((err)=>{});

        if(!result){
            response.valid = false;
            response.serverError = "serverError";
            return response;
        };

        if(result.length > 0){
            response.valid = false;
            response.serverError = 'userAlreadyExist';
            return response;
        }
            
        // insert the account to the db
        
        sql = `INSERT INTO accounts (business_name, first_user_mail) VALUES ('${fields.business.value}', '${fields.mail.value}');`;
        result = await sqlHelper.insert(sql).catch((err)=>{});
        if(!result){
            response.valid = false;
            response.serverError = 'serverError';
            return response;
        }

        let account_id_value = result.insertId;
        // insert the user to the db
        sql = `INSERT INTO users (account_id, user_name, user_password, user_mail, user_phone) VALUES ('${account_id_value}', '${fields.name.value}', '${this.encodePassword(fields.password.value)}', '${fields.mail.value}', '${fields.phone.value}');`;
        result = await sqlHelper.insert(sql).catch((err)=>{});
        if(!result){
            response.valid = false;
            response.serverError = 'serverError';
            return response;
        }
        const user = {userName: fields.name.value,  userId: result.insertId, accountId: account_id_value};
        response.accessToken = sessionHelper.createSession(user);
        response.user_name = result.user_name;
        return response;
    }

    /**
     * Checks if the user is in the db.
     * @param {object} fields 
     * @returns jwt token
     */
    async login(fields){
        let response = { valid: true, errors: [], serverError: ''}

        response = validation.validateAll(fields);
        if(!response.valid){
            return response;
        }
        
        var sql = `SELECT * FROM users WHERE user_mail = '${fields.mail.value}' AND user_password = '${this.encodePassword(fields.password.value)}' ;`;
        let result = await sqlHelper.select(sql).catch((err)=>{});
        if(!result){
            response.valid = false;
            response.serverError = "serverError";
            return response;
        };

        if(result.length > 0){
            let userResult = result[0];      
            const user = {userName: userResult.user_name,  userId: userResult.user_id, accountId: userResult.account_id};
            response.user_name = userResult.user_name;
            response.accessToken = sessionHelper.createSession(user);

        } else {
            response.valid = false;
            response.serverError = 'IncorrectMailOrPassword';
        }
        return response;
    }

    /**
     * remove the session from the open sessions.
     * @param {string} authorization 
     * @returns valid ot not in case of error.
     */
    async logout(authorization){
        let resData = { valid: false }

        var userData = sessionHelper.verifySession(authorization);
        if(userData){
            // sessionHelper.deleteSession(userData);
            resData.valid = true;
        }
        return resData;
    }

    /**
     * Updates the new password in the db.
     * @param {object} fields 
     * @param {string} mailToken 
     * @returns valid if the password has changed
     */
    async resetPassword(fields, mailToken){
        let resData = {valid: true, errors: [], serverError: ''};

        // Validate the password
        resData = validation.validateAll(fields);
        if(!resData.valid){
            return resData;
        }
        
        const data =  sessionHelper.verifyToken(mailToken);
        
        // Jwt token invalid
        if(!data){
            resData.valid = false;
            resData.serverError = "serverError";
            return resData;
        }

        const password = fields.newPassword.value;
        // Update the password in the db
        let sql = `UPDATE users SET user_password = '${this.encodePassword(password)}' WHERE user_mail = '${data.userMail}';`;
        let result = await sqlHelper.update(sql).catch((err)=>{});
        // The query failed
        if(!result){
            resData.valid = false;
            resData.serverError = 'serverError';
            return resData;
        }
        // The password has changed
        resData.valid = true;
        return resData;
    }

    /**
     * Sends an email to the given mail address with a link to reset the user's password.
     * @param {object} fields 
     * @returns valid if email sent to the user or not valid in case of error
     */
    async forgotPassword(fields){
        let resData = {valid: true, errors: [], serverError: ''};

        // fields validations
        resData =  validation.validateAll(fields);
        if(!resData.valid){
            return resData;
        }
        
        const userMail = fields.mail.value;
        if(userMail){
            // Check if the mail is in the db
            var sql = `SELECT * FROM users WHERE user_mail = '${userMail}'`;
            let result = await sqlHelper.select(sql).catch((err)=>{});

            // The query failed
            if(!result){
                resData.valid = false;
                resData.serverError = "serverError";
                return resData;
            };

            if(result.length == 0){
                resData.valid = true;
                return resData;
            }

            // User exist
            resData.valid = true;
            // Encoding the mail address
            let tokenBody = {userMail: userMail};
            const mailToken = sessionHelper.createToken(tokenBody, (86400 / 24) * 4);
            try {
                resData = await mailgunHelper.sendMail('coheen1@gmail.com', userMail, 'RGB - Reset password', `<a href=${`${process.env.URL}/resetPassword/${mailToken}`}>Click to reset your password.</a>`);
            } catch {
                resData.valid = false;
                resData.serverError = "serverError";
            }
            return resData;

        //  Mail is undefined
        } else {
            resData.valid = false;
            resData.serverError = "serverError";
            return resData;
        }
    }

    ping(){
        return true;
    }

    /**
     * Checks if a jwt token is valid.
     * @returns valid, if the token is verified.
     */
    tokenValidation(authorization){
        const userData = sessionHelper.verifyToken(authorization);
        return userData ? {valid: true} : {valid: false};
    }

    /**
     * @param {string} password 
     * @returns the encoded password.
     */
     encodePassword(password){
        return md5(password);
    }

} 

export default AuthManager;