import { createSlice } from "@reduxjs/toolkit";

const ActiveDashboard = {
  id:'1',
  title:"Dashboard"
}

const OnGoingProject = {
title:"",
description:"",
image:"",
status:""
}

const AssistantJob = {
  title:"",
  description:"",
  image:"",
  requirement:"",
  benefit:"",
  duration:"",
  deadline:""
}

const InovationProject ={
title:"",
description:"",
image:"",
status:""
}

const Training = {
  title:"",
  image:"",
  description:"",
  objective:"",
  venue:"",
  mode:"",
  fee:"",
  link:""
}

const Workshop ={
  title:"",
  image:"",
  description:"",
  objective:"",
  venue:"",
  mode:"",
  fee:"",
  link:""
}

const Competetion={
  title:"",
  image:"",
  description:"",
  objective:"",
  venue:"",
  mode:"",
  fee:"",
  link:""
}

const Exhibition ={
title:"",
image:"",
description:"",
objective:"",
venue:"",
mode:"",
fee:"",
link:""
}

const Club ={
  title:"",
  image:"",
  description:"",
  link:""
}

const Course = {
  domain:"",
  title:"",
  image:"",
  description:"",
  objective:"",
  duration:"",
  mode:"",
  benefit:"",
  structure:"",
  link:""
} 

const Role = {
  title:"",
  image:"",
  location:"",
  type:"",
  description:"",
  responsibility:"",
  benefit:""
}

const News = {
  title:"",
  image:"",
  description:"",
  date:""
}

const Committe = {
  name:"",
  image:"",
  organization:"",
  role:""
}
const Ambassador = {
  name:"",
  image:"",
  description:"",
  country:"",
  flag:""
}
const TeamMember = {
  name:"",
  image:"",
  description:"",
  role:""
}
const Sponsors = {
  name:"",
  image:"",
  country:"",
  description:"",
  type:""
}

const initialState = {
  user:[],
  dashboardStatus:true,
  selectedTitle:ActiveDashboard,
  onGoingProject:OnGoingProject,
  assitantJob:AssistantJob,
  inovationProject:InovationProject,
  training:Training,
  workshop:Workshop,
  competetion:Competetion,
  exhibition:Exhibition,
  club:Club,
  course:Course,
  role:Role,
  news:News,
  committe:Committe,
  ambassador:Ambassador,
  teamMember:TeamMember,
  sponsors:Sponsors
};

export const EliteWebsite = createSlice({
  name: "Elite Global Excellance",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      return state;
    },
    updateDasboardStatus:(state,action) =>{
      state.dashboardStatus = action.payload;
      return state;
    },
    updateSelectedTitle:(state,action) =>{
      state.selectedTitle = action.payload;
      return state;
    },
    updateOnGoingProject:(state,action) =>{
      state.onGoingProject = action.payload;
      return state;
    },
    resetOnGoingProject:(state) =>{
      state.onGoingProject = OnGoingProject;
      return state;
    },
    updateAssistantJob:(state,action) =>{
      state.assitantJob = action.payload;
      return state;
    },
    resetAssistantJob:(state) =>{
      state.assitantJob = AssistantJob;
      return state;
    },
    updateInovationProject:(state,action) =>{
      state.inovationProject = action.payload;
      return state;
    },
    resetInovationProject:(state)=>{
      state.inovationProject = InovationProject;
      return state;
    },
    updateTraining:(state,action) =>{
      state.training = action.payload;
      return state;
    },
    resetTraining:(state)=>{
      state.training = Training;
      return state;
    },
    updateWorkshop:(state,action) =>{
      state.workshop = action.payload;
      return state;
    },
    resetWorkshop:(state)=>{
      state.workshop = Workshop;
      return state;
    },
    updateCompetetion:(state,action) =>{
      state.competetion = action.payload;
      return state;
    },
    resetCompetetion:(state)=>{
      state.competetion = Competetion;
      return state;
    },
    updateExhibition:(state,action) =>{
      state.exhibition = action.payload;
      return state;
    },
    resetExhibition:(state)=>{
      state.exhibition = Exhibition;
      return state;
    },
    updateClub:(state,action) =>{
      state.club = action.payload;
      return state;
    },
    resetClub:(state)=>{
      state.club = Club;
      return state;
    },
    updateCourse:(state,action) =>{
      state.course = action.payload;
      return state;
    },
    resetCourse:(state)=>{
      state.course = Course;
      return state;
    },
    updateRole:(state,action) =>{
      state.role = action.payload;
      return state;
    },
    resetRole:(state)=>{
      state.role = Role;
      return state;
    },
    updateNews:(state,action) =>{
      state.news = action.payload;
      return state;
    },
    resetNews:(state)=>{
      state.news = News;
      return state;
    },
    updateCommitte:(state,action) =>{
      state.committe = action.payload;
      return state;
    },
    resetCommitte:(state)=>{
      state.committe = Committe;
      return state;
    },
    updateAmbassador:(state,action) =>{
      state.ambassador = action.payload;
      return state;
    },
    resetAmbassador:(state)=>{
      state.ambassador = Ambassador;
      return state;
    },
    updateTeamMember:(state,action) =>{
      state.teamMember = action.payload;
      return state;
    },
    resetTeamMember:(state)=>{
      state.teamMember = TeamMember;
      return state;
    },
    updateSponsors:(state,action) =>{
      state.sponsors = action.payload;
      return state;
    },
    resetSponsors:(state)=>{
      state.sponsors = Sponsors;
      return state;
    }
   
  },
});

// Action creators are generated for each case reducer function
export const {updateSponsors,resetSponsors,updateTeamMember,resetTeamMember,updateAmbassador,resetAmbassador,updateCommitte,resetCommitte,updateNews,resetNews,updateRole,resetRole,updateCourse,resetCourse,updateClub,resetClub,resetCompetetion,resetExhibition,resetWorkshop,updateCompetetion,updateExhibition,updateWorkshop,updateTraining,resetTraining,updateInovationProject,resetInovationProject,updateAssistantJob,resetAssistantJob, addUser,updateDasboardStatus,updateSelectedTitle,resetOnGoingProject,updateOnGoingProject } =
EliteWebsite.actions;

export default EliteWebsite.reducer;
