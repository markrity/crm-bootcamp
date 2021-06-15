const express = require('express');
const app = express();

const mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());
app.use(express.static('views'));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');



app.get('/thanksPage', function(req, res) {

  const data=req.query;
  console.log(data);
  
  res.render('thanksPage',data);
});
app.get('/', function(req, res) {


  const data={ img:'css/background.jpg',
                time: returnTime()              
          };
  


  
  res.render('landPage',data);
});



app.listen( '8080', () => {
  console.log(`Server running at http://localhost:8080/`);
});

function returnTime(){
  let currentTime=new Date();
  let currentHour=currentTime.getHours();
  if(currentHour>5&&currentHour<12){
    return 'morning';
  }
  if(currentHour>12&&currentHour<18){
    return 'afternoon';
  }
  if(currentHour>18&&currentHour<22){
    return 'evening';
  }
  return 'night';

}