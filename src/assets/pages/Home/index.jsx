
import { Button } from 'antd';
import React from 'react'
import { useAuth } from '../../../hooks/useAuth';

const Home = () => {

    const {user, logout} = useAuth();

    return (
        <>
        <h1>Home</h1>       
        <h1>Bienvenid@ {user.username}</h1> 
        <Button onClick={() => logout()}>Cerrar Sesión</Button>
        </>
    );
}

export default Home;