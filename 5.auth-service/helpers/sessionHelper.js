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
              console.log("not verified");
              return null;
            }
            console.log("verified!");
            return this.openSessions.has(user.sessionId) ?  this.openSessions.get(user.sessionId) : null;
          });
        } 
        return null;
    }

    createSession (user){
        user.sessionId = this.sessionCounter;
        this.openSessions.set(this.sessionCounter++, user);
        const token = jwt.sign(user, this.accessTokenSecret, {
          "algorithm": "HS256",
          expiresIn: 86400 * 10 // expires in 10 days
        });
        console.log(this.openSessions);
        return token;
    }

    deleteSession(userData){
        this.openSessions.delete(userData.sessionId);
    }

    isOpenSession(userData){
        return this.openSessions.has(userData.sessionId);
    }

    createToken(data){
      const token = jwt.sign(data, this.accessTokenSecret, {
        expiresIn: 86400  // expires in 24 hours
      });
      return token;
    }

    verifyToken(token){
      return jwt.verify(token, this.accessTokenSecret, (err, result) => {
        if (err){
          console.log("not verified");
          return null;
        }
        console.log("verified!");
        return result;
      });
      
      
    }

}

export default SessionHelper;