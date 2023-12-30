import React,{useEffect,useState} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from 'axios'
import { Uploader } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from 'rsuite';
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Avatar } from "@mui/material";
import course from "../../../asserts/course.png";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { useDispatch, useSelector } from "react-redux";
import { resetAssistantJob, updateAssistantJob , updateOpenPopup, updatePopupData} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";

export default function ResearchAssistant() {
  const assistantJob = useSelector((state) => state.Elite.assitantJob)
  const [assistantJobList,setAssistantJobList] = useState([])
  const dispatch = useDispatch();
  const [edit,setEdit] = useState(false)
  const [editImage,setEditImage] = useState("");
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    getResearchAssistantJobs()
  },[])

  const getResearchAssistantJobs = async()=>{
    const response =await getApi('research_assistantjob/get');
    if(response?.status === "Failed"){
      openPopup('error','Network Error! Try again later.')
    }else{
      setAssistantJobList(response?.data);
    }
    closePopup()
  }
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
    dispatch(updateAssistantJob({...assistantJob,"title" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateAssistantJob({...assistantJob,"description" : event}));
  }
  const handleFormImage = async(e) =>{
    dispatch(updateAssistantJob({...assistantJob, "image" : e.target.files[0]}));
  }
  const handleFormBenefits = (event) =>{
    dispatch(updateAssistantJob({...assistantJob,"benefit" : event}));
  }
  const handleFormRequirements= (event) =>{
    dispatch(updateAssistantJob({...assistantJob,"requirement" : event}));
  }
  const handleFormDuration= (event) =>{
    dispatch(updateAssistantJob({...assistantJob,"duration" : event}));
  }
  const handleFormDeadline= (event) =>{
    dispatch(updateAssistantJob({...assistantJob,"deadline" : event}));
  }

  const validateForm = assistantJob.title && assistantJob.image && assistantJob.description && assistantJob.requirement && assistantJob.benefit && assistantJob.duration && assistantJob.deadline
  const cancelForm = assistantJob.title || assistantJob.image || assistantJob.description || assistantJob.requirement || assistantJob.benefit || assistantJob.duration || assistantJob.deadline

  const handleUpdateValidation = () =>{
    const tempResearchAssistant = assistantJobList.filter((item)=>item.id === assistantJob?.id)
    return (tempResearchAssistant[0]?.title !==assistantJob?.title || tempResearchAssistant[0]?.image !==assistantJob?.image || tempResearchAssistant[0]?.description !==assistantJob?.description || tempResearchAssistant[0]?.requirement !==assistantJob?.requirement || tempResearchAssistant[0]?.benefit !==assistantJob?.benefit || tempResearchAssistant[0]?.duration !==assistantJob?.duration || tempResearchAssistant[0]?.deadline !==assistantJob?.deadline )
  }
  const updateValidation = handleUpdateValidation();
  const handleAddAssistantJob = async() =>{
    const formData = new FormData();
    formData.append('image', assistantJob.image);
    formData.append('title', assistantJob.title);
    formData.append('description', assistantJob.description);
    formData.append('requirement', assistantJob.requirement);
    formData.append('benefit', assistantJob.benefit);
    formData.append('duration', assistantJob.duration);
    formData.append('deadline', assistantJob.deadline);
    
    if(validateForm){
      if(!edit){
      const response = await postApi('research_assistantjob/create',formData);
      if(response?.status === "Failed"){
        openPopup('error','Network Error! Try again later.')
      }else if(response?.status_code === 200)
       {
        openPopup('success','New data successfully created.')
      }else if(response?.status_code === 400)
      {
        openPopup('error','New data creation Failed.')
      }
      }
      else{
      const response = await putApi('research_assistantjob/update/'+ assistantJob.id,formData)
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
      getResearchAssistantJobs();
      handleCancelAssistantJob();
      closePopup();
    }  
  }

  const handleEditAssistantJob = (item) => ()  =>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setEdit(true)
    dispatch(updateAssistantJob({...assistantJob,
      "title":item.title,
      "description":item.description,
       "image":item.image,
      "requirement":item.requirement,
       "benefit":item.benefit,
       "duration":item.duration,
       "deadline":item.deadline,
       "id":item.id,
    }))
    setEditImage(item.image);
  }

  const handleRemoveProject = (item) => async() =>{
        const response = await postApi('research_assistantjob/delete/'+ item.id)
        if(response?.status === "Failed"){
          openPopup('error','Network Error! Try again later.')
        }else if(response?.status_code === 200)
         {
          openPopup('info','Data successfully deleted.')
        }else if(response?.status_code === 400)
        {
          openPopup('error','Data deletion Failed.')
        }
        getResearchAssistantJobs()
        closePopup()
  }
  

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const handleCancelAssistantJob = async() =>{
    dispatch(resetAssistantJob())
    setEdit(false)
  }

  return (
    <div className="researchProjects-container">
      <div className="Form-div">
        <h5 className="Form-heading">EGE RESEARCH ASSISTANT JOBS</h5>
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
                  placeholder="Enter research title"
                  onChange={handleFormTitle}
                  required
                  value={assistantJob.title}
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
                  onChange={handleFormImage}
                />
                 {(edit && editImage === assistantJob.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{assistantJob.image}</p>:""}
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
                  value={assistantJob.description}
                  placeholder="Enter description"
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Requirements</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  rows={2}
                  value={assistantJob.requirement}
                  placeholder="Enter requirements"
                  onChange={handleFormRequirements}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Benefits:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  rows={2}
                  value={assistantJob.benefit}
                  placeholder="Enter benefits"
                  onChange={handleFormBenefits}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Duration:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  rows={2}
                  value={assistantJob.duration}
                  placeholder="Enter duration"
                  onChange={handleFormDuration}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Deadline:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  value={assistantJob.deadline}
                  placeholder="Enter deadline"
                  onChange={handleFormDeadline}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}></Col>
              <Col xs={20} sm={20} md={15} lg={15} xl={15}>
                <ButtonToolbar className="confirmButton">
                  <Button disabled={!cancelForm} color="red" id="cancel" appearance="primary" onClick={handleCancelAssistantJob}>
                    Cancel
                  </Button>
                  { !edit ?
                  <Button disabled={!validateForm} color="green" id="addnew" appearance="primary" onClick={handleAddAssistantJob}>
                    Add New
                  </Button> :
                   <Button disabled={!(validateForm && updateValidation)} color="green" id="addnew" appearance="primary" onClick={handleAddAssistantJob}>
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
          ADDED EGE RESEARCH ASSISTANT JOBS DETAILS
        </h5>
        <div className="Form-DisplayContainer">
          {assistantJobList.map((item) => (
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
                          onClick={handleEditAssistantJob(item)}
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
