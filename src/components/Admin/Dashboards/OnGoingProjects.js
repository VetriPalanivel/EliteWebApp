import React, { useState,useEffect } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from 'rsuite';
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Avatar } from "@mui/material";
import course from "../../../asserts/course.png";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { useDispatch, useSelector } from "react-redux";
import { resetOnGoingProject, updateOnGoingProject } from "../../../redux/userReducer";

export default function OnGoingProjects() {

  const onGoingProject = useSelector ((state) => state.Elite.onGoingProject)
  const [projectList,setProjectList] = useState([])
  const dispatch = useDispatch();
  const [edit,setEdit] = useState(false)
  const [editImage,setEditImage] = useState("");
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    getOnGoingProjects();
  },[])

  const getOnGoingProjects = async() =>{
    const response =await axios.get("http://localhost:4000/ongoing_project/get");
    setProjectList(response.data)
  }

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

const handleUpdateValidation = () =>{
  const tempOnGoingProject = projectList.filter((item)=>item.id === onGoingProject?.id)
  return (tempOnGoingProject[0]?.title !==onGoingProject?.title || tempOnGoingProject[0]?.image !==onGoingProject?.image || tempOnGoingProject[0]?.status !==onGoingProject?.status || tempOnGoingProject[0]?.description !==onGoingProject?.description)
}
const updateValidation = handleUpdateValidation();

const handleAddProject = async() =>{
    const formData = new FormData();
    formData.append('image', onGoingProject.image);
    formData.append('title', onGoingProject.title);
    formData.append('description', onGoingProject.description);
    formData.append('status', onGoingProject.status);
    
    if(validateForm){
      if(!edit){
        await axios.post("http://localhost:4000/ongoing_project/create",formData)
      .then(res=>{console.log(res)})
      .catch(e=>{console.log(e)})
      }else{
        await axios.put("http://localhost:4000/ongoing_project/update/"+ onGoingProject.id,formData)
        .then(res=>{console.log(res)})
        .catch(e=>{console.log(e)})
      }
    }  
    // dispatch(resetOnGoingProject())
    getOnGoingProjects();
  }

  const handleEditProject = (item) => ()  =>{
    setEdit(true)
    dispatch(updateOnGoingProject({...onGoingProject,
      "description":item.description,
      "image":item.image,
      "title":item.title,
      "status":item.status,
      "id":item.id,
    }))
    setEditImage(item.image);
  }
  
  
  const handleCancelProject = async() =>{
    dispatch(resetOnGoingProject())
    setEdit(false)
  }


  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

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
                <div>
                <input
                  className="Form-imageUpload"
                  name="image"
                  type="file"
                  style={{background:"white",height:"35px",borderRadius:"6px",padding:"5px",color:"rgb(133, 133, 133)"}}
                  required
                  display="none"
                  onChange={handleFormImage}
                />
                 {(edit && editImage === onGoingProject.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{onGoingProject.image}</p>:""}
                  </div>
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
        <h5
          className="Display-heading"
        >
          ADDED PROJECT DETAILS
        </h5>
        <div className="Form-DisplayContainer">
          {projectList.map((item,index) => (
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
                        src={`http://localhost:4000/${item.image}`}
                      />
                    </Col>
                    <Col
                      xs={24} sm={24} md={18} lg={18} xl={18}
                      className="Display-content"
                    >
                      <div>
                        <h6 className="Display-content-heading" >
                          {item.title}
                        </h6>
                        <p className="Display-content-text">
                        {truncateText(item.description, 69)}
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
