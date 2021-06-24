import jwt from 'jsonwebtoken';
class SessionHelper {
    
    constructor(){
        this.openSessions = new Map();
        this.sessionCounter = 0;
        this.accessTokenSecret = 'nkjnnj5j6jkbHBVjhuyg6tgbj';
    }

    verifySession(accessToken){
        if(accessToken){
          return jwt.verify(accessToken, this.accessTokenSecret, (err, user) => {
            if (err){
              return null;
            }
            return this.openSessions.has(user.session_id) ?  this.openSessions.get(user.session_id) : null;
          });
        } 
        return null;
    }

    createSession (user){
        user.session_id = this.sessionCounter;
        this.openSessions.set(this.sessionCounter++, user);
        const token = jwt.sign(user, this.accessTokenSecret, {
          "algorithm": "HS256",
          expiresIn: 86400 * 10 // expires in 10 days
        });
        return token;
    }

    deleteSession(userData){
        this.openSessions.delete(userData.session_id);
    }

    isOpenSession(userData){
        return this.openSessions.has(userData.session_id);
    }

}

export default SessionHelper;