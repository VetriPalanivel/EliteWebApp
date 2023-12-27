import React, { useEffect, useState } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import course from "../../../asserts/course.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetRole, updateRole } from "../../../redux/userReducer";

export default function Roles() {
  const role = useSelector((state) => state.Elite.role);
  const dispatch = useDispatch();
  const [roleList, setRoleList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      getRoles();
    }
  }, []);

  const getRoles = async () => {
    const response = await axios.get("http://localhost:4000/roles/get");
    setRoleList(response.data);
  };

  const handleFormTitle = (event) => {
    dispatch(updateRole({ ...role, title: event }));
  };
  const handleFormDescription = (event) => {
    dispatch(updateRole({ ...role, description: event }));
  };
  const handleFormImage = async (e) => {
    dispatch(updateRole({ ...role, image: e.target.files[0] }));
  };
  const handleFormResponsibility = (event) => {
    dispatch(updateRole({ ...role, responsibility: event }));
  };
  const handleFormBenefit = (event) => {
    dispatch(updateRole({ ...role, benefit: event }));
  };
  const handleFormType = (event) => {
    dispatch(updateRole({ ...role, type: event }));
  };
  const handleFormLocation = (event) => {
    dispatch(updateRole({ ...role, location: event }));
  };

  const validateForm =
    role.image &&
    role.title &&
    role.description &&
    role.type &&
    role.location &&
    role.benefit &&
    role.responsibility;
  const cancelForm =
    role.image ||
    role.title ||
    role.description ||
    role.type ||
    role.location ||
    role.benefit ||
    role.responsibility;
  const handleUpdateValidation = () => {
    const tempRoles = roleList.filter((item) => item.id === role?.id);
    return (
      tempRoles[0]?.title !== role?.title ||
      tempRoles[0]?.image !== role?.image ||
      tempRoles[0]?.type !== role?.type ||
      tempRoles[0]?.description !== role?.description ||
      tempRoles[0]?.location !== role?.location ||
      tempRoles[0]?.benefit !== role?.benefit ||
      tempRoles[0]?.responsibility !== role?.responsibility
    );
  };
  const updateValidation = handleUpdateValidation();
  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append("image", role.image);
    formData.append("title", role.title);
    formData.append("description", role.description);
    formData.append("type", role.type);
    formData.append("location", role.location);
    formData.append("benefit", role.benefit);
    formData.append("responsibility", role.responsibility);

    if (validateForm) {
      if(!edit){
        await axios
        .post("http://localhost:4000/roles/create", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      }else{
        await axios
        .put("http://localhost:4000/roles/update/"+role.id, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      }
      
      // dispatch(resetRole())
      getRoles();
    }
  };
  const handleRemoveProject = (item) => async() =>{
    await axios
        .post("http://localhost:4000/roles/delete/"+item.id)
        .then((res) => {
          console.log(res);
          getRoles();
        })
        .catch((e) => {
          console.log(e);
        });
  }

  const handleEditProject = (item) => ()  =>{
    setEdit(true)
    dispatch(updateRole({...role,
      "description":item.description,
      "image":item.image,
      "title":item.title,
      "type":item.type,
      "location":item.location,
      "benefit":item.benefit,
      "responsibility":item.responsibility,
      "id":item.id,
    }))
    setEditImage(item.image);
  }

  const handleCancelProject = async () => {
    dispatch(resetRole());
    setEdit(false)
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
        <h5 className="Form-heading">EGE AVAILABLE ROLES</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Role:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter role name"
                  name="title"
                  value={role.title}
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
                  onChange={handleFormImage}
                />
                 {(edit && editImage === role.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{role.image}</p>:""}
                </div>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Location:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter location"
                  name="location"
                  value={role.location}
                  onChange={handleFormLocation}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Type:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter type"
                  name="type"
                  value={role.type}
                  onChange={handleFormType}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Role Description:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  rows={2}
                  placeholder="Enter description"
                  name="description"
                  value={role.description}
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Role Responsibilities:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  rows={2}
                  placeholder="Enter responsibility"
                  name="responsibility"
                  value={role.responsibility}
                  onChange={handleFormResponsibility}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Rewards & Benefits:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  rows={2}
                  placeholder="Enter reward & benefit"
                  name="benefit"
                  value={role.benefit}
                  onChange={handleFormBenefit}
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
                  { !edit ? 
                  <Button disabled={!validateForm} color="green" id="addnew" appearance="primary" onClick={handleAddProject}>
                    Add New
                  </Button> :
                  <Button disabled={!(validateForm && updateValidation)} color="green" id="addnew" appearance="primary" onClick={handleAddProject}>
                    Update
                  </Button>
                   }
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>

      <div className="Display-FormDetails">
        <h5 className="Display-heading">ADDED PROJECT DETAILS</h5>
        <div className="Form-DisplayContainer">
          {roleList.map((item) => (
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
                        src={`http://localhost:4000/${item.image}`}
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
                      <Whisper  placement="top" speaker={<Tooltip> Delete!</Tooltip>}>
                        <Button
                          variant="outlined"
                          id="delete"
                          style={{color:"red"}}
                          startIcon={<DeleteIcon />}
                          onClick={handleRemoveProject(item)}
                        />
                        </Whisper>
                        <Whisper  placement="top" speaker={<Tooltip> Edit!</Tooltip>}>
                        <Button
                         id="edit"
                         color="blue"
                          variant="outlined"
                          style={{color:"green"}}
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
