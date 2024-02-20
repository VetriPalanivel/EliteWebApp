import React, { useEffect, useState,useRef } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetCourse, updateCourse , updateOpenPopup, updatePopupData} from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";

export default function Courses() {
  const course = useSelector((state) => state.Elite.course);
  const dispatch = useDispatch();
  const [courseList, setCourseList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      getCourses();
    }
  }, []);

  const inputRef = useRef(null);
  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const getCourses = async () => {
    const response =await getApi('course/get');
    if(response?.status === "Failed"){
      openPopup('error','Network Error! Try again later.')
    }else{
      setCourseList(response?.data);
    }
    closePopup()
  };

  const SelectOption = [
    {
      label: "Online",
      value: "Online",
    },
    {
      label: "Physical",
      value: "Physical",
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

  const handleFormTitle = (event) => {
    dispatch(updateCourse({ ...course, title: event }));
  };
  const handleFormDomain = (event) => {
    dispatch(updateCourse({ ...course, domain: event }));
  };
  const handleFormDescription = (event) => {
    dispatch(updateCourse({ ...course, description: event }));
  };
  const handleFormObjective = (event) => {
    dispatch(updateCourse({ ...course, objective: event }));
  };
  const handleFormLink = (event) => {
    dispatch(updateCourse({ ...course, link: event }));
  };
  const handleFormDuration = (event) => {
    dispatch(updateCourse({ ...course, duration: event }));
  };
  const handleFormBenefit = (event) => {
    dispatch(updateCourse({ ...course, benefit: event }));
  };
  const handleFormStructure = (event) => {
    dispatch(updateCourse({ ...course, structure: event }));
  };

  const handleFormImage = async (e) => {
    dispatch(updateCourse({ ...course, image: e.target.files[0] }));
  };
  const handleFormSelect = (event) => {
    dispatch(updateCourse({ ...course, mode: event }));
  };

  const validateForm =
    course.domain &&
    course.image &&
    course.title &&
    course.description &&
    course.mode &&
    course.objective &&
    course.benefit &&
    course.duration &&
    course.structure &&
    course.link;
  const cancelForm =
    course.domain ||
    course.image ||
    course.title ||
    course.description ||
    course.mode ||
    course.objective ||
    course.benefit ||
    course.duration ||
    course.structure ||
    course.link;
  const handleUpdateValidation = () => {
    const tempCourse = courseList.filter((item) => item.id === course?.id);
    return (
      tempCourse[0]?.domain !== course?.domain ||
      tempCourse[0]?.title !== course?.title ||
      tempCourse[0]?.image !== course?.image ||
      tempCourse[0]?.mode !== course?.mode ||
      tempCourse[0]?.description !== course?.description ||
      tempCourse[0]?.objective !==course?.objective ||
      tempCourse[0]?.benefit !==course?.benefit ||
      tempCourse[0]?.duration !==course?.duration ||
      tempCourse[0]?.structure !==course?.structure ||
      tempCourse[0]?.link !==course?.link
    );
  };
  const updateValidation = handleUpdateValidation();
  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append("image", course.image);
    formData.append("title", course.title);
    formData.append("domain", course.domain);
    formData.append("description", course.description);
    formData.append("mode", course.mode);
    formData.append("duration", course.duration);
    formData.append("objective", course.objective);
    formData.append("benefit", course.benefit);
    formData.append("structure", course.structure);
    formData.append("link", course.link);

    if (validateForm) {
      if(!edit){
        const response = await postApi('course/create',formData);
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
        const response = await putApi('course/update/'+ course.id,formData)
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
      resetFileInput()
      getCourses();
    }
  };
  const handleEditProject = (item) => ()  =>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setEdit(true)
    dispatch(updateCourse({...course,
      "description":item.description,
      "image":item.image,
      "title":item.title,
       "domain":item.domain,
      "mode":item.mode,
      "objective":item.objective,
  "duration":item.duration,
  "benefit":item.benefit,
  "structure":item.structure,
  "link":item.link,
      "id":item.id,
    }))
    setEditImage(item.image);
  }

  const handleRemoveProject = (item) => async() =>{
        const response = await postApi('course/delete/'+ item.id)
        if(response?.status === "Failed"){
          openPopup('error','Network Error! Try again later.')
        }else if(response?.status_code === 200)
         {
          openPopup('info','Data successfully deleted.')
        }else if(response?.status_code === 400)
        {
          openPopup('error','Data deletion Failed.')
        }
        getCourses();
        closePopup()
  }

  const handleCancelProject = async () => {
    dispatch(resetCourse());
    resetFileInput();
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
                  ref={inputRef}
                  required
                  onChange={handleFormImage}
                />
                 {(edit && editImage === course.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{course.image}</p>:""}
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
                  <Button
                    disabled={!validateForm}
                    color="green"
                    id="addnew"
                    appearance="primary"
                    onClick={handleAddProject}
                  >
                    Add New
                  </Button> :
                  <Button
                  disabled={!(validateForm && updateValidation)}
                  color="green"
                  id="addnew"
                  appearance="primary"
                  onClick={handleAddProject}
                >
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
        <h5 className="Display-heading">ADDED EGE COURSE DETAIL</h5>
        <div className="Form-DisplayContainer">
          {courseList.map((item) => (
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
                        src={`${baseUrl}${item.image}`}
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
