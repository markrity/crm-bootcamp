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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


const authApi = new AuthApi();

function Team(props){
    var isLoading = false;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);


    const submit = async (dataToSent) => {
        const res = await authApi.newUser(dataToSent);
        console.log(res.valid);
        if(res.valid){
          const newData = [...data];
          const userDetails = res.user;
          userDetails.status = 'pending';
          newData.push(res.user);
          setData(newData);
          setIsModalOpen(false);
        } else {
          return res;
        }
    };

    
    function tableParser(table){
      if(table){
        const parseResult = table.map(item => {
          const status =  !item.user_name ? 'pending' : 'active';
          return {
            ...item, 
            status: status
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
        // return result.usersList;

      
      }
   };
   
   
   useEffect(()=>{
     (async () => {
       console.log('execute get users');
      const result = await getUsersList();
      console.log(result);
      setData(result);
     })();
   }, [])
    
  
   const columns = React.useMemo(
    () => [
      {
        Header: 'Full Name',
        accessor: 'user_name', // accessor is the "key" in the data

      },
      {
        Header: 'Mail',
        accessor: 'user_mail',
        Cell: ({value})  => <a className='link-table' href={`mailto:${value}`}>{value}</a>
      },
      {
        Header: 'Phone',
        accessor: 'user_phone',
        Cell: ({value})  => <a className='link-table' href={`tel:${value}`}>{value}</a>
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({value})  => value == 'active' ? <FontAwesomeIcon className='status-icon' icon={faCheck} size='xs'/> : value
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
            <PageTitle className='page-title' title='Team' description='Manage your team.'/>
            {/* <CrmButton content='add user' class='secondary-button' icon='plus' isLoading={isLoading} callback={()=> openAddUserWindow()}/> */}
            <div className='add-user-box'>
            <CrmButton content='Add User' buttonClass='main-button' icon='plus' isLoading={isLoading} callback={()=> openAddUserWindow()}/>
            </div>
            <Table columns={columns} data={data}/>
            <Modal isOpen={isModalOpen} ariaHideApp={false} contentLabel='Add User' onRequestClose={closeAddUserWindow}  overlayClassName="Overlay" className='modal'>
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