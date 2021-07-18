import React, { useEffect } from 'react'
import Modal from 'react-modal';

import ExButton from '../../Decorations/ExButton/ExButton';
const CustomModal = ({ isVisible, setIsVisible, body }) => {

    useEffect(() => Modal.setAppElement('body'), [])


    return (
        <Modal id="modal"
            style={{ overlay: { position: 'absolute' }, content: { backgroundColor: 'white' } }}
            isOpen={isVisible}
            onRequestClose={() => setIsVisible(false)}>
            <ExButton onClickFunc={() => setIsVisible(false)} isVisible={true} />
            <div className="centered">
                {body}
            </div>
        </Modal>
    )
}

export default CustomModal