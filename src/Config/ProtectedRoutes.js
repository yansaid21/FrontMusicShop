import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Auth } from "../api/auth";
import { User } from "../api/user";

export const ProtectedRoutes = ({ children, permission }) => {
  const userController = new User();
  const authController = new Auth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const accessToken = await authController.getAccessToken();
        const response = await userController.getMeLater(accessToken);
        setUser(response);
      } catch (error) {
        console.error("Error al obtener la sesión del usuario", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez, después del montaje.

  if (loading) {
    // Mientras se está cargando la sesión, podrías mostrar un indicador de carga.
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="login" />;
  }

  if (user.role === permission) {
    return children ? children : <Outlet />;
  }

  // Puedes agregar un manejo adicional si el usuario no tiene los permisos necesarios.
  console.error("El usuario no tiene los permisos necesarios");
  return <Navigate to="unauthorized" />;
};
    