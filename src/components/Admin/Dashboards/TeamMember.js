import React,{useEffect, useState} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import course from "../../../asserts/course.png";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetTeamMember, updateTeamMember , updateOpenPopup, updatePopupData} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";

export default function TeamMember() {
  const teamMember = useSelector ((state) => state.Elite.teamMember)
  const dispatch = useDispatch();
  const [teamMemberList,setTeamMemberList] = useState([])
  const [edit,setEdit] = useState(false)
  const [editImage,setEditImage] = useState("");
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      getTeamMembers()
    }},[])
  
    const getTeamMembers = async()=>{
      const response =await getApi('team_member/get');
      if(response?.status === "Failed"){
        openPopup('error','Network Error! Try again later.')
      }else{
        setTeamMemberList(response?.data);
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
  
  const handleFormName = (event) =>{
    dispatch(updateTeamMember({...teamMember,"name" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateTeamMember({...teamMember,"description" : event}));
  }
  const handleFormImage = async(e) =>{
    dispatch(updateTeamMember({...teamMember, "image" : e.target.files[0]}));
  }
  const handleFormRole= (event) =>{
    dispatch(updateTeamMember({...teamMember,"role" : event}));
  }

  const validateForm = teamMember.image && teamMember.name && teamMember.description && teamMember.role
  const cancelForm = teamMember.image || teamMember.name || teamMember.description || teamMember.role
 
  const handleUpdateValidation = () =>{
    const tempTeamMember = teamMemberList.filter((item)=>item.id === teamMember?.id)
    return (tempTeamMember[0]?.name !==teamMember?.name || tempTeamMember[0]?.image !==teamMember?.image || tempTeamMember[0]?.role !==teamMember?.role || tempTeamMember[0]?.description !==teamMember?.description)
  }
  const updateValidation = handleUpdateValidation();
  const handleAddProject = async() =>{
    const formData = new FormData();
    formData.append('image', teamMember.image);
    formData.append('name', teamMember.name);
    formData.append('description', teamMember.description);
    formData.append('role', teamMember.role);
    
    if(validateForm){
      if(!edit){
        const response = await postApi('team_member/create',formData);
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
        const response = await putApi('team_member/update/'+ teamMember.id,formData)
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
      handleCancelProject();
      closePopup();
       getTeamMembers()
    }  
  }

  const handleRemoveProject = (item) => async() =>{
        const response = await postApi('team_member/delete/'+ item.id)
        if(response?.status === "Failed"){
          openPopup('error','Network Error! Try again later.')
        }else if(response?.status_code === 200)
         {
          openPopup('info','Data successfully deleted.')
        }else if(response?.status_code === 400)
        {
          openPopup('error','Data deletion Failed.')
        }
        getTeamMembers()
        closePopup()
  }

  const handleEditProject = (item) => ()  =>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setEdit(true)
    dispatch(updateTeamMember({...teamMember,
      "description":item.description,
      "image":item.image,
      "name":item.name,
      "role":item.role,
      "id":item.id,
    }))
    setEditImage(item.image);
  }

  const handleCancelProject = async() =>{
    dispatch(resetTeamMember())
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
        <h5 className="Form-heading">EGE TEAM MEMBER</h5>
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
                  value={teamMember.name}
                  onChange={handleFormName}
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
                  onChange={handleFormImage}
                />
                  {(edit && editImage === teamMember.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{teamMember.image}</p>:""}
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
                  value={teamMember.description}
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Nationality Role:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter role"
                  name="role"
                  value={teamMember.role}
                  onChange={handleFormRole}
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
          ADDED EGE TEAM MEMBER DETAILS
        </h5>
        <Grid>
        <div className="Form-DisplayContainer">
          {teamMemberList.map((item) => (
             <Col xs={24} sm={24} md={8} lg={8} xl={8} key={item} >
            <Card
              className="Form-DisplayCard-Teammember"
            >
              <CardContent>
                      <Avatar
                        alt=""
                        className="Form-DisplayCard-Tmember-img"
                          style={{
                            margin:"0 auto",
                            borderRadius:"10px",
                            marginBottom:"20px"
                        }}
                        src={`${baseUrl}${item.image}`}
                      />
                      <div>
                        <h6 className="Display-content-heading-member" >
                        {item.name}
                        </h6>
                        <p className="Display-content-text-member">
                        {item.role}
                        </p>
                        <CardActions
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            variant="text"
                            // href="#text-buttons"
                            color="blue"
                            appearance="primary"
                            endIcon={<ArrowRightIcon />}
                          >
                            Read More
                          </Button>
                        </CardActions>
                      </div>
                    <div className="Display-content-edit-member">
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
