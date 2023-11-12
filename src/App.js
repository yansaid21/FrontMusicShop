import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GeneralRoutes from './Config/Routes';
import { AuthProvider } from './context';
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
              <route.component />
            }
            />
            ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
