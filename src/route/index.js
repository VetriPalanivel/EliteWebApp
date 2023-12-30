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

function MainRoutes() {
  const Authenticate = useSelector((state) => state.Elite.authenticate)
  return (
    <>
        <Routes>
        {Authenticate && <Route path={ADMIN_HOME} element={<LandingPage />} />}
          <Route path="admin/login" element={<Login />} />
          {Authenticate && <Route path="admin/register" element={<Register />} />}
          <Route
            exact
            path="/"
            element={<Navigate to ="admin/login" replace />}
          />
          <Route path="*" element={<Navigate to ="admin/login" replace />}/>
          <Route path="viewprofile" element={<ViewProfile />} />
        </Routes>
    </>
  );
}

export default MainRoutes;
