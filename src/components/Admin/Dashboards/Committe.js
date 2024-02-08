import React, { useEffect, useState,useRef } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, ButtonToolbar } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Whisper } from "rsuite";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import {
  resetCommitte,
  updateCommitte,
  updateOpenPopup,
  updatePopupData,
} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";

export default function Committe() {
  const committe = useSelector((state) => state.Elite.committe);
  const dispatch = useDispatch();
  const [committeList, setCommitteList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      getCommitte();
    }
  }, []);
  const inputRef = useRef(null);
  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const getCommitte = async () => {
    const response = await getApi("committe/get");
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else {
      setCommitteList(response?.data);
    }
    closePopup();
  };
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
    dispatch(updateCommitte({ ...committe, name: event }));
  };
  const handleFormOrganization = (event) => {
    dispatch(updateCommitte({ ...committe, organization: event }));
  };
  const handleFormImage = async (e) => {
    dispatch(updateCommitte({ ...committe, image: e.target.files[0] }));
  };
  const handleFormRole = (event) => {
    dispatch(updateCommitte({ ...committe, role: event }));
  };

  const validateForm =
    committe.image && committe.name && committe.organization && committe.role;
  const cancelForm =
    committe.image || committe.name || committe.organization || committe.role;
  const handleUpdateValidation = () => {
    const tempCommitte = committeList.filter(
      (item) => item.id === committe?.id
    );
    return (
      tempCommitte[0]?.name !== committe?.name ||
      tempCommitte[0]?.image !== committe?.image ||
      tempCommitte[0]?.role !== committe?.role ||
      tempCommitte[0]?.organization !== committe?.organization
    );
  };
  const updateValidation = handleUpdateValidation();
  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append("image", committe.image);
    formData.append("name", committe.name);
    formData.append("organization", committe.organization);
    formData.append("role", committe.role);

    if (validateForm) {
      if (!edit) {
        const response = await postApi("committe/create", formData);
        if (response?.status === "Failed") {
          openPopup("error", "Network Error! Try again later.");
        } else if (response?.status_code === 200) {
          openPopup("success", "New data successfully created.");
        } else if (response?.status_code === 400) {
          openPopup("error", "New data creation Failed.");
        }
      } else {
        const response = await putApi(
          "committe/update/" + committe.id,
          formData
        );
        if (response?.status === "Failed") {
          openPopup("error", "Network Error! Try again later.");
        } else if (response?.status_code === 200) {
          openPopup("info", "Data successfully updated.");
        } else if (response?.status_code === 400) {
          openPopup("error", "Data updation Failed.");
        }
      }
      handleCancelProject();
      closePopup();
      resetFileInput()
      getCommitte();
    }
  };
  const handleRemoveProject = (item) => async () => {
    const response = await postApi("committe/delete/" + item.id);
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else if (response?.status_code === 200) {
      openPopup("info", "Data successfully deleted.");
    } else if (response?.status_code === 400) {
      openPopup("error", "Data deletion Failed.");
    }
    getCommitte();
    closePopup();
  };

  const handleEditProject = (item) => () => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    setEdit(true);
    dispatch(
      updateCommitte({
        ...committe,
        organization: item.organization,
        image: item.image,
        name: item.name,
        role: item.role,
        id: item.id,
      })
    );
    setEditImage(item.image);
  };

  const handleCancelProject = async () => {
    dispatch(resetCommitte());
    setEdit(false);
    resetFileInput()
  };

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="researchProjects-container">
      <div className="Form-div">
        <h5 className="Form-heading">SCIENTIFIC COMMITTEE</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Name:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter name"
                  name="name"
                  value={committe.name}
                  onChange={handleFormName}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
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
                    ref={inputRef}
                    onChange={handleFormImage}
                  />
                  {edit && editImage === committe.image ? (
                    <p
                      className="Form-textArea"
                      style={{ padding: "5px", color: "rgb(133, 133, 133)" }}
                    >
                      {committe.image}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Organization:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter organization"
                  name="organization"
                  value={committe.organization}
                  onChange={handleFormOrganization}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Role:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter role"
                  name="role"
                  value={committe.role}
                  onChange={handleFormRole}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}></Col>
              <Col xs={20} sm={20} md={15} lg={15} xl={15}>
                <ButtonToolbar className="confirmButton">
                  <Button
                    disabled={!cancelForm}
                    color="red"
                    id="cancel"
                    appearance="primary"
                    onClick={handleCancelProject}
                  >
                    Cancel
                  </Button>
                  {!edit ? (
                    <Button
                      disabled={!validateForm}
                      color="green"
                      id="addnew"
                      appearance="primary"
                      onClick={handleAddProject}
                    >
                      Add New
                    </Button>
                  ) : (
                    <Button
                      disabled={!(validateForm && updateValidation)}
                      color="green"
                      id="addnew"
                      appearance="primary"
                      onClick={handleAddProject}
                    >
                      Update
                    </Button>
                  )}
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>

      <div className="Display-FormDetails">
        <h5 className="Display-heading">ADDED SCIENTIFIC COMMITTEE DETAIL</h5>
        <Grid>
          <div className="Form-DisplayContainer">
            {committeList.map((item) => (
              <Col xs={24} sm={24} md={8} lg={8} xl={8} key={item}>
                <Card className="Form-DisplayCard-Teammember">
                  <CardContent>
                    <Avatar
                      alt=""
                      variant="square"
                      className="Form-DisplayCard-Tmember-img"
                      style={{
                        margin: "0 auto",
                        borderRadius: "10px",
                        marginBottom: "20px",
                      }}
                      src={`${baseUrl}${item.image}`}
                    />
                    <div>
                      <h6 className="Display-content-heading-member">
                        {item.name}
                      </h6>
                      <p className="Display-content-text-Smember">{item.role}</p>
                      <h6 className="Display-content-heading-Cmember">
                        {item.organization}
                      </h6>
                      {/* <CardActions
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            variant="text"
                            // href="#text-buttons"
                            color="yellow"
                            appearance="primary"
                            endIcon={<ArrowRightIcon />}
                          >
                            Read More
                          </Button>
                        </CardActions> */}
                    </div>
                    <div className="Display-content-edit-member">
                      <Whisper
                        placement="top"
                        speaker={<Tooltip> Delete!</Tooltip>}
                      >
                        <Button
                          variant="outlined"
                          id="delete"
                          style={{ color: "red" }}
                          startIcon={<DeleteIcon />}
                          onClick={handleRemoveProject(item)}
                        />
                      </Whisper>
                      <Whisper
                        placement="top"
                        speaker={<Tooltip> Edit!</Tooltip>}
                      >
                        <Button
                          id="edit"
                          color="blue"
                          variant="outlined"
                          style={{ color: "green" }}
                          startIcon={<BorderColorIcon />}
                          onClick={handleEditProject(item)}
                        />
                      </Whisper>
                    </div>
                  </CardContent>
                </Card>
              </Col>
            ))}
          </div>
        </Grid>
      </div>
    </div>
  );
}
