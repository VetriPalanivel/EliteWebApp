import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import {ADMIN_HOME, REDIRECT_HOME } from '../constants/route';
import Dashboard from '../components/Admin/Dashboard';
import LandingPage from '../components/Admin/LandingPage'
import PageNotFound from '../PageNotFound';

function MainRoutes() {
  return (
    <>
        <Routes>
          <Route path={ADMIN_HOME} element={<LandingPage />} />
          <Route
            exact
            path={REDIRECT_HOME}
            element={<Navigate to={ADMIN_HOME} replace />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  );
}

export default MainRoutes;
