
function getLeads(orderType=null, searchVal=null){
    
    axios.get('http://rgb.com:8004/leads', {
        params: {
            order: orderType,
            search: searchVal
        }
    })
    .then(function (response) {
        console.log(response.data);
        if(orderType){
            insertLeads(response.data.leads);
        } else {
            insertLeads(response.data.leads);
        }
        
    })
    .catch(function (error) {
        console.log(error);
    });
}



function insertLeads(leads){
    var table = document.getElementById("leads_table");
    console.log("!!!!!!!!!!!!!" + table.children.length);
    while (table.children.length > 1) {
        table.removeChild(table.lastChild);
    }
    // table.innerHTML = "";
    for(let l of leads){
        createRow(l);
    }
}

function createRow(lead){
    var newTr = document.createElement('tr');
    newTr.classList.add('card');
    for(let field in lead){
        var newTd = document.createElement('td');
        // newTd.innerText = lead[field];
        if(field == "user_mail"){
            var newLink = document.createElement('a');
            newLink.setAttribute('href', 'mailto:' + lead[field]);
            newLink.innerText = lead[field];
            newTd.appendChild(newLink);
        } else if(field == "user_phone") {
            var newLink = document.createElement('a');
            newLink.setAttribute('href', 'tel:' + lead[field])
            newLink.innerText = lead[field];
            newTd.appendChild(newLink);
        } else {
            newTd.innerText = lead[field];
        }
        newTr.appendChild(newTd);
    }
    var table = document.getElementById("leads_table");
    table.appendChild(newTr);
}

function changeOrder(ele){
    getLeads(ele.value);
}

        
function searchLeads(){
    const form = document.querySelector('#search');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const text = form.elements.search_field.value;
        getLeads(null, text);
    });
}

searchLeads();

getLeads();