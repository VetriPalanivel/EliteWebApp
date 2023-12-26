import React,{useEffect, useState} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import course from "../../../asserts/course.png";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetAmbassador, updateAmbassador } from "../../../redux/userReducer";

export default function Ambassador() {
  const ambassador = useSelector ((state) => state.Elite.ambassador)
  const dispatch = useDispatch();
  const [ambassadorList,setAmbassadorList] = useState([])
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      getAmbassadors()
    }},[])
  
    const getAmbassadors = async()=>{
      const response =await axios.get("http://localhost:4000/get_ambassador");
     setAmbassadorList(response.data)
    }
  
  
  const handleFormName = (event) =>{
    dispatch(updateAmbassador({...ambassador,"name" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateAmbassador({...ambassador,"description" : event}));
  }
  const handleFormImage = async(e) =>{
    dispatch(updateAmbassador({...ambassador, "image" : e.target.files[0]}));
  }
  const handleFormFlag = async(e) =>{
    dispatch(updateAmbassador({...ambassador, "flag" : e.target.files[0]}));
  }
  const handleFormCountry= (event) =>{
    dispatch(updateAmbassador({...ambassador,"country" : event}));
  }

  const validateForm = ambassador.image && ambassador.name && ambassador.description && ambassador.country && ambassador.flag
  const cancelForm = ambassador.image || ambassador.name || ambassador.description || ambassador.country || ambassador.flag
  
  const handleAddProject = async() =>{
    const formData = new FormData();
    formData.append('images', ambassador.image);
    formData.append('name', ambassador.name);
    formData.append('description', ambassador.description);
    formData.append('country', ambassador.country);
    formData.append('images', ambassador.flag);
    
    if(validateForm){
     await axios.post("http://localhost:4000/post_ambassador",formData)
      .then(res=>{console.log(res)})
      .catch(e=>{console.log(e)})
    //   dispatch(resetAmbassador())
    getAmbassadors()
    }  
  }

  const handleCancelProject = async() =>{
    dispatch(resetAmbassador())
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
        <h5 className="Form-heading">EGE AMBASSADOR</h5>
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
                  value={ambassador.name}
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

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Country:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter country"
                  name="country"
                  value={ambassador.country}
                  onChange={handleFormCountry}
                  required
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Flag:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15} >
                <input
                  className="Form-imageUpload"
                  name="flag"
                  type="file"
                  style={{background:"white",height:"35px",borderRadius:"6px",padding:"5px",color:"rgb(133, 133, 133)"}}
                  required
                  onChange={handleFormFlag}
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
          {ambassadorList.map((item) => (
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
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                      <Avatar
                        alt=""
                        variant="square"
                        className="Form-DisplayCard-img"
                        style={{
                         
                        }}
                        src={`http://localhost:4000/${item.flag}`}
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
