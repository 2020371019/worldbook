import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useAuth } from "../../hooks/useAuth";


const AppRoutes = () => {
    const { user } = useAuth();
    let routes = useRoutes([
        { path: '/', element: user ?  <Home/> : <Login/>},
        {path: '/register', element: <Register />},
        {path: '/', element: <Home />}
    ])

    return routes;
}

export default AppRoutes;