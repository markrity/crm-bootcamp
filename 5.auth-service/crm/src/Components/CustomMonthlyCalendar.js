import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import CustomModal from './Containers/CustomModal/CustomModals';
import AuthForm from './Auth/AuthForm';
import moment from 'moment'
import CustomRadioButton from './CustomComponents/CustomRadioButton';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-bnb-gallery/dist/style.css'
import ReactBnbGallery from 'react-bnb-gallery';
import { getHallsInformation } from '../actions/buisness'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useDispatch, useSelector } from 'react-redux';

const localizer = momentLocalizer(moment)

const gallery = [[
    {
        photo: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg",
        caption: "",
        thumbnail: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg"
    },
    {
        photo: "https://static.wixstatic.com/media/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg/v1/fill/w_1000,h_699,al_c,q_90,usm_0.66_1.00_0.01/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg",
        caption: "",
        thumbnail: "https://static.wixstatic.com/media/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg/v1/fill/w_1000,h_699,al_c,q_90,usm_0.66_1.00_0.01/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg"
    },
    {
        photo: "https://1hq6f244nzqssy4d8fp6y7re-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/one-king-west-2-810x540.jpg",
        caption: "",
        thumbnail: "https://1hq6f244nzqssy4d8fp6y7re-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/one-king-west-2-810x540.jpg"
    }
]];

const CustomMonthlyCalendar = () => {
    const { buisnessID, halls } = useSelector(state => state.buisness)
    const { isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHallsInformation(buisnessID))
    }, [])

    const [events, setEvents] = useState([
        {

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
                    {halls && halls.map((hall, index) => {
                        const mainImg = hall.urls.filter((img) => img.isMain === "1")
                        return (<CustomRadioButton selected={selectedHall}
                            index={index} setIsGalaryVisible={setIsGalaryVisible} setRadio={setSelectedHall}
                            key={index} name={hall.name}
                            uri={mainImg && mainImg.length === 1 ? `http://localhost:991/imgs/${mainImg[0].url}`
                                : "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg"} />)
                    })}
                </div>
                <button type="submit">Save Pick</button>
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
            <ReactBnbGallery
                show={isGalaryVisible}
                photos={gallery[0]}
                onClose={() => setIsGalaryVisible(false)} />
            <div>
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
            <CustomModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} body={pickHallModal()} />
        </div>
    );
};
export default CustomMonthlyCalendar