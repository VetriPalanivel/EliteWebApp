import React,{useEffect, useState} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import course from "../../../asserts/course.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetCompetetion, updateCompetetion } from "../../../redux/userReducer";

export default function Competetion() {
  const competetion = useSelector ((state) => state.Elite.competetion)
  const dispatch = useDispatch();
  const [competetionList,setCompetetionList] = useState([])
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState("");

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      getCompetetion()
    }},[])
  
    const getCompetetion = async()=>{
      const response =await axios.get("http://localhost:4000/competetion/get");
      setCompetetionList(response.data)
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
    dispatch(updateCompetetion({...competetion,"title" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateCompetetion({...competetion,"description" : event}));
  }
  const handleFormObjective= (event) =>{
    dispatch(updateCompetetion({...competetion,"objective" : event}));
  }
  const handleFormVenue= (event) =>{
    dispatch(updateCompetetion({...competetion,"venue" : event}));
  }
  const handleFormFee= (event) =>{
    dispatch(updateCompetetion({...competetion,"fee" : event}));
  }
  const handleFormLink= (event) =>{
    dispatch(updateCompetetion({...competetion,"link" : event}));
  }

  const handleFormImage = async(e) =>{
    dispatch(updateCompetetion({...competetion, "image" : e.target.files[0]}));
  }
  const handleFormSelect = (event) =>{
    dispatch(updateCompetetion({...competetion,"mode" : event}));
  }

  const validateForm = competetion.image && competetion.title && competetion.description && competetion.mode && competetion.objective && competetion.venue && competetion.fee && competetion.link
  const cancelForm = competetion.image || competetion.title || competetion.description || competetion.mode || competetion.objective || competetion.venue || competetion.fee || competetion.link
  
  const handleUpdateValidation = () => {
    const tempCompetetion = competetionList.filter(
      (item) => item.id === competetion?.id
    );
    return (
      tempCompetetion[0]?.title !== competetion?.title ||
      tempCompetetion[0]?.image !== competetion?.image ||
      tempCompetetion[0]?.mode !== competetion?.mode ||
      tempCompetetion[0]?.description !== competetion?.description ||
      tempCompetetion[0]?.objective !== competetion?.objective ||
      tempCompetetion[0]?.venue !== competetion?.venue ||
      tempCompetetion[0]?.fee !== competetion?.fee ||
      tempCompetetion[0]?.link !== competetion?.link
    );
  };
  const updateValidation = handleUpdateValidation();
  const handleAddProject = async() =>{
    const formData = new FormData();
    formData.append('image', competetion.image);
    formData.append('title', competetion.title);
    formData.append('description', competetion.description);
    formData.append('mode', competetion.mode);
    formData.append('objective', competetion.objective);
    formData.append('venue', competetion.venue);
    formData.append('fee', competetion.fee);
    formData.append('link', competetion.link);
    
    if(validateForm){
      if(!edit){
        await axios.post("http://localhost:4000/competetion/create",formData)
      .then(res=>{console.log(res)})
      .catch(e=>{console.log(e)})
      }else{
        await axios.put("http://localhost:4000/competetion/update/"+ competetion.id,formData)
        .then(res=>{console.log(res)})
        .catch(e=>{console.log(e)})
      }
      
      getCompetetion()
      // dispatch(resetCompetetion())
    }  
  }
  const handleRemoveProject = (item) => async() =>{
    await axios
        .post("http://localhost:4000/competetion/delete/"+item.id)
        .then((res) => {
          console.log(res);
          getCompetetion()
        })
        .catch((e) => {
          console.log(e);
        });
  }
  const handleEditProject = (item) => ()  =>{
    setEdit(true)
    dispatch(updateCompetetion({...competetion,
      "description":item.description,
      "image":item.image,
      "title":item.title,
      "mode":item.mode,
  "objective":item.objective,
  "venue":item.venue,
  "fee":item.fee,
  "link":item.link,
      "id":item.id,
    }))
    setEditImage(item.image);
  }

  const handleCancelProject = async() =>{
    dispatch(resetCompetetion())
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
        <h5 className="Form-heading">COMPETETIONS</h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
          <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Competetion Title:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter competetion title"
                  name="title"
                  value={competetion.title}
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
                  onChange={handleFormImage}
                />
                 {(edit && editImage === competetion.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{competetion.image}</p>:""}
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
                  value={competetion.description}
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
                  value={competetion.objective}
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
                  value={competetion.venue}
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
                  value={competetion.mode}
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
                  value={competetion.fee}
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
                  value={competetion.link}
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
        <h5
          className="Display-heading"
        >
          ADDED PROJECT DETAILS
        </h5>
        <div className="Form-DisplayContainer">
          {competetionList.map((item) => (
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
