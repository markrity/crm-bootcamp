import PageTitle from '../components/PageTitle';
import CrmButton from '../components/CrmButton';
import React, {useState} from 'react';
import ReactDom from 'react-dom';
import Form from '../components/Form';
import ModelWindow from '../components/ModalWindow';
import Modal from 'react-modal';
import '../styles/crmPage.css'
import '../styles/modalWindow.css';
import AuthApi from '../helpers/authApi';
import Header from '../components/Header';

const authApi = new AuthApi();

function Team(props){
    var isLoading = false;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const submit = async (data) => {
        const res = await authApi.newUser(data);
        console.log(res.valid);
        if(res.valid){
          console.log("valid!");
          setIsModalOpen(false);
        } else {
          return res;
        }
        console.log('add user');
    };

    const addUserForm = {
        submitFunc: submit,
        type: 'addUser',
        title: "Add user",
        errorMap: {
          'serverError': 'Try again later',
        },
        buttonTitle: 'Add',
        fields: {
          mail: {
            text: "Enter User Mail",
            id: "mail",
            error: false,
            mainType: 'mail'
          }
        }
      }

    const openAddUserWindow = ()=>{
        setIsModalOpen(true);
    };

    const closeAddUserWindow = ()=>{
        setIsModalOpen(false);
    };

    return (
        <div>
            <Header className/>
            <div className='crm-page'>
            <PageTitle className='page-title' title='Team' description='Here you can find and add bla bla ...'/>
            <CrmButton content='add user' isLoading={isLoading} callback={()=> openAddUserWindow()}/>
            {/* <ModelWindow/> */}
            <Modal isOpen={isModalOpen} contentLabel='Add User' onRequestClose={closeAddUserWindow} className='modal'>
                <Form 
                    className='form-body'
                    fields={addUserForm.fields} 
                    title={addUserForm.title}
                    type={addUserForm.type}
                    errorMap={addUserForm.errorMap}
                    button= {addUserForm.buttonTitle}
                    submitHandle={addUserForm.submitFunc} 
                />
            </Modal>
            </div>
        </div>
    );
}

export default Team;