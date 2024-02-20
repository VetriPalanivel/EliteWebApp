import React,{useEffect, useState,useRef} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from 'rsuite';
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import { Avatar } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetInovationProject, updateInovationProject, updateOpenPopup, updatePopupData} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";

export default function InovationProjects() {
  const inovationProject = useSelector ((state) => state.Elite.inovationProject)
  const dispatch = useDispatch();
  const [inovationProjectList,setInovationProjectList] = useState([])
  const [edit,setEdit] = useState(false)
  const [editImage,setEditImage] = useState("");
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    getInovationProjects()
  },[])

  const inputRef = useRef(null);
  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const getInovationProjects = async()=>{
    const response =await getApi('inovation_project/get');
    if(response?.status === "Failed"){
      openPopup('error','Network Error! Try again later.')
    }else{
      setInovationProjectList(response?.data);
    }
    closePopup()
   
  }
  const SelectOption = [
    {
      label: "On-Going",
      value: "On-Going",
    },
    {
      label: "Completed",
      value: "Completed",
    },
    {
      label: "Investment",
      value: "Investment",
    },
  ];

  const openPopup = (type,message) =>{
    dispatch(updateOpenPopup(true));
    dispatch(updatePopupData({
      type:type,
      message:message,
    }))
  }

  const closePopup = () =>{
    setTimeout(()=>{
      dispatch(updateOpenPopup(false));
      dispatch(updatePopupData(""));
    },3500)}

  const handleFormTitle = (event) =>{
    dispatch(updateInovationProject({...inovationProject,"title" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateInovationProject({...inovationProject,"description" : event}));
  }

  const handleFormImage = async(e) =>{
    dispatch(updateInovationProject({...inovationProject, "image" : e.target.files[0]}));
  }

  const handleFormSelect = (event) =>{
    dispatch(updateInovationProject({...inovationProject,"status" : event}));
  }
const validateForm = inovationProject.image && inovationProject.title && inovationProject.status && inovationProject.description;
const cancelForm = inovationProject.image || inovationProject.title || inovationProject.status || inovationProject.description;

const handleUpdateValidation = () =>{
  const tempInovationProject = inovationProjectList.filter((item)=>item.id === inovationProject?.id)
  return (tempInovationProject[0]?.title !==inovationProject?.title || tempInovationProject[0]?.image !==inovationProject?.image || tempInovationProject[0]?.status !==inovationProject?.status || tempInovationProject[0]?.description !==inovationProject?.description)
}
const updateValidation = handleUpdateValidation();

const handleAddProject = async() =>{
  const formData = new FormData();
  formData.append('image', inovationProject.image);
  formData.append('title', inovationProject.title);
  formData.append('description', inovationProject.description);
  formData.append('status', inovationProject.status);
  
  if(validateForm){
    if(!edit){
      const response = await postApi('inovation_project/create',formData);
      if(response?.status === "Failed"){
        openPopup('error','Network Error! Try again later.')
      }else if(response?.status_code === 200)
       {
        openPopup('success','New data successfully created.')
      }else if(response?.status_code === 400)
      {
        openPopup('error','New data creation Failed.')
      }
    }else{
      const response = await putApi('inovation_project/update/'+ inovationProject.id,formData)
        if(response?.status === "Failed"){
          openPopup('error','Network Error! Try again later.')
        }else if(response?.status_code === 200)
         {
          openPopup('info','Data successfully updated.')
        }else if(response?.status_code === 400)
        {
          openPopup('error','Data updation Failed.')
        }
    }
    
    getInovationProjects();
    handleCancelProject();
    resetFileInput()
    closePopup();
  }  
}
const handleRemoveProject = (item) => async() =>{
      const response = await postApi('inovation_project/delete/'+ item.id)
      if(response?.status === "Failed"){
        openPopup('error','Network Error! Try again later.')
      }else if(response?.status_code === 200)
       {
        openPopup('info','Data successfully deleted.')
      }else if(response?.status_code === 400)
      {
        openPopup('error','Data deletion Failed.')
      }
      getInovationProjects();
      closePopup()
}

const handleEditProject = (item) => ()  =>{
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
  setEdit(true)
  dispatch(updateInovationProject({...inovationProject,
    "description":item.description,
    "image":item.image,
    "title":item.title,
    "status":item.status,
    "id":item.id,
  }))
  setEditImage(item.image);
}

const handleCancelProject = async() =>{
  dispatch(resetInovationProject())
  resetFileInput()
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
        <h5 className="Form-heading">EGE ON-GOING AND COMPLETED PROJECTS</h5>
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
                  value={inovationProject.title}
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
                  ref={inputRef}
                  onChange={handleFormImage}
                />
                  {(edit && editImage === inovationProject.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{inovationProject.image}</p>:""}
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
                  name="description"
                  rows={2}
                  value={inovationProject.description}
                  placeholder="Enter description"
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Status:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <SelectPicker
                  className="Form-select"
                  size="md"
                  name="status"
                  value={inovationProject.status}
                  placeholder="Select the status"
                  data={SelectOption}
                  onChange={handleFormSelect}
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
          ADDED EGE ON-GOING AND COMPLETED PROJECTS DETAIL
        </h5>
        <div className="Form-DisplayContainer">
          {inovationProjectList.map((item,index) => (
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
                        src={`${baseUrl}${item.image}`}
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
