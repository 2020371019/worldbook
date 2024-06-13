
import { Button } from 'antd';
import React from 'react'
import { useAuth } from '../../../hooks/useAuth';
import Nav from '../../components/Nav';
import Products from '../../components/Products';

const Productos = () => {

    const {user, logout} = useAuth();

    return (
        <>
        <Nav/>
        <Products></Products>
        <Button onClick={() => logout()}>Cerrar Sesión</Button>
        </>
    );
}

export default Productos;