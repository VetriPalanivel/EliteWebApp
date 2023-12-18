import React,{useEffect} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import axios from "axios";
import { Button, ButtonToolbar } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import course from "../../../asserts/course.png";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetExhibition, updateExhibition } from "../../../redux/userReducer";

export default function Exhibition() {
  const exhibition = useSelector ((state) => state.Elite.exhibition)
  const dispatch = useDispatch();
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  },[])
  const SelectOption = [
    {
      label: "Online",
      value: "Online",
    },
    {
      label: "Physical",
      value: "Physical",
    }
  ];

  const handleFormTitle = (event) =>{
    dispatch(updateExhibition({...exhibition,"title" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateExhibition({...exhibition,"description" : event}));
  }
  const handleFormObjective= (event) =>{
    dispatch(updateExhibition({...exhibition,"objective" : event}));
  }
  const handleFormVenue= (event) =>{
    dispatch(updateExhibition({...exhibition,"venue" : event}));
  }
  const handleFormFee= (event) =>{
    dispatch(updateExhibition({...exhibition,"fee" : event}));
  }
  const handleFormLink= (event) =>{
    dispatch(updateExhibition({...exhibition,"link" : event}));
  }

  const handleFormImage = async(e) =>{
    dispatch(updateExhibition({...exhibition, "image" : e.target.files[0]}));
  }
  const handleFormSelect = (event) =>{
    dispatch(updateExhibition({...exhibition,"mode" : event}));
  }

  const validateForm = exhibition.image && exhibition.title && exhibition.description && exhibition.mode && exhibition.objective && exhibition.venue && exhibition.fee && exhibition.link
  const cancelForm = exhibition.image || exhibition.title || exhibition.description || exhibition.mode || exhibition.objective || exhibition.venue || exhibition.fee || exhibition.link
 
  const handleAddProject = () =>{
    const formData = new FormData();
    formData.append('image', exhibition.image);
    formData.append('title', exhibition.title);
    formData.append('description', exhibition.description);
    formData.append('mode', exhibition.mode);
    formData.append('objective', exhibition.objective);
    formData.append('venue', exhibition.venue);
    formData.append('fee', exhibition.fee);
    formData.append('link', exhibition.link);
    
    if(validateForm){
      axios.post("http://localhost:4000/Exhibition",formData)
      .then(res=>{console.log(res)})
      .catch(e=>{console.log(e)})
      dispatch(resetExhibition())
    }  
  }

  const handleCancelProject = async() =>{
    dispatch(resetExhibition())
  }


  return (
    <div className="researchProjects-container">
      <div className="Form-div">
        <h5 className="Form-heading">EXHIBITIONS</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
          <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Exhibition Title:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter exhibition title"
                  name="title"
                  value={exhibition.title}
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
                <label class="Form-label">Description:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  rows={2}
                  name="description"
                  value={exhibition.description}
                  placeholder="Enter description"
                  onChange={handleFormDescription}
                  required
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Objective:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-textArea"
                  as="textarea"
                  name="objective"
                  value={exhibition.objective}
                  rows={2}
                  onChange={handleFormObjective}
                  required
                  placeholder="Enter objective"
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Venue:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter venue"
                  name="venue"
                  value={exhibition.venue}
                  onChange={handleFormVenue}
                  required
                />
              </Col>
            </Row>
            
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Mode:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <SelectPicker
                  className="Form-select"
                  size="md"
                  placeholder="Select the mode"
                  data={SelectOption}
                  name="mode"
                  value={exhibition.mode}
                  onChange={handleFormSelect}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Fee:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter fee"
                  name="fee"
                  value={exhibition.fee}
                  onChange={handleFormFee}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Registration Link:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter registration link"
                  name="fee"
                  value={exhibition.link}
                  onChange={handleFormLink}
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
