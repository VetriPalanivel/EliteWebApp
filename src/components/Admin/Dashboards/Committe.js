import React,{useEffect,useState} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Whisper } from 'rsuite';
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import course from "../../../asserts/course.png";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetCommitte, updateCommitte } from "../../../redux/userReducer";

export default function Committe() {
  const committe = useSelector ((state) => state.Elite.committe)
  const dispatch = useDispatch();
  const [committeList,setCommitteList] = useState([])
  const [edit,setEdit] = useState(false)
  const [editImage,setEditImage] = useState("");
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      getCommitte()
    }},[])
  
    const getCommitte = async()=>{
      const response =await axios.get("http://localhost:4000/committe/get");
      setCommitteList(response.data)
    }

  
  const handleFormName = (event) =>{
    dispatch(updateCommitte({...committe,"name" : event}));
  }
  const handleFormOrganization= (event) =>{
    dispatch(updateCommitte({...committe,"organization" : event}));
  }
  const handleFormImage = async(e) =>{
    dispatch(updateCommitte({...committe, "image" : e.target.files[0]}));
  }
  const handleFormRole= (event) =>{
    dispatch(updateCommitte({...committe,"role" : event}));
  }

  const validateForm = committe.image && committe.name && committe.organization && committe.role
  const cancelForm = committe.image || committe.name || committe.organization || committe.role
  const handleUpdateValidation = () =>{
    const tempCommitte = committeList.filter((item)=>item.id === committe?.id)
    return (tempCommitte[0]?.name !==committe?.name || tempCommitte[0]?.image !==committe?.image || tempCommitte[0]?.role !==committe?.role || tempCommitte[0]?.organization !==committe?.organization)
  }
  const updateValidation = handleUpdateValidation();
  const handleAddProject = async() =>{
    const formData = new FormData();
    formData.append('image', committe.image);
    formData.append('name', committe.name);
    formData.append('organization', committe.organization);
    formData.append('role', committe.role);
    
    if(validateForm){
      if(!edit){
        await axios.post("http://localhost:4000/committe/create",formData)
        .then(res=>{console.log(res)})
        .catch(e=>{console.log(e)})
      }else{
        await axios.put("http://localhost:4000/committe/update/"+committe.id,formData)
        .then(res=>{console.log(res)})
        .catch(e=>{console.log(e)})
      }
      
      // dispatch(resetCommitte())
      getCommitte()
    }  
  }
  const handleRemoveProject = (item) => async() =>{
    await axios
        .post("http://localhost:4000/committe/delete/"+item.id)
        .then((res) => {
          console.log(res);
          getCommitte()
        })
        .catch((e) => {
          console.log(e);
        });
  }

  const handleEditProject = (item) => ()  =>{
    setEdit(true)
    dispatch(updateCommitte({...committe,
      "organization":item.organization,
      "image":item.image,
      "name":item.name,
      "role":item.role,
      "id":item.id,
    }))
    setEditImage(item.image);
  }
  

  const handleCancelProject = async() =>{
    dispatch(resetCommitte())
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
        <h5 className="Form-heading">SCIENTIFIC COMMITTEE</h5>
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
                  value={committe.name}
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
                 {(edit && editImage === committe.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{committe.image}</p>:""}
                </div>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Organization:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter organization"
                  name="organization"
                  value={committe.organization}
                  onChange={handleFormOrganization}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Role:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter role"
                  name="role"
                  value={committe.role}
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
          ADDED PROJECT DETAILS
        </h5>
        <div className="Form-DisplayContainer">
          {committeList.map((item) => (
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
                        {item.name}
                        </h6>
                        <p className="Display-content-text">
                        {truncateText(item.organization, 60)}
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
