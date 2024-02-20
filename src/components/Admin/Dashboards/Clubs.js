import React, { useEffect, useState,useRef } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import { Avatar } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import {
  resetClub,
  updateClub,
  updateOpenPopup,
  updatePopupData,
} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";

export default function Clubs() {
  const club = useSelector((state) => state.Elite.club);
  const dispatch = useDispatch();
  const [clubList, setClubList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      getClubs();
    }
  }, []);

  const inputRef = useRef(null);
  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const getClubs = async () => {
    const response = await getApi("clubs_societies/get");
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else {
      setClubList(response?.data);
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

  const handleFormTitle = (event) => {
    dispatch(updateClub({ ...club, title: event }));
  };
  const handleFormDescription = (event) => {
    dispatch(updateClub({ ...club, description: event }));
  };
  const handleFormLink = (event) => {
    dispatch(updateClub({ ...club, link: event }));
  };

  const handleFormImage = async (e) => {
    dispatch(updateClub({ ...club, image: e.target.files[0] }));
  };

  const validateForm =
    club.image && club.title && club.description && club.link;
  const cancelForm = club.image || club.title || club.description || club.link;

  const handleUpdateValidation = () => {
    const tempClub = clubList.filter((item) => item.id === club?.id);
    return (
      tempClub[0]?.title !== club?.title ||
      tempClub[0]?.image !== club?.image ||
      tempClub[0]?.link !== club?.link ||
      tempClub[0]?.description !== club?.description
    );
  };
  const updateValidation = handleUpdateValidation();

  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append("image", club.image);
    formData.append("title", club.title);
    formData.append("description", club.description);
    formData.append("link", club.link);

    if (validateForm) {
      if (!edit) {
        const response = await postApi("clubs_societies/create", formData);
        if (response?.status === "Failed") {
          openPopup("error", "Network Error! Try again later.");
        } else if (response?.status_code === 200) {
          openPopup("success", "New data successfully created.");
        } else if (response?.status_code === 400) {
          openPopup("error", "New data creation Failed.");
        }
      } else {
        const response = await putApi(
          "clubs_societies/update/" + club.id,
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
      getClubs();
    }
  };
  const handleRemoveProject = (item) => async () => {
    const response = await postApi("clubs_societies/delete/" + item.id);
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else if (response?.status_code === 200) {
      openPopup("info", "Data successfully deleted.");
    } else if (response?.status_code === 400) {
      openPopup("error", "Data deletion Failed.");
    }
    getClubs();
    closePopup();
  };

  const handleEditProject = (item) => () => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    setEdit(true);
    dispatch(
      updateClub({
        ...club,
        description: item.description,
        image: item.image,
        title: item.title,
        link: item.link,
        id: item.id,
      })
    );
    setEditImage(item.image);
  };

  const handleCancelProject = async () => {
    dispatch(resetClub());
    resetFileInput()
    setEdit(false);
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
        <h5 className="Form-heading">CLUBS AND SOCIETIES</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">University/Organization:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter University/Organization name"
                  name="title"
                  value={club.title}
                  onChange={handleFormTitle}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Organization chart:</label>
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
                  {edit && editImage === club.image ? (
                    <p
                      className="Form-textArea"
                      style={{ padding: "5px", color: "rgb(133, 133, 133)" }}
                    >
                      {club.image}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Description:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  rows={2}
                  name="description"
                  value={club.description}
                  placeholder="Enter description"
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Link:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter link"
                  name="fee"
                  value={club.link}
                  onChange={handleFormLink}
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
        <h5 className="Display-heading">ADDED CLUBS AND SOCIETY DETAIL</h5>
        <div className="Form-DisplayContainer">
          {clubList.map((item) => (
            <Card className="Form-DisplayCard">
              <CardContent>
                <Grid>
                  <Row>
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                      <Avatar
                        alt=""
                        variant="square"
                        className="Form-DisplayCard-img"
                        style={{}}
                        src={`${baseUrl}${item.image}`}
                      />
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={18}
                      lg={18}
                      xl={18}
                      className="Display-content"
                    >
                      <div >
                        <h6 className="Display-content-heading">
                          {item.title}
                        </h6>
                        <p className="Display-content-text">
                          {truncateText(item.description, 60)}
                        </p>
                        <CardActions
                          style={{ display: "flex", justifyContent: "end" }}
                        >
                          <Button
                            className="Display-content-view"
                            variant="text"
                            href="#text-buttons"
                          >
                            Click here to view more
                          </Button>
                        </CardActions>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                      <div className="Display-content-edit">
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
                    </Col>
                  </Row>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
