import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GeneralRoutes, AdminRoutes, SellerRoutes } from './Config/Routes';
import { AuthProvider } from './context';
import { ProtectedRoutes } from './Config/ProtectedRoutes';


function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

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
            <Route element={<ProtectedRoutes permission={'user'}/>}>

          {SellerRoutes.map((route,index) =>(
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
      </LocalizationProvider>
    </AuthProvider>
  );
};

export default App;
