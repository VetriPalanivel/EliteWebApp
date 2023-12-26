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
import course from "../../../asserts/course.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetCourse, updateCourse } from "../../../redux/userReducer";

export default function Courses() {
  const course = useSelector ((state) => state.Elite.course)
  const dispatch = useDispatch();
  const[courseList,setCourseList] = useState([])
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      getCourses()
    }},[])
  
    const getCourses= async()=>{
      const response =await axios.get("http://localhost:4000/get_course");
      setCourseList(response.data)
    }

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
    dispatch(updateCourse({...course,"title" : event}));
  }
  const handleFormDomain = (event) =>{
    dispatch(updateCourse({...course,"domain" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateCourse({...course,"description" : event}));
  }
  const handleFormObjective= (event) =>{
    dispatch(updateCourse({...course,"objective" : event}));
  }
  const handleFormLink= (event) =>{
    dispatch(updateCourse({...course,"link" : event}));
  }
  const handleFormDuration= (event) =>{
    dispatch(updateCourse({...course,"duration" : event}));
  }
  const handleFormBenefit= (event) =>{
    dispatch(updateCourse({...course,"benefit" : event}));
  }
  const handleFormStructure= (event) =>{
    dispatch(updateCourse({...course,"structure" : event}));
  }

  const handleFormImage = async(e) =>{
    dispatch(updateCourse({...course, "image" : e.target.files[0]}));
  }
  const handleFormSelect = (event) =>{
    dispatch(updateCourse({...course,"mode" : event}));
  }

  const validateForm = course.domain && course.image && course.title && course.description && course.mode && course.objective && course.benefit && course.duration && course.structure && course.link
  const cancelForm = course.domain || course.image || course.title || course.description || course.mode || course.objective || course.benefit || course.duration || course.structure || course.link
 
  const handleAddProject = async() =>{
    const formData = new FormData();
    formData.append('image', course.image);
    formData.append('title', course.title);
    formData.append('domain', course.domain);
    formData.append('description', course.description);
    formData.append('mode', course.mode);
    formData.append('duration', course.duration);
    formData.append('objective', course.objective);
    formData.append('benefit', course.benefit);
    formData.append('structure', course.structure);
    formData.append('link', course.link);
    
    if(validateForm){
      await axios.post("http://localhost:4000/post_course",formData)
      .then(res=>{console.log(res)})
      .catch(e=>{console.log(e)})
      // dispatch(resetCourse())
      getCourses()
    }  
  }

  const handleCancelProject = async() =>{
    dispatch(resetCourse())
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
        <h5 className="Form-heading">EGE COURSES</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Course Domain:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter course domain"
                  name="domain"
                  value={course.domain}
                  onChange={handleFormDomain}
                  required
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Course Title:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter course title"
                  name="title"
                  value={course.title}
                  onChange={handleFormTitle}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Course Image:</label>
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
                  value={course.description}
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
                  value={course.objective}
                  rows={2}
                  onChange={handleFormObjective}
                  required
                  placeholder="Enter objective"
                />
              </Col>
            </Row>
           

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Course Duration:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter course duration"
                  name="duration"
                  value={course.duration}
                  onChange={handleFormDuration}
                  required
                />
              </Col>
            </Row>
            
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Course Mode:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <SelectPicker
                  className="Form-select"
                  size="md"
                  placeholder="Select course mode"
                  data={SelectOption}
                  name="mode"
                  value={course.mode}
                  onChange={handleFormSelect}
                  required
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Course Benefits:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter course benefit"
                  name="benefit"
                  value={course.benefit}
                  onChange={handleFormBenefit}
                  required
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Course Structure:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter course structure"
                  name="structure"
                  value={course.structure}
                  onChange={handleFormStructure}
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
                  value={course.link}
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
          {courseList.map((item) => (
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
