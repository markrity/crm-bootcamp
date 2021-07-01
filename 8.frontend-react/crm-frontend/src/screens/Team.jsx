import PageTitle from '../components/PageTitle';
import CrmButton from '../components/CrmButton';
import React, {useState, useMemo, useEffect} from 'react';
import ReactDom from 'react-dom';
import Form from '../components/Form';
import ModelWindow from '../components/ModalWindow';
import Modal from 'react-modal';
import '../styles/crmPage.css'
import '../styles/modalWindow.css';
import AuthApi from '../helpers/authApi';
import Header from '../components/Header';
import Table from '../components/Table';


const authApi = new AuthApi();

function Team(props){
    var isLoading = false;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);


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

    
    function tableParser(table){
      if(table){
        const parseResult = table.map(item => {
          return {
            userName: item.user_name,
            userMail: item.user_mail, 
            userPhone: item.user_phone
          }
        });
        return parseResult;
      }
      return null;
    }

    const getUsersList = async () => {
      const result = await authApi.getUsers();
      if(result && result.valid){
         return tableParser(result.usersList);
      }
   };
   
   
   useEffect(()=>{
     (async () => {
      const result = await getUsersList();
      setData(result);
     })();
   }, [])
    
   const columns = React.useMemo(
    () => [
      {
        Header: 'Full Name',
        accessor: 'fullName', // accessor is the "key" in the data
      },
      {
        Header: 'Mail',
        accessor: 'mail',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
    ],
    []
  )
    const addUserForm = {
        submitFunc: submit,
        type: 'addUser',
        title: "Add user",
        errorMap: {
          'serverError': 'Try again later',
        },
        buttonTitle: 'Add',
        buttonClass: 'main-button',
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
            <Header/>
            <div className='crm-page'>
            <PageTitle className='page-title' title='Team' description='Here you can find and add bla bla ...'/>
            {/* <CrmButton content='add user' class='secondary-button' icon='plus' isLoading={isLoading} callback={()=> openAddUserWindow()}/> */}
            <CrmButton content='Add User' buttonClass='main-button' icon='plus' isLoading={isLoading} callback={()=> openAddUserWindow()}/>
            {/* <Table columns={columns} data={data}/> */}
            <Modal isOpen={isModalOpen} contentLabel='Add User' onRequestClose={closeAddUserWindow} className='modal'>
                <Form 
                    className='form-body'
                    fields={addUserForm.fields} 
                    title={addUserForm.title}
                    type={addUserForm.type}
                    errorMap={addUserForm.errorMap}
                    button= {addUserForm.buttonTitle}
                    buttonClass={addUserForm.buttonClass}
                    submitHandle={addUserForm.submitFunc} 
                />
            </Modal>
            </div>
        </div>
    );
}

export default Team;