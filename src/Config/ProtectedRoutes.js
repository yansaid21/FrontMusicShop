import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context";
import { type } from "@testing-library/user-event/dist/type";
import { Auth } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { User } from "../api/user";

export const ProtectedRoutes = ({ children,permission }) => {
const userController = new User();
const authController = new Auth();
const [user, setUser] = useState(null);


const checkUserSession = async () => {
    const accessToken = await authController.getAccessToken();
    //console.log("access token dentro de protectedRoutes",accessToken);
    const response = await userController.getMeLater(accessToken);
    console.log("response dentro del protectedUsers",response);
    setUser(response);
    console.log(`accessToken = ${accessToken}`);
  };
      checkUserSession();
  useEffect(() => {
    if (!user) {
        <Navigate to="login" />;
    }
  }, [user]);
  console.log("type de permission", typeof(permission));
  console.log("permission",permission);

  console.log("user en protectedRoutes", user);
    if(user && user.role === permission){
        return children ? children : <Outlet />;
    }
};
