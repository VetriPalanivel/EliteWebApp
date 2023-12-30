import React,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Row, Col } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import eliteOffice from "../../asserts/OfficeWall.jpg";
import { Avatar } from "@mui/material";
import validator from "validator";
import { Input, InputGroup } from 'rsuite';
import KeyIcon from '@mui/icons-material/Key';
import { useDispatch, useSelector } from "react-redux";
import { resetLogin, updateAuthenticate, updateLogin, updateUser } from "../../redux/userReducer";
import { ADMIN_HOME } from "../../constants/route";
import { getApi, postApi } from "../../Services/service";

export default function Login() {
    const [visible, setVisible] = useState(false);
    const Authenticate = useSelector((state) => state.Elite.authenticate)
    const [message, setMessage] = useState(" ");
    const [loginValidation, setLoginValidation] = useState(" ");
    const login = useSelector((state) => state.Elite.login)
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const handleVisiblePassword = () => {
      setVisible(!visible);
      setTimeout(()=>{
        setVisible(visible);
      },500)
    }
    useEffect(()=>{
        if(login.email === ""){
            setMessage("")
        }
        setLoginValidation("");
    },[login])

    const handleRegister = () =>{
        if(Authenticate){
            dispatch(resetLogin())
            Navigate("/admin/register")
        }    
    }

    const handleEmail = (event) =>{
        dispatch(updateLogin({...login,"email" : event}));
        if (!validator.isEmail(event)) {
            setMessage("Please, enter a valid email!");
          } else {
            setMessage("");
          }
    }
    const handlePassword = (event) =>{
        dispatch(updateLogin({...login,"password" : event}));
    }
    const validation = validator.isEmail(login.email) && login.password;
    
    const handleLogin = async() =>{

        const response = await postApi('admin/login/'+login?.email+"/"+login?.password);
        console.log(response.data)
        if(response.status_code === 200){
        dispatch(updateUser(response.data[0]))
        dispatch(updateAuthenticate(true));
        Navigate(ADMIN_HOME)
        dispatch(resetLogin())
        }
        if(response.status_code === 400){
            setLoginValidation("Please, check the email and password!")
        }
        
    }

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
      <div className="Login-Form">
        <h4>Login Now</h4>
        <Grid className="Form-field-login">
          <Row style={{marginBottom:"15px"}}>
            <InputGroup inside>
              <InputGroup.Addon> @</InputGroup.Addon>
              <Input
                className="Form-input-login"
                size="sm"
                placeholder="E-mail"
                name="title"
                type="email"
                value={login.email}
                onChange={handleEmail}
                required
              />
            </InputGroup>
            <p style={{color:"red",display:"flex",justifyContent:"left"}}>{message}</p>
          </Row>
          <Row style={{marginBottom:"25px"}}>
            <InputGroup inside>
            <InputGroup.Addon> <KeyIcon fontSize="md" onClick={handleVisiblePassword} /></InputGroup.Addon>
              <Input
                className="Form-input-login"
                size="sm"
                placeholder="Password"
                name="title"
                type={visible ? "text" : "password"}
                value={login.password}
                onChange={handlePassword}
                required
              />
            </InputGroup>
          </Row>
          <Row style={{marginBottom:"20px"}}>
          <p style={{color:"orange"}}>{loginValidation}</p>
            <ButtonToolbar className="Register-button">
              <Button
                size="md"
                id="Register"
                color="orange"
                appearance="primary"
                type="error"
                disabled = {!validation}
                onClick={handleLogin}
              >
                Login
              </Button>
            </ButtonToolbar>
            </Row>
          <Row style={{marginBottom:"20px"}}>
            <p onClick={handleRegister}>
              Don't have an account? <span style={{marginLeft:"5px",fontSize:"16px",color:"#00008B",fontWeight:"bold",cursor:"pointer"}}> {Authenticate ? " Register" : "Contact Admin"} </span>
            </p>
          </Row>
          <Row style={{marginBottom:"20px"}}>
            <p style={{color:"skyblue"}}>
              @Elite Global excellance
            </p>
          </Row>
        </Grid>
      </div>
    </div>
  );
}
