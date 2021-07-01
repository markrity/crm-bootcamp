// import express from 'express';
// import SessionHelper from './sessionHelper.js';

// var router = express.Router();
// const sessionHelper = new SessionHelper();

// router.use(authMiddleware);


// function authMiddleware(req, res, next){
//     console.log(req.headers.authorization);
//     var userData = sessionHelper.verifySession(req.headers.authorization);
//     console.log("user: ",userData);
//     if(userData){
//       next()
//     } else {
//         console.log("returns false");
//         return false;
//     }
//   }

//   export default authMiddleware;

//  router.get('/user', function(req, res){
//   console.log("in user");
//   res.send(true);
// });

