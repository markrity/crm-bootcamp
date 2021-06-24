import mysql from 'mysql';
import cors from 'cors';

class SqlHelper {
constructor(connection){
    this.connection = connection;
}


insert(sql){
    console.log("inserting...");
    console.log(sql);
    return new Promise((resolve, reject) => {
      this.connection.query(sql, function (err, result) {
        if (err) {
          reject("Database insertion failed");
        } else {
          console.log("1 record inserted");
          resolve(result);
        }
      })
    });
  }
  
  select(sql){
    return new Promise((resolve, reject) => {
      this.connection.query(sql, function (err, result) {
        if (err) {
          reject("Database selection failed");
        // } else if (result.length = 0){
        //   console.log("not exist!");
        //   reject("Database selection failed");
        // } else {
        } else {
          // console.log("exist!");
          resolve(result);
        }
      })
    });
  }
}

export default SqlHelper;


// // "debug": "export PORT=8005 && nodemon --inspect index.js"