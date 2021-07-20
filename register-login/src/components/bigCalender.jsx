import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import  {useState, useEffect, useMemo} from "react";

const localizer = momentLocalizer(moment)

function MyCalendar (props) {
    const [allDates, setAllDates] = useState([]);

    const myEventsList = [
        { start: new Date(), end: new Date(), title: "special event" }
      ];

      useEffect(() => {
        var account_id = localStorage.getItem("account_id");
        axios.post('http://localhost:991/treatments/getTreatmentTable/', {
          account_id: account_id
            }).then(response => {
              setAllDates(response.data.clients);
              });
    }, []);

    const events = allDates.map(d => ({
        start: d.date_time, end: d.date_time, title: d.fullname + ", kind: " + d.kind 
    }))

    return (
  <div>
    <Calendar
      localizer={localizer}
      events={ events}  
      startAccessor="start"
      endAccessor="end"
      style={{ height: '80vh',  marginTop: '5vh'}}
    />
  </div>
    );
    }


    export default MyCalendar;