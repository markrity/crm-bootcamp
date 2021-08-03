console.log('event.js start here!');

var doc = []
var flag = false;
var t0;
const notSend = ['ReactModal__Overlay ReactModal__Overlay--after-open', '', 'test_login']
let cameFrom = 'home'
let start = new Date().getTime();

window.addEventListener('click', function(e) {
    console.log(e);
    console.log(e.target.className);
    var class1 = e.target.className;
    console.log(e.target.innerHTML);
    var text = e.target.innerHTML
    var account_id = this.localStorage.getItem("account_id")
    var user_id = this.localStorage.getItem("user_id")

    if (class1 === 'bright') {
        var end = new Date().getTime();
        console.log(start);
        let dur = (end-start)/1000
        console.log((end-start)/1000);
        doc.push({page:cameFrom, duration:dur, account_id, user_id})
        cameFrom = e.target.innerHTML
        start = new Date().getTime();
    }

    // if (e.target.className === "add_button_tre") {
    //     console.log('hahahahahahahah');
    //     text = "add"
    // }

    var time = new Date();
  
    if (!(notSend.includes(e.target.className))) {
        doc.push({class:e.target.className, account_id, user_id, text, time})
    }
    else {
        console.log('in not send');
    }
});

  
setInterval(sendClickEvent, 5000);

async function sendClickEvent() {
    if (!(doc.length === 0)) {
         console.log('doc not empty');
         let res = await axios.post('http://localhost:9000/click', {doc});
         let data = res.data;
         console.log(data);
         doc =[]
    }
}



window.addEventListener('load', (event) => {
    console.log('hi2');
    sendLoadEvent();
});

async function sendLoadEvent() {
    let res = await axios.post('http://localhost:9000/load');
    let data = res.data;
    console.log(data);
}




