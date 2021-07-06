import React from "react";
import Header from '../../components/header'
 import Button from '../../components/button'
 import FormInput from'../../components/formInput'
import axios from 'axios';
import ErrorMessage from "../../components/errorMessage";
import form_fields from "../../input_fields/form_input.json"
import { connectToServerRegister } from '../../helpers/api_helpers';
import {errMessage} from '../../constans/constants.js'



class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {fields:{full_name:'', business_name:'', phone:'', email:'', password:''}, err:{email_validate:'',
      phone_validate:'', password_validate:'', name_validate:''},errormessage_exist:''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick = async ()  => {
    var token = this.props.props.match?.params.id 
    const params = { full_name: this.state.fields.full_name,
                    business_name: this.state.fields.business_name,
                    email: this.state.fields.email,
                    phone: this.state.fields.phone,
                    password: this.state.fields.password,
                    isNew: this.props.newUser,
                    token: token ? token : ''} 
    const response = await connectToServerRegister(params)
    switch(response.status) {
      //if there are invalid fields
      case 'invalid':
        Object.entries(response.valid).forEach(item => {
          if (!item[1]) {
            this.setState(prevState => {
              let err = Object.assign({}, prevState.err);  
              err[item[0]] = errMessage[item[0]];                              
              return { err };                                
            })
            }
        })
        break;
      case 'exist':
        this.setState({errormessage_exist:'This user already exist'})
        break
      }
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
