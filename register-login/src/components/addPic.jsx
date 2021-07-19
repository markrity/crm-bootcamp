import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ShowPic from './showPic';
class AddPic extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  selectedFile : null }
    }


  fileSelect = event => {
    this.setState({selectedFile: event.target.files[0]})
    console.log(event.target.files[0])
   
  }


  fileUpload = () => {
    const client_id = localStorage.getItem("client_id");
    const account_id = localStorage.getItem("account_id");
    const fd = new FormData();
  
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);

    axios.post('http://localhost:991/clients/savePic/', fd
    ).then(res=>
    {
    console.log(res);
    }
    );

    axios.post('http://localhost:991/picPerClient/add/', {
        account_id: account_id,
        client_id: client_id,
        picFileName: this.state.selectedFile.name

    }).then(res=>
    {
        this.props.updatePicArr(this.state.selectedFile.name);
        console.log(res);
    }
    );
  }


  render() {
    return (
  <div>
    <input  type="file" onChange = {this.fileSelect} />
  <button onClick = {this.fileUpload}>Upload</button>
  
  </div>


    );
  }
}

export default AddPic;