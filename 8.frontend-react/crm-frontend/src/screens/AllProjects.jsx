import PageTitle from '../components/pageTitle/PageTitle';
import CrmButton from '../components/crmButton/CrmButton';
import React, {useState, useMemo, useEffect, useRef} from 'react';
import ReactDom from 'react-dom';
// import Form from '../components/Form';
import Form from '../components/form/Form';
import TabsTable from '../components/tabsTable/TabsTable';
import '../styles/actionModal.css';
import Modal from 'react-modal';
import '../styles/crmPage.css'
import '../styles/modal.scss';
// import '../styles/modalWindow.css';
import AuthApi from '../helpers/authApi';
import Search from '../components/search/Search';
import CrmApi from '../helpers/CrmApi';
import Header from '../components/header/Header';
import Table from '../components/table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash , faEdit, faDraftingCompass} from '@fortawesome/free-solid-svg-icons'


const authApi = new AuthApi();
const crmApi = new CrmApi();

function AllProjects(props){
    var isLoading = false;
    const [itemToDelete, setItemToDelete] = useState({});
    const [modalProjectDetails, setModalProjectDetails] = useState({});
    const [projectDetails, setProjectDetails] = useState({});
    const projectDetailsRef = useRef(projectDetails);
    projectDetailsRef.current = projectDetails;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const mineRef = useRef(props.mine);
    mineRef.current = props.mine;
    const dataRef = useRef(data);
    dataRef.current = data;


    const submit = async (dataToSent) => {
        const res = await authApi.newUser(dataToSent);
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
        let projects =   await crmApi.getAllProject(props.mine);
        if(projects){
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
      setFilteredData(result);
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

    const openAddProjectWindow = ()=>{
      setIsAddModalOpen(true);
    };

    const closeAddProjectWindow = ()=>{
        setIsAddModalOpen(false);
    };
    
    const openProjectWindow = ({original}) => {
        let tempFormDetails  = {...projectModal};
        tempFormDetails.text = original.description;
        tempFormDetails.title = original.item_type;
        setProjectDetails(original)
        console.log("details: ", projectDetails);
        setModalProjectDetails(tempFormDetails);
        setIsProjectModalOpen(true);
      };
  
      const closeProjectWindow = ()=>{
          setIsProjectModalOpen(false);
      };

    const submitAddProject = async (formFieldsData) => {
      // const res = await authApi.editOldUser({fields: formFieldsData, userId: itemToEdit.user_id});
      // console.log(res.valid);
      // if(res.valid){

      //   let newData = dataRef.current.map((item)=>{
      //     if(item.user_id == itemToEdit.user_id){
      //       item.user_name = formFieldsData.name.value;
      //       item.user_mail = formFieldsData.mail.value;
      //       item.user_phone = formFieldsData.phone.value;
      //     }
      //     return item;
      //   })
      //   console.log(newData);
        
      //   setData(newData);
      //   closeEditUserWindow();
      // } else {
      //   return res;
      // }
  };

    const addProjectForm = {
    submitHandle: submitAddProject,
      type: 'addProject',
      title: "Add New Project",
      errorMap: {
        'serverError': 'Try again later',
        'clientNotExist': 'Client not exist'
      },
      button: 'Add',
      buttonClass: 'main-button',
      fields: {
        type: {
          text: "Item Type",
          id: "type",
          type: 'text',
          error: false,
          mainType: 'name',
        },
        description: {
          text: "Description",
          id: "description",
          type: 'textarea',
          error: false,
          mainType: 'name',
        },
        deadline: {
          text: '2021-07-12',
          value: new Date().toISOString().substr(0, 10),
          label: "Deadline",
          id: "date",
          type: 'date',
          error: false,
          mainType: 'name',
        }, 
        // name: {
        //   text: "Client Full Name",
        //   id: "name",
        //   type: 'text',
        //   error: false,
        //   mainType: 'name'
        // },
        // mail: {
        //   text: "Client Mail",
        //   id: "mail",
        //   type: 'text',
        //   error: false,
        //   mainType: 'mail'
        // },
        // phone: {
        //   text: "Client Phone Number",
        //   id: "phone",
        //   type: 'text',
        //   error: false,
        //   mainType: 'phone'
        // },
      }
    }


    const submitUpdateProject = async (dataToSent) => {
        const res = await crmApi.updateProject({project_id: projectDetailsRef.current.project_id, set:{project_status:"'in progress'", estimated_time: dataToSent.hours.value}});
        // TODO error
    };

    const projectModal = {
        submitHandle: submitUpdateProject,
        type: 'project',
        title: '',
        text: '',
        errorMap: {
          'serverError': 'Try again later',
          'clientNotExist': 'Client not exist'
        },
        button: 'Assign To Me',
        buttonClass: 'main-button',
        fields: {
          hours: {
            text: "Estimated Time (hours)",
            id: "type",
            type: 'number',
            error: false,
            mainType: 'number',
          },
        }
      }

    const submitTab = (status) =>{
        if(status == 'all'){
            setFilteredData(dataRef.current);
            return
        }
        const filtered = dataRef.current.filter((item)=>{
            return item.project_status == status;
        })
        console.log(filtered);
        setFilteredData(filtered);
    }

    return (
        <div>
            <Header/>
            <div className='crm-page'>
            <PageTitle className='page-title' title={props.mine ? 'My Projects' : 'All Projects'} description='Manage your projects.'/>
            {!props.mine && <div className='add-user-box'>
            <CrmButton content='Add Project' buttonClass='main-button' icon='plus' isLoading={false} callback={()=> {openAddProjectWindow()}}/>
            </div>}
            <TabsTable submit={submitTab} clickRow={!props.mine ? openProjectWindow : ()=>{}} columns={columns} data={filteredData}/>
            <Modal isOpen={isDeleteModalOpen} ariaHideApp={false} contentLabel='Remove Project' onRequestClose={closeDeleteProjectWindow}  overlayClassName="Overlay" className='modal'>
                <h2>Are you sure you want delete this item?</h2>
                <div className='action-buttons-modal'>
                <CrmButton content='Delete' buttonClass='main-button' isLoading={isLoading} callback={()=> removeItem()}/>
                <CrmButton content='Cancel' buttonClass='secondary-button' isLoading={isLoading} callback={()=> closeDeleteProjectWindow()}/>
                </div>
            </Modal>
            {!props.mine && 
            <Modal isOpen={isAddModalOpen} ariaHideApp={false} contentLabel='Add Project' onRequestClose={closeAddProjectWindow}  overlayClassName="Overlay" className='modal'>
            <Form 
                    className='form-body'
                    {...addProjectForm}
                />
              <Search/>
            </Modal>}
            <Modal isOpen={isProjectModalOpen} ariaHideApp={false} contentLabel='Project' onRequestClose={closeProjectWindow}  overlayClassName="Overlay" className='modal'>
            <Form 
                    className='form-body'
                    {...modalProjectDetails}
                />
            </Modal>
            </div>
        </div>
    );
}

export default AllProjects;