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
    //console.log(this.props.newUser);
    this.state = {fields:{full_name:'', business_name:'', phone:'', email:'', password:''}, err:{email_validate:'',
      phone_validate:'', password_validate:'', name_validate:''},errormessage_exist:''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick = () => {
    var token = this.props.props.match?.params.id 
    //console.log(token);
    axios.post('http://kerenadiv.com:8005/register', {
      full_name: this.state.fields.full_name,
      business_name: this.state.fields.business_name,
      email: this.state.fields.email,
      phone: this.state.fields.phone,
      password: this.state.fields.password,
      isNew: this.props.newUser,
      token: token ? token : ''
      }).then(response => {

      switch(response.data.status) {

      //if there are invalid fields
      case 2 :
        var errMessage = {'name_validate': 'invalid name', 'email_validate': 'invalid email', 'phone_validate': 'invalid phone', 'password_validate': 'invalid password' }
        Object.entries(response.data.valid).forEach(item => {
          if (!item[1]) {
            this.setState(prevState => {
              let err = Object.assign({}, prevState.err);  
              err[item[0]] = errMessage[item[0]];                              
              return { err };                                
            })
            }
        })
        break;
        
      //fields are ok
      case 1:
        if (typeof(Storage) !== "undefined") {
        localStorage.setItem("my_user", response.data.accessToken);
        window.location.href = "http://localhost:3000/home";
        } else {
        console.log("Sorry, your browser does not support Web Storage...")
        }
       break

      //user already exist
      case 0:
        this.setState({errormessage_exist:'This user already exist'})
        break
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

  renderFields(isNew) {   
    let jsx_array1;
    isNew ? jsx_array1 = (form_fields.register_pageNew) :  jsx_array1 = (form_fields.register_page)
    let jsx_array = jsx_array1.map(field => { 
        return <div>
          <FormInput key = {field.key} label = {field.label} type = {field.type} className = {field.className} placeholder= {field.placeholder}  onChange={(e)=>this.handleChange(e,field.key, field.err)} /> 
          <ErrorMessage err = {this.state.err[field.err]}/>
        </div>
    })
    return jsx_array
  }

  render() {
    return (
      <div>
      <Header header_text = "Create your account"/>
      {this.props.newUser && this.renderFields(this.props.newUser)}
      {!this.props.newUser && this.renderFields(this.props.newUser)}
      <Button className="button" button_text="Sign Up" onClick={() => this.handleClick()} />
      {this.state.errormessage_exist}
      </div>
    );
  }
  }

  export default Register;
