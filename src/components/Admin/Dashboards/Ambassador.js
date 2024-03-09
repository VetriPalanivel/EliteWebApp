import React, { useEffect, useState, useRef } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import {
  resetAmbassador,
  updateAmbassador,
  updateOpenPopup,
  updatePopupData,
} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";
import { PopupDelete } from "../PopupDelete";

export default function Ambassador() {
  const inputRef = useRef(null);
  const ambassador = useSelector((state) => state.Elite.ambassador);
  const dispatch = useDispatch();
  let Country = require("country-state-city").Country;
  const [ambassadorList, setAmbassadorList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
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

  const [editImage, setEditImage] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      const tempCountry = Country.getAllCountries().map((item) => {
        return { label: item.name, value: item.name };
      });
      setCountryList(tempCountry);
      getAmbassadors();
    }
  }, []);

  const getAmbassadors = async () => {
    const response = await getApi("ambassador/get");
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else {
      setAmbassadorList(response?.data);
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
    dispatch(updateAmbassador({ ...ambassador, name: event }));
  };
  const handleFormDescription = (event) => {
    dispatch(updateAmbassador({ ...ambassador, description: event }));
  };
  const handleFormImage = async (e) => {
    dispatch(updateAmbassador({ ...ambassador, image: e.target.files[0] }));
  };
  const handleFormSelect = (event) => {
    if (event != undefined || event != null) {
      const flag = Country.getAllCountries().find(
        (country) => country.name === event
      )?.isoCode;
      dispatch(updateAmbassador({ ...ambassador, country: event, flag: flag }));
    }
  };

  const validateForm =
    ambassador.image &&
    ambassador.name &&
    ambassador.flag &&
    ambassador.description &&
    ambassador.country;
  const cancelForm =
    ambassador.image ||
    ambassador.flag ||
    ambassador.name ||
    ambassador.description ||
    ambassador.country;
  const handleUpdateValidation = () => {
    const tempAmbassador = ambassadorList.filter(
      (item) => item.id === ambassador?.id
    );
    return (
      tempAmbassador[0]?.name !== ambassador?.name ||
      tempAmbassador[0]?.image !== ambassador?.image ||
      tempAmbassador[0]?.flag !== ambassador?.flag ||
      tempAmbassador[0]?.country !== ambassador?.country ||
      tempAmbassador[0]?.description !== ambassador?.description
    );
  };
  const updateValidation = handleUpdateValidation();
  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append("image", ambassador.image);
    formData.append("name", firstName + ". " + ambassador.name);
    formData.append("description", ambassador.description);
    formData.append("country", ambassador.country);
    formData.append("flag", ambassador.flag);

    if (validateForm) {
      if (!edit) {
        const response = await postApi("ambassador/create", formData);
        if (response?.status === "Failed") {
          openPopup("error", "Network Error! Try again later.");
        } else if (response?.status_code === 200) {
          openPopup("success", "New data successfully created.");
        } else if (response?.status_code === 400) {
          openPopup("error", "New data creation Failed.");
        }
      } else {
        const response = await putApi(
          "ambassador/update/" + ambassador.id,
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
      getAmbassadors();
      resetFileInput();
      closePopup();
    }
  };

  const ConfirmDelete = (item) => async () => {
    const response = await postApi("ambassador/delete/" + item.id);
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else if (response?.status_code === 200) {
      openPopup("info", "Data successfully deleted.");
    } else if (response?.status_code === 400) {
      openPopup("error", "Data deletion Failed.");
    }
    getAmbassadors();
    closePopup();
    setOpen(false);
  };

  const handleRemoveProject = (item) => async () => {
    setOpen(true);
    setDeleteItem(item);
  };

  const handleEditProject = (item) => () => {
    setEdit(true);
    const NamePreTextPattern = new RegExp(
      `^(${titleList.join("|")})\\.\\s`,
      "i"
    );

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    dispatch(
      updateAmbassador({
        ...ambassador,
        description: item.description,
        image: item.image,
        name: item.name.replace(NamePreTextPattern, ""),
        country: item.country,
        flag: item.flag,
        id: item.id,
      })
    );
    setEditImage(item.image);
  };

  const handleCancelProject = async () => {
    dispatch(resetAmbassador());
    resetFileInput();
    setEdit(false);
  };
  const resetFileInput = () => {
    inputRef.current.value = null;
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
        <h5 className="Form-heading">EGE AMBASSADOR</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Name:</label>
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
                    placeholder="Enter name"
                    name="name"
                    value={ambassador.name}
                    onChange={handleFormName}
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
                  {edit && editImage === ambassador.image ? (
                    <p
                      className="Form-textArea"
                      style={{ padding: "5px", color: "rgb(133, 133, 133)" }}
                    >
                      {ambassador.image}
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
                  className="Form-input"
                  size="md"
                  placeholder="Enter description"
                  name="description"
                  value={ambassador.description}
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Country:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <SelectPicker
                  className="Form-select"
                  size="md"
                  placeholder="Select the country"
                  data={countryList}
                  name="mode"
                  value={ambassador.country}
                  onChange={handleFormSelect}
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
        <h5 className="Display-heading">ADDED EGE AMBASSADOR DETAIL</h5>
        <Grid>
          <div className="Form-DisplayContainer">
            {ambassadorList.map((item) => (
              <Col xs={24} sm={24} md={8} lg={8} xl={8} key={item}>
                <Card className="Form-DisplayCard-Aamember">
                  <CardContent>
                    <Avatar
                      alt=""
                      className="Form-DisplayCard-Amember-img"
                      style={{
                        margin: "0 auto",
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                      src={`${baseUrl}${item.image}`}
                    />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <p
                            className="Display-content-text-member"
                            style={{ textAlign: "left", paddingLeft: "0px" }}
                          >
                            {item.country}
                          </p>
                          <h6
                            className="Display-content-heading-member"
                            style={{ textAlign: "left", paddingLeft: "0px" }}
                          >
                            {item.name}
                          </h6>
                        </div>
                        <Avatar
                          alt=""
                          className=""
                          style={{
                            margin: "10px",
                            borderRadius: "2px",
                            marginBottom: "5px",
                            width: "50px",
                            height: "35px",
                            float: "right",
                          }}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.flag}.svg`}
                        />
                      </div>
                      <p
                        className="Display-content-text-A"
                        style={{
                          textAlign: "left",
                          paddingLeft: "0px",
                          fontSize: "12px",
                        }}
                      >
                        {truncateText(item.description, 60)}
                      </p>
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
