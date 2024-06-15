import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Productos from "../pages/Productos";
import Profile from "../components/Profile"; // Ajusta la ruta según tu estructura de archivos
import { useAuth } from "../../hooks/useAuth"; // Ajusta la ruta del hook según tu estructura de archivos

const AppRoutes = () => {
    const { user } = useAuth(); // Usa el hook useAuth para obtener el estado de autenticación

    const routes = useRoutes([
        { path: "/", element: user ? <Home /> : <Login /> }, // Página de inicio: muestra Home si está autenticado, de lo contrario muestra Login
        { path: "/register", element: <Register /> }, // Página de registro
        { path: "/login", element: <Login /> }, // Página de inicio de sesión
        { path: "/productos", element: <Productos /> }, // Página de productos
        { path: "/perfil", element: user ? <Profile /> : <Login /> }, // Página de perfil: muestra Profile si está autenticado, de lo contrario muestra Login
    ]);

    return routes;
};

export default AppRoutes;
