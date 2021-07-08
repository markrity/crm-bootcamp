import PageTitle from '../components/pageTitle/PageTitle';
import CrmButton from '../components/crmButton/CrmButton';
import React, {useState, useMemo, useEffect, useRef} from 'react';
import ReactDom from 'react-dom';
// import Form from '../components/Form';
import Form from '../components/form/Form';
import '../styles/actionModal.css';
import Modal from 'react-modal';
import '../styles/crmPage.css'
import '../styles/modal.scss';
// import '../styles/modalWindow.css';
import AuthApi from '../helpers/authApi';
import CrmApi from '../helpers/CrmApi';
import Header from '../components/header/Header';
import Table from '../components/table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash , faEdit} from '@fortawesome/free-solid-svg-icons'


const authApi = new AuthApi();
const crmApi = new CrmApi();

function AllProjects(props){
    var isLoading = false;
    const [itemToDelete, setItemToDelete] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const mineRef = useRef(props.mine);
    mineRef.current = props.mine;
    const dataRef = useRef(data);
    dataRef.current = data;


    const submit = async (dataToSent) => {
        const res = await authApi.newUser(dataToSent);
        console.log(res.valid);
        if(res.valid){
          const newData = [...data];
          const userDetails = res.user;
          userDetails.status = 'pending';
          newData.unshift(res.user);
          setData(newData);
          setIsModalOpen(false);
        } else {
          return res;
        }
    };


    const getProjectsList = async () => {
      const clients = await crmApi.getAllClients();
        console.log("clients: ",clients);
        let projects =   await crmApi.getAllProject(props.mine);
        if(projects){
            projects = projects.data;
            return projects;
        }
   };
   
   const parseDate = (date) => {
        return date.split(' ')[0].split('-').reverse().join('/');
   }
   
   const onRemoveItem = (value) => {
     setItemToDelete(value);
     openDeleteProjectWindow();
   }
   
   const removeItem = () => {
    // authApi.deleteUser(itemToDelete);
    // console.log("item to delete", itemToDelete);
    // let newData = dataRef.current.filter((item)=>{
    //   console.log(itemToDelete.project_id,"is equal?", item.user_id);
    //   return itemToDelete.user_id != item.user_id;
    // })
    // closeDeleteProjectWindow();
    // setData(newData);
   }
   
   useEffect(()=>{
     (async () => {
      const result = await getProjectsList();
      setData(result);
     })();
   }, [props.mine])
    
  
   const columns = React.useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'item_type', // accessor is the "key" in the data

      },
      {
        Header: 'Client',
        accessor: 'client_name',
      },
      {
        Header: 'Date',
        accessor: 'created',
        Cell: ({value}) => {
            return parseDate(value);
        }
      },
      {
        Header: 'Deadline',
        accessor: 'deadline',
        Cell: ({value}) => {
            return parseDate(value);
        }
      },
      {
        Header: 'Status',
        accessor: 'project_status',
        Cell: ({value}) => {
            console.log(props.mine);
            return mineRef.current ? "in progress" : value;
        }
        // Cell: ({value})  => value == 'active' ? <FontAwesomeIcon className='status-icon' icon={faCheck} size='xs'/> : value
      },
      {
        Header: 'Action',
        // accessor: 'delete',
        Cell: (value)=> (
          <div>
            <span style={{cursor:'pointer'}}
                onClick={() => {
                  // console.log(value);
                    onRemoveItem(value.cell.row.original);
                  }}>
                  <FontAwesomeIcon className='trash-icon' icon={faTrash} size='sm'/>
          </span> 
          </div>
          
        )
      },

    ],
    []
  )


    const openDeleteProjectWindow = ()=>{
      setIsDeleteModalOpen(true);
    };

    const closeDeleteProjectWindow = ()=>{
        setIsDeleteModalOpen(false);
    };

    

    return (
        <div>
            <Header/>
            <div className='crm-page'>
            <PageTitle className='page-title' title='All Projects' description='Manage your projects.'/>
            <div className='add-user-box'>
            <CrmButton content='Add Project' buttonClass='main-button' icon='plus' isLoading={false} callback={()=> {}}/>
            </div>
            <Table columns={columns} data={data}/>
            <Modal isOpen={isDeleteModalOpen} ariaHideApp={false} contentLabel='Remove Project' onRequestClose={closeDeleteProjectWindow}  overlayClassName="Overlay" className='modal'>
                <h2>Are you sure you want delete this item?</h2>
                <div className='action-buttons-modal'>
                <CrmButton content='Delete' buttonClass='main-button' isLoading={isLoading} callback={()=> removeItem()}/>
                <CrmButton content='Cancel' buttonClass='secondary-button' isLoading={isLoading} callback={()=> closeDeleteProjectWindow()}/>
                </div>
            </Modal>
            </div>
        </div>
    );
}

export default AllProjects;