import React from "react";
import Button from './button'

import Modal from 'react-modal';
function ConfirmDelete(props) {




    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          width                 : '30%',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

    return (
        <Modal 
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
    >
        <Button className="close" button_text="X" onClick={props.closeModal} />
        <p>Are you sure? </p>
        <div className="buttons_delete">
        <Button className="button" button_text="delete" onClick={props.onclickConfirm} />
        <Button className="button" button_text="cancel" onClick={props.closeModal} />
        </div>
      </Modal>
    
    );
}

export default ConfirmDelete;