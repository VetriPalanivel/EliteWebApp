import React, { useState,useEffect } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import course from "../../../asserts/course.png";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { useDispatch, useSelector } from "react-redux";
import { resetOnGoingProject, updateOnGoingProject } from "../../../redux/userReducer";

export default function OnGoingProjects() {

  const onGoingProject = useSelector ((state) => state.Elite.onGoingProject)
  const dispatch = useDispatch();
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  },[])

  const [projectList,setProjectList] = useState([])

  const SelectOption = [
    {
      label: "Completed",
      value: "Completed",
    },
    {
      label: "On-Going",
      value: "On-Going",
    },
  ];

  const handleFormTitle = (event) =>{
    dispatch(updateOnGoingProject({...onGoingProject,"title" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateOnGoingProject({...onGoingProject,"description" : event}));
  }

  const handleFormImage = async(e) =>{
    dispatch(updateOnGoingProject({...onGoingProject, "image" : e.target.files[0]}));
  }

  const handleFormSelect = (event) =>{
    dispatch(updateOnGoingProject({...onGoingProject,"status" : event}));
  }
const validateForm = onGoingProject.image && onGoingProject.title && onGoingProject.status && onGoingProject.description;
const cancelForm = onGoingProject.image || onGoingProject.title || onGoingProject.status || onGoingProject.description;
  const handleAddProject = () =>{
    const formData = new FormData();
    formData.append('image', onGoingProject.image);
    formData.append('title', onGoingProject.title);
    formData.append('description', onGoingProject.description);
    formData.append('status', onGoingProject.status);
    
    if(validateForm){
      axios.post("http://localhost:4000/post_ongoing_project",formData)
      .then(res=>{console.log(res)})
      .catch(e=>{console.log(e)})
      dispatch(resetOnGoingProject())
    }  
  }

  const handleCancelProject = async() =>{
    dispatch(resetOnGoingProject())
  }

  return (
    <div className="researchProjects-container">
      <div className="Form-div">
        <h5 className="Form-heading">EGE ON-GOING RESEARCH PROJECTS</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Research Title:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  name="title"
                  value={onGoingProject.title}
                  placeholder="Enter research title"
                  onChange={handleFormTitle}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Image:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15} >
                <input
                  className="Form-imageUpload"
                  name="image"
                  type="file"
                  style={{background:"white",height:"35px",borderRadius:"6px",padding:"5px",color:"rgb(133, 133, 133)"}}
                  required
                  onChange={handleFormImage}
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Status:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <SelectPicker
                  className="Form-select"
                  size="md"
                  name="status"
                  value={onGoingProject.status}
                  placeholder="Select the status"
                  data={SelectOption}
                  onChange={handleFormSelect}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Description:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  name="description"
                  rows={2}
                  value={onGoingProject.description}
                  placeholder="Enter description"
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}></Col>
              <Col xs={20} sm={20} md={15} lg={15} xl={15}>
                <ButtonToolbar className="confirmButton">
                  <Button disabled={!cancelForm} color="red" id="cancel" appearance="primary" onClick={handleCancelProject}>
                    Cancel
                  </Button>
                  <Button disabled={!validateForm} color="green" id="addnew" appearance="primary" onClick={handleAddProject}>
                    Add New
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
      
      <div className="Display-FormDetails">
        <h5
          className="Display-heading"
        >
          ADDED PROJECT DETAILS
        </h5>
        <div className="Form-DisplayContainer">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              className="Form-DisplayCard"
            >
              <CardContent>
                <Grid>
                  <Row >
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                      <Avatar
                        alt=""
                        variant="square"
                        className="Form-DisplayCard-img"
                        style={{
                         
                        }}
                        src={course}
                      />
                    </Col>
                    <Col
                      xs={24} sm={24} md={18} lg={18} xl={18}
                      className="Display-content"
                    >
                      <div>
                        <h6 className="Display-content-heading" >
                          Adoption of IIOT in manufacturing and Production SME's
                          Research Grant by Saudi Electronic University
                        </h6>
                        <p className="Display-content-text">
                          We use cookies on our website. Cookies are used to
                          improve the functionality and use of our internet
                          site, as well as for analytic and advertising
                          purposes. To learn more about cookies, how we use
                          them, and how to change your cookie settings, find out
                          more here. By continuing to use this site without
                          changing your settings, you consent to our use of
                          cookies.
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
                        <Button
                          variant="outlined"
                          id="delete"
                          startIcon={<DeleteIcon />}
                        />
                        <Button
                         id="edit"
                          variant="outlined"
                          startIcon={<EditIcon />}
                        />
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
