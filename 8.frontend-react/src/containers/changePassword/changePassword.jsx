import React, { useState } from "react";
import Button from "../../components/button";
import FormInput from "../../components/formInput";
import { connectToServerChange} from '../../helpers/api_helpers';
import axios from "axios";

function ChangePassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [errorMessage, setMessage] = useState("");
  const [showChangeButton, setChangeButton] = useState(true);
  const [showLoginButton, setLoginButton] = useState(false);


  const handleClickPassword = async ()  => {
    if (password === confirmPassword) {
      console.log(props.match.params.id);
      const params = {mail: props.match.params.id, password: password}
      const response = await connectToServerChange(params)
      console.log(response);
      if(response) {
        setChangeButton(false);
        setLoginButton(true);
        setMessage("Your password has been reset!");
      }
      else {
        setMessage("This link is no longer available");
      }
    } 
    else {
      setMessage("no matching");
    }
  }

  function handleClickLogin() {
    window.location.href = "http://localhost:3000/login";
  }

  function handleChange(event) {
    setMessage("");
    setPassword(event.target.value);
  }

  function handleChangeConfirm(event) {
    setMessage("");
    setConfirm(event.target.value);
  }
  return (
    <body>
      <div className="test_login">
        <div className="controller">
          {errorMessage}
          <FormInput
            label_class="label"
            type="password"
            className="input"
            placeholder="Enter new password"
            onChange={handleChange}
          />
          <FormInput
            label_class="label"
            type="password"
            className="input"
            placeholder="Confirm new password"
            onChange={handleChangeConfirm}
          />
          {showChangeButton && (
            <Button
              className="button"
              button_text="Change password"
              onClick={handleClickPassword}
            />
          )}
          {showLoginButton && (
            <Button
              className="button"
              button_text="Back to login"
              onClick={handleClickLogin}
            />
          )}
        </div>
      </div>
    </body>
  );
}

export default ChangePassword;
