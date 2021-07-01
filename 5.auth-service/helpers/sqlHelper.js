import mysql from 'mysql';
import cors from 'cors';

class SqlHelper {

constructor(){
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "",
        database: 'landingdb'
      });
      
      this.connectionValid = false;
      this.connection.connect(function (err) {
        if (err) {
          this.connectionValid = false;
        } else {
          this.connectionValid = true;
        }
      });
}


// TODO return the id from result
insert(sql){
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
        } else {
          resolve(result);
        }
      })
    });
  }

  update(sql){
    return new Promise((resolve, reject) => {
      this.connection.query(sql, function (err, result) {
        if (err) {
          reject("Database selection failed");
        } else {
          resolve(result);
        }
      })
    });
  }
}

export default SqlHelper;


// // "debug": "export PORT=8005 && nodemon --inspect index.js"