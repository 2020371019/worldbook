
import { Button } from 'antd';
import React from 'react'
import { useAuth } from '../../../hooks/useAuth';
import Nav from '../../components/Nav';

const Home = () => {

    const {user, logout} = useAuth();

    return (
        <>
        <Nav/>
        <h1>Home</h1>   
        <h1>Bienvenid@ {user.readerFound.readername}</h1> 
        <Button onClick={() => logout()}>Cerrar Sesión</Button>
        </>
    );
}

export default Home;