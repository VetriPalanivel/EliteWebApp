import React,{useEffect, useState} from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Uploader } from "rsuite";
import { Button, ButtonToolbar } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Whisper } from 'rsuite';
import CloudUploadIcon from "@mui/icons-material/Upload";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import course from "../../../asserts/course.png";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { resetSponsors, updateSponsors } from "../../../redux/userReducer";

export default function Sponsors() {
  const sponsors = useSelector ((state) => state.Elite.sponsors)
  const dispatch = useDispatch();
  const [sponsorsList,setSponsorsList] = useState([])
  const [edit,setEdit] = useState(false)
  const [editImage,setEditImage] = useState("");
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      getSponsors()
    }},[])
  
    const getSponsors = async()=>{
      const response =await axios.get("http://localhost:4000/sponsors/get");
      setSponsorsList(response.data)
    }

  const SelectOption = [
    {
      label: "Sponsor",
      value: "Sponsor",
    },
    {
      label: "Collaborator",
      value: "Collaborator",
    },
  ];

  const handleFormName = (event) =>{
    dispatch(updateSponsors({...sponsors,"name" : event}));
  }
  const handleFormDescription= (event) =>{
    dispatch(updateSponsors({...sponsors,"description" : event}));
  }
  const handleFormImage = async(e) =>{
    dispatch(updateSponsors({...sponsors, "image" : e.target.files[0]}));
  }
  const handleFormCountry= (event) =>{
    dispatch(updateSponsors({...sponsors,"country" : event}));
  }
  const handleFormSelect = (event) =>{
    dispatch(updateSponsors({...sponsors,"type" : event}));
  }

  const validateForm = sponsors.image && sponsors.name && sponsors.description && sponsors.type && sponsors.country
  const cancelForm = sponsors.image || sponsors.name || sponsors.description || sponsors.type || sponsors.country
  const handleUpdateValidation = () =>{
    const tempSponsors = sponsorsList.filter((item)=>item.id === sponsors?.id)
    return (tempSponsors[0]?.name !==sponsors?.name || tempSponsors[0]?.image !==sponsors?.image || tempSponsors[0]?.type !==sponsors?.type || tempSponsors[0]?.description !==sponsors?.description ||tempSponsors[0]?.country !==sponsors?.country)
  }
  const updateValidation = handleUpdateValidation();
  const handleAddProject = async() =>{
    const formData = new FormData();
    formData.append('image', sponsors.image);
    formData.append('name', sponsors.name);
    formData.append('description', sponsors.description);
    formData.append('type', sponsors.type);
    formData.append('country', sponsors.country);
    
    if(validateForm){
      if(!edit){
        await axios.post("http://localhost:4000/sponsors/create",formData)
        .then(res=>{console.log(res)})
        .catch(e=>{console.log(e)})
      }else{
        await axios.put("http://localhost:4000/sponsors/update/"+sponsors.id,formData)
        .then(res=>{console.log(res)})
        .catch(e=>{console.log(e)})
      }
     
      // dispatch(resetSponsors())
      getSponsors()
    }  
  }

  const handleRemoveProject = (item) => async() =>{
    await axios
        .post("http://localhost:4000/sponsors/delete/"+item.id)
        .then((res) => {
          console.log(res);
          getSponsors()
        })
        .catch((e) => {
          console.log(e);
        });
  }

  const handleEditProject = (item) => ()  =>{
    setEdit(true)
    dispatch(updateSponsors({...sponsors,
      "description":item.description,
      "image":item.image,
      "name":item.name,
      "type":item.type,
      "country":item.country,
      "id":item.id,
    }))
    setEditImage(item.image);
  }

  const handleCancelProject = async() =>{
    dispatch(resetSponsors())
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
        <h5 className="Form-heading">EGE SPONSORS/COLLABORATORS </h5>
        <div className="Form-container">
          <Grid className="Form-field" fluid>
            
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">organization Name:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <Input
                  className="Form-input"
                  size="md"
                  placeholder="Enter name"
                  name="name"
                  value={sponsors.name}
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
                 {(edit && editImage === sponsors.image) ? <p className="Form-textArea" style={{padding:"5px",color:"rgb(133, 133, 133)"}}>{sponsors.image}</p>:""}
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
                  value={sponsors.description}
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
                  value={sponsors.country}
                  onChange={handleFormCountry}
                  required
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <label class="Form-label">Type:</label>
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                <SelectPicker
                  className="Form-select"
                  size="md"
                  placeholder="Select the type"
                  data={SelectOption}
                  name="type"
                  value={sponsors.type}
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
          ADDED PROJECT DETAILS
        </h5>
        <div className="Form-DisplayContainer">
          {sponsorsList.map((item) => (
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
