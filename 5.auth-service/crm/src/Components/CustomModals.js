import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { FiXCircle } from "react-icons/fi";
const CustomModal = ({ isVisible, setIsVisible, body }) => {

    useEffect(() => Modal.setAppElement('body'), [])

    return (
        <div>
            <Modal id="modal"
                isOpen={isVisible}
                onRequestClose={() => setIsVisible(false)}>
                <FiXCircle size={40} id="ex-button" onClick={() => setIsVisible(false)} />
                <div className="centered">
                    {body}
                </div>
            </Modal>
        </div>
    )
}

export default CustomModal