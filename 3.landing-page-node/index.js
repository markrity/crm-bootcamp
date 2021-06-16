const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
app.use(express.static('views'));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views'); //For calling from location down.

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

app.get('/', function(req, res) {

  var params = req.query;
  const data = {
    logo: "Gradiz",
    circles: createCircles(10),
    navigation: [ 
      makeNav("Home"), 
      makeNav("About Us"), 
      makeNav("Gallery"), 
      makeNav("Contact"), 
    ],
    maintitle:[ {text: "Professional Graphic"} ,{text:"Design Service"}],
    subtitle: "Design anything you need",
    form: {
      details: {
        name: params.name ? "We got your details, " + params.name + "!" : ""
      },
      title: "Leave your details and we'll get back to you!",
      inputs: [
        // makeInput("text", "name", "Full Name", "error-name"),
        // makeInput("email", "mail", "Mail", "error-mail"),
        // makeInput("tel", "phone", "Phone", "error-phone")
        makeInput("text", "name", "Full Name", "error-name"),
        makeInput("text", "mail", "Mail", "error-mail"),
        makeInput("text", "phone", "Phone", "error-phone")
      ],
      button: {
        text: "Send Details",
        type: "submit"
      },
    },
    footer: {
      title: 'Why choose Gradiz?',
      answers: [
        makeAnswer([{part:"Best"}, {part: "Prices"}], '' ,"$$$"),
        makeAnswer([{part:"Express"} ,{part:"Service"}], img_src="assets/fast_clock_orange.png"),
        makeAnswer([{part:"Expert"} ,{part:"Designers"}], img_src="assets/expert.png")
      ]
    }
  }

  res.render('landing-page', data);
});

function createCircles(num){
  let circlesArray = []
  for (let i = 0; i < num; i++){
      circlesArray.push("");
  }
  return circlesArray;
}

function makeInput(type_value, id_value, placeholder_value, error_id_value){
  return {
    type: type_value,
    id: id_value,
    placeholder: placeholder_value,
    error_id: error_id_value,
  }
}

function makeNav(title_value, url="#"){
  return {
    title: title_value, 
    link: url
  }
}


function makeAnswer(title_val, img_src='', text_val=''){
  return {
    title: title_val,
    img: img_src,
    text: text_val
  }
}
