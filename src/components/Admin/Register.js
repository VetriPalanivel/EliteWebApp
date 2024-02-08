import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Row, Col } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import eliteOffice from "../../asserts/OfficeWall.jpg";
import { Avatar } from "@mui/material";
import { Input, InputGroup } from "rsuite";
import validator from "validator";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import { useDispatch, useSelector } from "react-redux";
import { resetRegister, updateAuthenticate, updateRegister } from "../../redux/userReducer";
import { ADMIN_HOME } from "../../constants/route";
import { postApi } from "../../Services/service";

export default function Register() {
  const [visible, setVisible] = useState(false);
  const register = useSelector((state) => state.Elite.register);
  const Navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const dispatch = useDispatch();

  const handleVisiblePassword = () => {
    setVisible(!visible);
    setTimeout(() => {
      setVisible(visible);
    }, 500);
  };

  useEffect(() => {
    if (register.email === "") {
      setMessage("");
    }
    setPasswordValidation("");
  }, [register]);

  const handleEmail = (event) => {
    dispatch(updateRegister({ ...register, email: event }));
    if (!validator.isEmail(event)) {
      setMessage("Please, enter a valid email!");
    } else {
      setMessage("");
    }
  };
  const handlePassword = (event) => {
    dispatch(updateRegister({ ...register, password: event }));
  };
  const handleConfirmPassword = (event) => {
    dispatch(updateRegister({ ...register, confirmPassword: event }));
  };
  const handleUsername = (event) => {
    dispatch(updateRegister({ ...register, username: event }));
  };
  const validation =
    validator.isEmail(register.email) &&
    register.password &&
    register.username &&
    register.confirmPassword;

  const handleLogin = () => {
    dispatch(resetRegister());
    Navigate("/admin/login");
  };

  const handleRegister = async () => {
    if(register.confirmPassword === register.password){
      const response = await postApi(
        "admin/register",register);
      console.log(response.data);
      if (response.status_code === 200) {
        dispatch(updateAuthenticate(true));
        Navigate(ADMIN_HOME);
        dispatch(resetRegister());
      }
      if(response.status_code === 400){
        setPasswordValidation("User alredy exhist, Please Login")
      }
    }
    else{
      setPasswordValidation("Password not match!")
    }
   
  };

  return (
    <div className="Register" style={{ display: "flex" }}>
      <div className="Register-r1">
        <Avatar
          alt=""
          variant="square"
          className="Register-image"
          src={eliteOffice}
        />
      </div>
      <div className="Register-Form">
        <h4>Register Now</h4>
        <Grid className="Form-field-login">
          <Row style={{ marginBottom: "15px" }}>
            <InputGroup inside>
              <InputGroup.Addon>
                <AvatarIcon />
              </InputGroup.Addon>
              <Input
                className="Form-input-login"
                size="sm"
                placeholder="Username"
                name="username"
                value={register.username}
                onChange={handleUsername}
                required
              />
            </InputGroup>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <InputGroup inside>
              <InputGroup.Addon> @</InputGroup.Addon>
              <Input
                className="Form-input-login"
                size="sm"
                placeholder="E-mail"
                name="title"
                type="email"
                value={register.email}
                onChange={handleEmail}
                required
              />
            </InputGroup>
            <p style={{color:"red",display:"flex",justifyContent:"left",padding:"2px 0px 0px 30px"}}>{message}</p>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <InputGroup inside>
              <InputGroup.Addon>
                {" "}
                <KeyIcon fontSize="md" />
              </InputGroup.Addon>
              <Input
                className="Form-input-login"
                size="sm"
                placeholder="Password"
                name="title"
                type="text"
                value={register.password}
                onChange={handlePassword}
                required
              />
            </InputGroup>
          </Row>
          <Row style={{ marginBottom: "25px" }}>
            <InputGroup inside>
              <InputGroup.Addon>
                {" "}
                <KeyOffIcon fontSize="md" onClick={handleVisiblePassword} />
              </InputGroup.Addon>
              <Input
                className="Form-input-login"
                size="sm"
                placeholder="Confirm Password"
                name="title"
                type={visible ? "text" : "password"}
                value={register.confirmPassword}
                onChange={handleConfirmPassword}
                required
              />
            </InputGroup>
            <p style={{marginTop:"10px", color: "orange" }}>{passwordValidation}</p>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <ButtonToolbar className="Register-button">
              <Button
                size="md"
                id="Register"
                color="orange"
                appearance="primary"
                type="error"
                disabled={!validation}
                onClick={handleRegister}
              >
                Register
              </Button>
            </ButtonToolbar>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <p onClick={handleLogin}>
              Already have an account?{" "}
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "16px",
                  color: "#00008B",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {" "}
                Login{" "}
              </span>
            </p>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <p style={{ color: "skyblue" }}>@Elite Global excellance</p>
          </Row>
        </Grid>
      </div>
    </div>
  );
}
