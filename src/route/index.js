import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import {ADMIN_HOME, REDIRECT_HOME } from '../constants/route';
import Dashboard from '../components/Admin/Dashboard';
import LandingPage from '../components/Admin/LandingPage'
import PageNotFound from '../PageNotFound';
import Login from '../components/Admin/Login';
import Register from '../components/Admin/Register';
import { useSelector } from 'react-redux';
import ViewProfile from '../components/Admin/Dashboards/ViewProfile';
import LandingPageUser from '../components/Users/LandingPageUser';
import TrainingOfTrainers from '../components/TrainingOfTrainers';
import HomePage from '../components/Users/HomePage';
import ResearchProjects from '../components/Users/ResearchProjects';
import WorkShops from '../components/Workshop';
import Competetion from '../components/Competition';


function MainRoutes() {
  const Authenticate = useSelector((state) => state.Elite.authenticate)
  return (
    <>
        <Routes>
        {Authenticate && <Route path={ADMIN_HOME} element={<LandingPage />} />}
          <Route path="admin/login" element={<Login />} />
          {Authenticate && <Route path="admin/register" element={<Register />} />}
          <Route path="home" element={<HomePage/>} />
          <Route
            exact
            path="/"
            element={<Navigate to ="home" replace />}
          />
         
          <Route path="*" element={<Navigate to ="admin/login" replace />}/>
          <Route path="viewprofile" element={<ViewProfile />} />
          <Route path ="trainers" element={<TrainingOfTrainers/>}></Route>
          <Route path="researchProjects" element={<ResearchProjects />} />
          <Route path ="workshop" element={<WorkShops/>}></Route>
          <Route path ="competition" element={<Competetion/>}></Route>
        </Routes>
    </>
  );
}

export default MainRoutes;
