import React, { useEffect, useState } from 'react'
import AuthForm from '../Auth/AuthForm'
import CustomModal from '../Containers/CustomModal/CustomModals'
import { useDispatch, useSelector } from 'react-redux'
import { getHallsInformation } from '../../actions/buisness'
import { editHallFields } from '../../scripts/formFields'
import CustomCard from '../CustomComponents/CustomCard/CustomCard'
const MyHalls = () => {

    // const [isAddVisible, setIsAddVisible] = useState(false)
    // const [deleteModalVisible, setDelModalVisible] = useState(false)
    const [isAddModal, setIsAddModal] = useState(false)
    // const [userId, setUserId] = useState(0)
    // const [userFields, setUserFields] = useState({})
    const dispatch = useDispatch()
    const { buisnessID, halls } = useSelector(state => state.buisness)
    useEffect(() => {
        dispatch(getHallsInformation(buisnessID))
    }, []);

    const addHallModal = () => <AuthForm mode='Add Hall'
        closeModal={() => setIsAddModal(false)} formFields={editHallFields} />
    // const addEmployeeBtn = () => {
    //     return (
    //         <button id="change-padding-undo-margin-bottom" onClick={() => setIsAddVisible(true)}> Add Employee</button >
    //     )
    // }

    return (

        <div className="flex-row full-width spaced-evenly">
            <CustomModal isVisible={isAddModal} setIsVisible={() => setIsAddModal(false)} body={addHallModal()} />
            {halls && halls.map((hall, index) => <CustomCard key={index} hall={hall} />)}
            {halls && halls.length < 3 && <button onClick={() => setIsAddModal(true)}>Add Hall</button>}
        </div>
    )
}

export default MyHalls