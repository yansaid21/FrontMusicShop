import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GeneralRoutes, allRoutesProject, AdminRoutes } from './Config/Routes';
import { AuthContext, AuthProvider } from './context';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoutes } from './Config/ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            {GeneralRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <route.component/>}
              />
            ))
          }
          <Route element={<ProtectedRoutes permission={'admin'}/>}>

          {AdminRoutes.map((route,index) =>(
            <Route key={index}
            path={route.path}
            element={
            <route.layout>
              <route.component/>
            </route.layout>
          }
          />
            ))}
            </Route>
            </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
