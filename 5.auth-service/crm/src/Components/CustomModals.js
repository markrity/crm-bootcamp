import React from 'react'
import Modal from 'react-modal';
import { FiXCircle } from "react-icons/fi";
import { inviteEmployeeFields } from "../scripts/formFields"
import AuthForm from './Auth/AuthForm';
const CustomModal = ({ isVisible, setIsVisible }) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '50%'
        }
    };

    return (
        <div>
            <Modal
                isOpen={isVisible}
                onRequestClose={() => setIsVisible(false)}
                style={customStyles}>
                <FiXCircle size={40} id="ex-button" onClick={() => setIsVisible(false)} />
                <div className="centered">
                    <AuthForm mode={"Invite Employee"} formFields={inviteEmployeeFields} />
                </div>
            </Modal>
        </div>
    )
}

export default CustomModal