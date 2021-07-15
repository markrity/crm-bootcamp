import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import CustomModal from './CustomModals';
import AuthForm from './Auth/AuthForm';
import moment from 'moment'
import CustomRadioButton from './CustomComponents/CustomRadioButton';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-bnb-gallery/dist/style.css'
import ReactBnbGallery from 'react-bnb-gallery';
import { getHalls } from '../actions/buisness'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useDispatch, useSelector } from 'react-redux';

const localizer = momentLocalizer(moment)


const gallery = [[
    {
        photo: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg",
        caption: "Viñales, Pinar del Río, Cuba",
        thumbnail: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg"
    },
    {
        photo: "https://static.wixstatic.com/media/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg/v1/fill/w_1000,h_699,al_c,q_90,usm_0.66_1.00_0.01/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg",
        caption: "La Habana, Cuba",
        subcaption: "Photo by Gerardo Sanchez on Unsplash",
        thumbnail: "https://static.wixstatic.com/media/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg/v1/fill/w_1000,h_699,al_c,q_90,usm_0.66_1.00_0.01/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg"
    },
    {
        photo: "https://1hq6f244nzqssy4d8fp6y7re-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/one-king-west-2-810x540.jpg",
        caption: "Woman smoking a tobacco",
        subcaption: "Photo by Hannah Cauhepe on Unsplash",
        thumbnail: "https://1hq6f244nzqssy4d8fp6y7re-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/one-king-west-2-810x540.jpg"
    }
]];

const CustomMonthlyCalendar = () => {
    const { buisnessID, halls } = useSelector(state => state.buisness)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHalls(buisnessID))
    }, [])

    const [photos, setPhotos] = useState(gallery)

    const [events, setEvents] = useState([
        {
            start: moment().toDate(),
            end: moment().add(1, "days").toDate(),
            title: "Some title",
        },
    ])

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isGalaryVisible, setIsGalaryVisible] = useState(false)
    const [selectedHall, setSelectedHall] = useState(0)
    const pickHallModal = () => {
        return (
            <div className="flex-col full-width">
                <h2 className="centered">Choose An Hall For The Wedding</h2>
                <div className="flex-row spaced-between full-width">
                    {halls && halls.map((hall, index) => <CustomRadioButton selected={selectedHall} index={index} setIsGalaryVisible={setIsGalaryVisible} setRadio={setSelectedHall} key={index} name={hall.Name} uri={"https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg"} />)}
                </div>
            </div>
        )
    }

    const onEventResize = (data) => {
        console.log(data)
        const { start, end } = data;
        // setEvents(events.map((event) => event))
        // this.setState((state) => {
        //     state.events[0].start = start;
        //     state.events[0].end = end;
        //     return { events: [...state.events] };
        // });
    };

    const onDrillDown = (data) => {
        setIsModalVisible(true)
    }


    const DnDCalendar = withDragAndDrop(Calendar);
    return (
        <div >
            <CustomModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} body={pickHallModal()} />
            <ReactBnbGallery
                show={isGalaryVisible}
                photos={gallery[0]}
                onClose={() => setIsGalaryVisible(false)} />
            <DnDCalendar
                views={['month']}
                localizer={localizer}
                events={events}
                onEventDrop={(data) => onEventResize(data)}
                onDrillDown={(data) => onDrillDown(data)}
                onKeyPressEvent={(data) => console.log(data)}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 480, zIndex: 0 }} />
        </div>
    );
};
export default CustomMonthlyCalendar