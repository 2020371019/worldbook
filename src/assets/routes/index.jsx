import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Productos from "../pages/Productos";
import { useAuth } from "../../hooks/useAuth";


const AppRoutes = () => {
    const { user } = useAuth();
    let routes = useRoutes([
        { path: '/', element: user ?  <Home/> : <Login/>},
        {path: '/register', element: <Register />},
        { path: '/login', element: <Login/>},
        { path: '/productos', element: <Productos/>},
    ])

    return routes;
}

export default AppRoutes;