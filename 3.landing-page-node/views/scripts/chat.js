import axios from "../../../4.leads-api/node_modules/axios"

const onSend = (e) => {

    e.preventDefault()

    let msg = document.getElementById('message-input').value
    console.log(msg)
}