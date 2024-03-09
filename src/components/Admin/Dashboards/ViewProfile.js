import React, { useEffect, useState, useRef } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { InputGroup } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import { SelectPicker } from "rsuite";
import KeyIcon from "@mui/icons-material/Key";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import {
  updateOpenPopup,
  updatePopupData,
  updateUser,
} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";

export default function ViewProfile() {
  const User = useSelector((state) => state.Elite.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(" ");
  const [editImage, setEditImage] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const SelectOption = [
    {
      label: "Admin",
      value: "Admin",
    },
    {
      label: "User",
      value: "User",
    },
  ];

  const inputRef = useRef(null);
  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  useEffect(() => {
    if (User.email === "") {
      setMessage("");
    }
    setEditImage(User.image);
  }, [User]);

  const openPopup = (type, message) => {
    dispatch(updateOpenPopup(true));
    dispatch(
      updatePopupData({
        type: type,
        message: message,
      })
    );
  };

  const closePopup = () => {
    setTimeout(() => {
      dispatch(updateOpenPopup(false));
      dispatch(updatePopupData(""));
    }, 3500);
  };

  const handleFormName = (event) => {
    dispatch(updateUser({ ...User, name: event }));
  };
  const handleFormUserRole = (event) => {
    dispatch(updateUser({ ...User, role: event }));
  };

  const handleFormUserName = (event) => {
    dispatch(updateUser({ ...User, username: event }));
  };
  const handleFormPassword = (event) => {
    dispatch(updateUser({ ...User, password: event }));
  };
  const handleFormEmail = (event) => {
    dispatch(updateUser({ ...User, email: event }));
    if (!validator.isEmail(event)) {
      setMessage("Please, enter a valid email!");
    } else {
      setMessage("");
    }
  };

  const handleFormImage = async (e) => {
    dispatch(updateUser({ ...User, image: e.target.files[0] }));
  };

  const validateForm =
    User.image &&
    User.name &&
    validator.isEmail(User.email) &&
    User.password &&
    User.username &&
    User.role;

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("image", User.image);
    formData.append("name", User.name);
    formData.append("username", User.username);
    formData.append("password", User.password);
    formData.append("email", User.email);
    formData.append("role", User.role);

    const response = await putApi("profile/update/" + User.id, formData);
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else if (response?.status_code === 200) {
      openPopup("info", "Profile successfully updated.");
      dispatch(updateUser(response.data[0]));
    } else if (response?.status_code === 400) {
      openPopup("error", "Profile updation Failed.");
    }
    resetFileInput();
    closePopup();
  };

  const handleVisiblePassword = () => {
    setVisible(!visible);
    setTimeout(() => {
      setVisible(visible);
    }, 500);
  };

  return (
    <div className="ViewProfile-container">
      <div className="Form-div_ViewProfile">
        {/* <h5 className="Form-heading" style={{margin:"0 auto"}}>User Profile</h5> */}
        <Avatar
          alt=""
          variant="square"
          className="Form-DisplayCard-img"
          style={{
            margin: "0 auto",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
          src={`${baseUrl}${User?.image}`}
        />
        <div
          className="Form-container-profile"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <label class="Form-label">Name</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <InputGroup inside>
                  <Input
                    className="Form-input"
                    size="md"
                    name="name"
                    value={User.name}
                    onChange={handleFormName}
                    ref={inputRef}
                    required
                  />
                  <InputGroup.Addon>
                    {" "}
                    <DriveFileRenameOutlineIcon
                      style={{ color: "blue" }}
                      fontSize="md"
                    />
                  </InputGroup.Addon>
                </InputGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <label class="Form-label">User Name:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <InputGroup inside>
                  <Input
                    className="Form-input"
                    size="md"
                    name="user name"
                    value={User.username}
                    onChange={handleFormUserName}
                    required
                  />
                  <InputGroup.Addon>
                    {" "}
                    <DriveFileRenameOutlineIcon
                      style={{ color: "blue" }}
                      fontSize="md"
                    />
                  </InputGroup.Addon>
                </InputGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <label class="Form-label">Email:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <InputGroup inside>
                  <Input
                    className="Form-input"
                    size="md"
                    name="email"
                    value={User.email}
                    onChange={handleFormEmail}
                    required
                  />
                  <InputGroup.Addon>
                    {" "}
                    <DriveFileRenameOutlineIcon
                      style={{ color: "blue" }}
                      fontSize="md"
                    />
                  </InputGroup.Addon>
                </InputGroup>
                <p
                  style={{
                    color: "red",
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  {message}
                </p>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <label class="Form-label">Password:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <InputGroup inside>
                  <Input
                    className="Form-input"
                    size="md"
                    name="password"
                    type={visible ? "text" : "password"}
                    value={User.password}
                    onChange={handleFormPassword}
                    required
                  />
                  <InputGroup.Addon>
                    {" "}
                    <KeyIcon
                      style={{ color: "blue" }}
                      onClick={handleVisiblePassword}
                      fontSize="md"
                    />
                  </InputGroup.Addon>
                </InputGroup>
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <label class="Form-label">User Role:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <SelectPicker
                  className="Form-select"
                  size="md"
                  name="user role"
                  readOnly
                  value={User.role}
                  placeholder="Select the role"
                  data={SelectOption}
                  onChange={handleFormUserRole}
                  required
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <label class="Form-label">Image:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <div>
                  <input
                    className="Form-imageUpload"
                    name="image"
                    type="file"
                    style={{
                      background: "white",
                      height: "35px",
                      borderRadius: "6px",
                      padding: "5px",
                      color: "rgb(133, 133, 133)",
                    }}
                    required
                    onChange={handleFormImage}
                  />
                  {/* {(editImage === User.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{User.image}</p>:""} */}
                </div>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={7} lg={7} xl={7}></Col>
              <Col xs={20} sm={20} md={15} lg={15} xl={15}>
                <ButtonToolbar className="confirmButton">
                  <Button
                    disabled={!validateForm}
                    color="skyblue"
                    id="addnew"
                    appearance="primary"
                    onClick={handleUpdateProfile}
                  >
                    Save Profile
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}
