import React from 'react'
import { getHallsInformation } from '../../actions/buisness'
import CustomCard from '../CustomComponents/CustomCard/CustomCard'
const MyHalls = () => {

    // const [isAddVisible, setIsAddVisible] = useState(false)
    // const [deleteModalVisible, setDelModalVisible] = useState(false)
    // const [isEditVisible, setIsEditVisible] = useState(false)
    // const [userId, setUserId] = useState(0)
    // const [userFields, setUserFields] = useState({})
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getHallsInformation())
    // }, []);

    // const addEmployeeBtn = () => {
    //     return (
    //         <button id="change-padding-undo-margin-bottom" onClick={() => setIsAddVisible(true)}> Add Employee</button >
    //     )
    // }


    return (
        <div className="flex-row full-width spaced-evenly">
            <CustomCard />
            <CustomCard />
            <CustomCard />
        </div>
    )

}

export default MyHalls