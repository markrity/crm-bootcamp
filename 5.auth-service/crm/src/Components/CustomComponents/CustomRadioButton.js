import React from 'react'
import CustomModal from '../CustomModals'
import Radio from '@material-ui/core/Radio';
import Avatar from '@material-ui/core/Avatar';


const CustomRadioButton = ({ uri, name, setRadio, selected, setIsGalaryVisible, index }) => {
    return (
        <div className="flex-col">
            <Avatar onClick={() => setIsGalaryVisible(true)} style={{ width: "150px", height: "150px", marginTop: "10px" }} src={uri} />
            <h3 className="centered">{name}</h3>
            <Radio checked={selected === index} onClick={() => setRadio(index)} name={name} value={name} />
        </div>
    )

}
export default CustomRadioButton