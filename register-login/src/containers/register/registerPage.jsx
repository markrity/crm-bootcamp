import React from "react";
import Header from '../../components/header'
 import Button from '../../components/button'
 import FormInput from'../../components/formInput'
import axios from 'axios';
import ErrorMessage from "../../components/errorMessage";
import form_fields from "../../helpers/form_input.json"


class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {fields:{full_name:'', business_name:'', phone:'', email:'', password:''}, err:{email_validate:'',
      phone_validate:'', password_validate:'', name_validate:''},errormessage_exist:''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick = () => {
    axios.post('http://kerenadiv.com:8005/register', {
      full_name: this.state.fields.full_name,
      business_name: this.state.fields.business_name,
      email: this.state.fields.email,
      phone: this.state.fields.phone,
      password: this.state.fields.password
      }).then(response => {

      //if there are invalid fields
      if (response.data.status===2) {
        var errMessage = {'name_validate': 'invalid name', 'email_validate': 'invalid email', 'phone_validate': 'invalid phone', 'password_validate': 'invalid password' }
        Object.entries(response.data.valid).forEach(item => {
          console.log(item[0]);
          if (!item[1]) {
            this.setState(prevState => {
              let err = Object.assign({}, prevState.err);  
              err[item[0]] = errMessage[item[0]];                              
              return { err };                                
            })
            }
        })
        }

      //fields are ok
      if(response.data.status===1) {
        console.log('netttt');
        if (typeof(Storage) !== "undefined") {
        localStorage.setItem("my_user", response.data.accessToken);
        
        console.log(localStorage.getItem("my_user"));
        window.location.href = "http://localhost:3000/home";
        } else {
        console.log("Sorry, your browser does not support Web Storage...")
        }
      }

      //user already exist
      if(response.data.status===0){
        this.setState({errormessage_exist:'This email already exist'})
      }
      })
  }

  handleChange(event, key, errMessage) {
    this.setState(prevState => {
      let fields = Object.assign({}, prevState.fields);  
      fields[key] = event.target.value;                              
      return { fields };                                
    })

    //remove error message
    this.setState(prevState => {
      let err = Object.assign({}, prevState.err);  
      err[errMessage] = '';                              
      return { err };                                
    })    
  }

  renderFields() {   
    let jsx_array = (form_fields.register_page).map(field => { 
        return <div>
          <FormInput key={field.key}  label = {field.label} type = {field.type} className = {field.className} placeholder= {field.placeholder}  onChange={(e)=>this.handleChange(e,field.key, field.err)} /> 
          <ErrorMessage err = {this.state.err[field.err]}/>
        </div>
    })
    return jsx_array
  }

  render() {
    return (
      <div>
      <Header header_text = "Create your account"/>
      {this.renderFields()}
      <Button className="button" button_text="Get started free" onClick={() => this.handleClick()} />
      </div>
    );
  }
  }

  export default Register;
