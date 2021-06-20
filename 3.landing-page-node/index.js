const express = require('express');
// const helpers = require('./helpers'); //Requires the help functions.
const mustacheExpress = require('mustache-express');
const axios = require('axios');
const app = express();
app.use(express.static('views'));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views'); 


app.get('/admin', function(req, res) {
  axios.get('http://kerenadiv.com:8004/admin').then((response) => {
    var leads = response.data;
    var data = {leads}
    res.render('leadsTable',data);
  });  
});

app.get('/submit',function(req, res) {
  res.render('submitPage.html');
});

app.get('/:id', function(req, res) {
  var picId=req.params.id;
  
  const data = {
    "image": [
      {src: "Images/pic1.jpg", value:1, class:""},
      {src: "Images/pic2.jpg", value:2, class:""},
      {src: "Images/pic3.jpg", value:3, class:""},
      {src: "Images/pic4.jpg", value:4, class:""},
      {src: "Images/pic5.jpg", value:5, class:""},
      {src: "Images/pic6.jpg", value:6, class:""}
    ]
  }
  
  data["image"][picId-1].class="visible";
  res.render('landingPage',data);

});


app.get('/', function(req, res) {
  const data = {
    "image": [
      {src: "Images/pic1.jpg", value:1, class:"visible"},
      {src: "Images/pic2.jpg", value:2, class:""},
      {src: "Images/pic3.jpg", value:3, class:""},
      {src: "Images/pic4.jpg", value:4, class:""},
      {src: "Images/pic5.jpg", value:5, class:""},
      {src: "Images/pic6.jpg", value:6, class:""}
    ]
  }
  res.render('landingPage',data);
});


app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});