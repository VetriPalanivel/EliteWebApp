import React, { useEffect, useState, useRef } from "react";
import { Input, Grid, Row, Col } from "rsuite";
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
  resetNews,
  updateNews,
  updateOpenPopup,
  updatePopupData,
} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";
import { PopupDelete } from "../PopupDelete";

export default function News() {
  const news = useSelector((state) => state.Elite.news);
  const dispatch = useDispatch();
  const [newsList, setNewsList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      getNews();
    }
  }, []);

  const inputRef = useRef(null);
  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const getNews = async () => {
    const response = await getApi("news/get");
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else {
      setNewsList(response?.data);
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
    dispatch(updateNews({ ...news, title: event }));
  };
  const handleFormDescription = (event) => {
    dispatch(updateNews({ ...news, description: event }));
  };
  const handleFormDate = (event) => {
    dispatch(updateNews({ ...news, date: event }));
  };

  const handleFormImage = async (e) => {
    dispatch(updateNews({ ...news, image: e.target.files[0] }));
  };

  const validateForm =
    news.image && news.title && news.description && news.date;
  const cancelForm = news.image || news.title || news.description || news.date;
  const handleUpdateValidation = () => {
    const tempNews = newsList.filter((item) => item.id === news?.id);
    return (
      tempNews[0]?.title !== news?.title ||
      tempNews[0]?.image !== news?.image ||
      tempNews[0]?.date !== news?.date ||
      tempNews[0]?.description !== news?.description
    );
  };
  const updateValidation = handleUpdateValidation();

  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append("image", news.image);
    formData.append("title", news.title);
    formData.append("description", news.description);
    formData.append("date", news.date);

    if (validateForm) {
      if (!edit) {
        const response = await postApi("news/create", formData);
        if (response?.status === "Failed") {
          openPopup("error", "Network Error! Try again later.");
        } else if (response?.status_code === 200) {
          openPopup("success", "New data successfully created.");
        } else if (response?.status_code === 400) {
          openPopup("error", "New data creation Failed.");
        }
      } else {
        const response = await putApi("news/update/" + news.id, formData);
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
      resetFileInput();
      getNews();
    }
  };
  const ConfirmDelete = (item) => async () => {
    const response = await postApi("news/delete/" + item.id);
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else if (response?.status_code === 200) {
      openPopup("info", "Data successfully deleted.");
    } else if (response?.status_code === 400) {
      openPopup("error", "Data deletion Failed.");
    }
    getNews();
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
    dispatch(
      updateNews({
        ...news,
        description: item.description,
        image: item.image,
        title: item.title,
        date: item.date,
        id: item.id,
      })
    );
    setEditImage(item.image);
  };

  const handleCancelProject = async () => {
    dispatch(resetNews());
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
        <h5 className="Form-heading">EGE NEWS</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">News Title:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter news title"
                  name="title"
                  value={news.title}
                  onChange={handleFormTitle}
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
                  {edit && editImage === news.image ? (
                    <p
                      className="Form-textArea"
                      style={{ padding: "5px", color: "rgb(133, 133, 133)" }}
                    >
                      {news.image}
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
                  value={news.description}
                  placeholder="Enter description"
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">News Date:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter news date"
                  name="date"
                  value={news.date}
                  onChange={handleFormDate}
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
        <h5 className="Display-heading">ADDED EGE NEWS DETAIL</h5>
        <div className="Form-DisplayContainer">
          {newsList.map((item) => (
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
