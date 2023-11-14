import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context";
import { type } from "@testing-library/user-event/dist/type";
import { useAuth } from "../hooks/useAuth";
export const ProtectedRoutes = ({ children,permission }) => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
        console.log("user dentro de useeffect",user);   
    }else{
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
