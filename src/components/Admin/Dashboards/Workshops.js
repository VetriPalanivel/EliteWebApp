import React,{useEffect, useState} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import axios from "axios";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloudUploadIcon from "@mui/icons-material/Upload";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import course from "../../../asserts/course.png";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetWorkshop, updateWorkshop } from "../../../redux/userReducer";

export default function Workshops() {
  const workshop = useSelector ((state) => state.Elite.workshop)
  const dispatch = useDispatch();
  const [workShopList,setWorkShopList] = useState([])
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState("");
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      getWorkshops()
    }},[])
  
    const getWorkshops = async()=>{
      const response =await axios.get("http://localhost:4000/workshop/get");
      setWorkShopList(response.data)
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
    dispatch(updateWorkshop({...workshop,"title" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateWorkshop({...workshop,"description" : event}));
  }
  const handleFormObjective= (event) =>{
    dispatch(updateWorkshop({...workshop,"objective" : event}));
  }
  const handleFormVenue= (event) =>{
    dispatch(updateWorkshop({...workshop,"venue" : event}));
  }
  const handleFormFee= (event) =>{
    dispatch(updateWorkshop({...workshop,"fee" : event}));
  }
  const handleFormLink= (event) =>{
    dispatch(updateWorkshop({...workshop,"link" : event}));
  }

  const handleFormImage = async(e) =>{
    dispatch(updateWorkshop({...workshop, "image" : e.target.files[0]}));
  }
  const handleFormSelect = (event) =>{
    dispatch(updateWorkshop({...workshop,"mode" : event}));
  }

  const validateForm = workshop.image && workshop.title && workshop.description && workshop.mode && workshop.objective && workshop.venue && workshop.fee && workshop.link
  const cancelForm = workshop.image || workshop.title || workshop.description || workshop.mode || workshop.objective || workshop.venue || workshop.fee || workshop.link
  
  const handleUpdateValidation = () => {
    const tempWorkshop = workShopList.filter(
      (item) => item.id === workshop?.id
    );
    return (
      tempWorkshop[0]?.title !== workshop?.title ||
      tempWorkshop[0]?.image !== workshop?.image ||
      tempWorkshop[0]?.mode !== workshop?.mode ||
      tempWorkshop[0]?.description !== workshop?.description ||
      tempWorkshop[0]?.objective !== workshop?.objective ||
      tempWorkshop[0]?.venue !== workshop?.venue ||
      tempWorkshop[0]?.fee !== workshop?.fee ||
      tempWorkshop[0]?.link !== workshop?.link
    );
  };
  const updateValidation = handleUpdateValidation();

  const handleAddProject = async() =>{
    const formData = new FormData();
    formData.append('image', workshop.image);
    formData.append('title', workshop.title);
    formData.append('description', workshop.description);
    formData.append('mode', workshop.mode);
    formData.append('objective', workshop.objective);
    formData.append('venue', workshop.venue);
    formData.append('fee', workshop.fee);
    formData.append('link', workshop.link);
    
    if(validateForm){
      if(!edit){
        await axios.post("http://localhost:4000/workshop/create",formData)
        .then(res=>{console.log(res)})
        .catch(e=>{console.log(e)})
      }
      else{
        await axios.put("http://localhost:4000/workshop/update/"+ workshop.id,formData)
        .then(res=>{console.log(res)})
        .catch(e=>{console.log(e)})
      }
     
      getWorkshops();
      // dispatch(resetWorkshop())
    }  
  }
  const handleRemoveProject = (item) => async() =>{
    await axios
        .post("http://localhost:4000/workshop/delete/"+item.id)
        .then((res) => {
          console.log(res);
          getWorkshops();
        })
        .catch((e) => {
          console.log(e);
        });
  }
  const handleEditProject = (item) => ()  =>{
    setEdit(true)
    dispatch(updateWorkshop({...workshop,
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
    dispatch(resetWorkshop())
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
        <h5 className="Form-heading">WORKSHOPS</h5>
        <div className="Form-container">
        <Grid className="Form-field" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Workshop Title:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter workshop title"
                  name="title"
                  value={workshop.title}
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
                 {(edit && editImage === workshop.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{workshop.image}</p>:""}
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
                  value={workshop.description}
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
                  value={workshop.objective}
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
                  value={workshop.venue}
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
                  value={workshop.mode}
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
                  value={workshop.fee}
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
                  value={workshop.link}
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
          {workShopList.map((item) => (
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
