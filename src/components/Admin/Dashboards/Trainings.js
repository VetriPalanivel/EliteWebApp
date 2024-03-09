import React, { useEffect, useState, useRef } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import { DatePicker, Stack } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from "rsuite";

import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CardActions from "@mui/material/CardActions";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import {
  resetTraining,
  updateTraining,
  updateOpenPopup,
  updatePopupData,
} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";
import { PopupDelete } from "../PopupDelete";

export default function Trainings() {
  const training = useSelector((state) => state.Elite.training);
  const dispatch = useDispatch();
  const [trainingList, setTrainingList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const titleList = [
    "Ms",
    "Mrs",
    "Miss",
    "Mr",
    "Dr",
    "Sir",
    "Prof",
    "Assistant Prof",
  ];
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      getTrainings();
    }
  }, []);

  const inputRef = useRef(null);
  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const getTrainings = async () => {
    const response = await getApi("training/get");
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else {
      setTrainingList(response?.data);
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

  const SelectOption = [
    {
      label: "Online",
      value: "Online",
    },
    {
      label: "Physical",
      value: "Physical",
    },
  ];

  const handleFormTitle = (event) => {
    dispatch(updateTraining({ ...training, title: event }));
  };
  const handleFormTrainer = (event) => {
    dispatch(updateTraining({ ...training, trainer: event }));
  };
  const handleFormDescription = (event) => {
    dispatch(updateTraining({ ...training, description: event }));
  };
  const handleFormObjective = (event) => {
    dispatch(updateTraining({ ...training, objective: event }));
  };
  const handleFormVenue = (event) => {
    dispatch(updateTraining({ ...training, venue: event }));
  };
  const handleFormFee = (event) => {
    dispatch(updateTraining({ ...training, fee: event }));
  };
  const handleFormLink = (event) => {
    dispatch(updateTraining({ ...training, link: event }));
  };

  const handleFormImage = async (e) => {
    dispatch(updateTraining({ ...training, image: e.target.files[0] }));
  };
  const handleFormSelect = (event) => {
    dispatch(updateTraining({ ...training, mode: event, venue: "" }));
  };

  const handleFormDate = (event) => {
    dispatch(updateTraining({ ...training, date: event }));
  };

  const validateForm =
    training.image &&
    training.title &&
    firstName &&
    training.trainer &&
    training.date &&
    training.description &&
    training.mode &&
    training.objective &&
    training.fee &&
    training.link;

  const cancelForm =
    training.image ||
    training.title ||
    training.trainer ||
    training.description ||
    training.mode ||
    training.date ||
    training.objective ||
    training.venue ||
    training.fee ||
    training.link;

  const handleUpdateValidation = () => {
    const tempTraining = trainingList.filter(
      (item) => item.id === training?.id
    );
    return (
      tempTraining[0]?.title !== training?.title ||
      tempTraining[0]?.trainer !== training?.trainer ||
      tempTraining[0]?.date !== training?.date ||
      tempTraining[0]?.image !== training?.image ||
      tempTraining[0]?.mode !== training?.mode ||
      tempTraining[0]?.description !== training?.description ||
      tempTraining[0]?.objective !== training?.objective ||
      tempTraining[0]?.venue !== training?.venue ||
      tempTraining[0]?.fee !== training?.fee ||
      tempTraining[0]?.link !== training?.link
    );
  };
  const updateValidation = handleUpdateValidation();

  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append("image", training.image);
    formData.append("title", training.title);
    formData.append("trainer", firstName + ". " + training.trainer);
    formData.append("date", training.date);
    formData.append("description", training.description);
    formData.append("mode", training.mode);
    formData.append("objective", training.objective);
    formData.append("venue", training.venue);
    formData.append("fee", training.fee);
    formData.append("link", training.link);

    if (validateForm) {
      if (!edit) {
        const response = await postApi("training/create", formData);
        if (response?.status === "Failed") {
          openPopup("error", "Network Error! Try again later.");
        } else if (response?.status_code === 200) {
          openPopup("success", "New data successfully created.");
        } else if (response?.status_code === 400) {
          openPopup("error", "New data creation Failed.");
        }
      } else {
        const response = await putApi(
          "training/update/" + training.id,
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

      getTrainings();
      handleCancelProject();
      closePopup();
    }
  };

  const ConfirmDelete = (item) => async () => {
    const response = await postApi("training/delete/" + item.id);
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else if (response?.status_code === 200) {
      openPopup("info", "Data successfully deleted.");
    } else if (response?.status_code === 400) {
      openPopup("error", "Data deletion Failed.");
    }
    getTrainings();
    closePopup();
    setOpen(false);
  };

  const handleRemoveProject = (item) => async () => {
    setOpen(true);
    setDeleteItem(item);
  };

  const handleEditProject = (item) => () => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    setEdit(true);
    const NamePreTextPattern = new RegExp(
      `^(${titleList.join("|")})\\.\\s`,
      "i"
    );
    dispatch(
      updateTraining({
        ...training,
        description: item.description,
        image: item.image,
        trainer: item.trainer.replace(NamePreTextPattern, ""),
        date: item.date,
        title: item.title,
        mode: item.mode,
        objective: item.objective,
        venue: item.venue,
        fee: item.fee,
        link: item.link,
        id: item.id,
      })
    );
    setEditImage(item.image);
  };

  const handleCancelProject = async () => {
    dispatch(resetTraining());
    resetFileInput();
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
        <h5 className="Form-heading">TRAINING FOR TRAINERS</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Training Title:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter training title"
                  name="title"
                  value={training.title}
                  onChange={handleFormTitle}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Trainer Name:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <div style={{ display: "flex" }}>
                  <select
                    className="Pre-Nametext"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  >
                    {titleList.map((title, index) => (
                      <option key={index} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>

                  <Input
                    className="Form-input"
                    size="md"
                    placeholder="Enter Trainer Name"
                    name="title"
                    value={training.trainer}
                    onChange={handleFormTrainer}
                    required
                  />
                </div>
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
                  {edit && editImage === training.image ? (
                    <p
                      className="Form-textArea"
                      style={{ padding: "5px", color: "rgb(133, 133, 133)" }}
                    >
                      {training.image}
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
                  value={training.description}
                  placeholder="Enter description"
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Objective:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  name="objective"
                  value={training.objective}
                  rows={2}
                  onChange={handleFormObjective}
                  required
                  placeholder="Enter objective"
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Mode:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <SelectPicker
                  className="Form-select"
                  size="md"
                  placeholder="Select the mode"
                  data={SelectOption}
                  name="mode"
                  value={training.mode}
                  onChange={handleFormSelect}
                  required
                />
              </Col>
            </Row>
            {training.mode != "Online" && (
              <Row style={{ marginBottom: "10px" }}>
                <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                  <label class="Form-label">Venue:</label>
                </Col>
                <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                  <Input
                    className="Form-input"
                    size="md"
                    placeholder="Enter venue"
                    name="venue"
                    value={training.venue}
                    onChange={handleFormVenue}
                    required
                  />
                </Col>
              </Row>
            )}

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Date:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <DatePicker
                  format="MM/dd/yyyy HH:mm"
                  className="Form-input"
                  size="md"
                  placeholder="select the date"
                  name="venue"
                  showMeridian
                  onChange={handleFormDate}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Fee:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter fee"
                  name="fee"
                  value={training.fee}
                  onChange={handleFormFee}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Registration Link:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter registration link"
                  name="fee"
                  value={training.link}
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
        <h5 className="Display-heading">ADDED TRAINING FOR TRAINERS DETAIL</h5>
        <div className="Form-DisplayContainer">
          {trainingList.map((item) => (
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
                      <div>
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
      {open && (
        <PopupDelete
          item={deleteItem}
          open={open}
          ConfirmDelete={ConfirmDelete}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
