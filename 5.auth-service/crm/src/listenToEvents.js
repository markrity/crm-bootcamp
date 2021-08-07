import axios from 'axios'

let events = []

export const listenToEvents = (window, user) => {

    window.addEventListener("click", (event) => {
        let date = new Date().toLocaleString("he-IL")
        let index = { _index: 'dom_events', _type: 'events' };
        events.push({ index });
        events.push({
            userid: user.id,
            id: event.target.id,
            type: event.type,
            class: event.target.className,
            time: date
        })
    });
}

setInterval(async () => {
    try {
        console.log(events)
        if (events.length !== 0) {
            const eventsCopy = [...events]
            const res = await axios.post("http://localhost:1111/api/v1/domEvents/",
                eventsCopy
                ,
                { withCredentials: true });
            console.log(res.data)
            events = []
        }
    } catch {
        console.log("Something went wrong")
    }

}, 5000);

