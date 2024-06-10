import React, { useState } from 'react';
import './FormLogin.css'
import { Form, Input, Button, Card, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../../../services/auth';
import { useAuth } from '../../../hooks/useAuth';

const FormLogin = () => {

    const useAuthData = useAuth();
    console.log(useAuthData);

const navigate = useNavigate();
//Estado de carga
const [loading, setLoading] = useState(false);

//Estado para el error del login
const [loginError, setLoginError] = useState(false);

//Función para enviar los datos del formulario
const onFinish = async (values) => {
    setLoading(true); //Establece el estado de carga a true al enviar el formulario
    setLoginError(false);
    try {
        const response = await authService.loginF(values.username, values.password);
//        console.log('Inicio de sesión exitoso:', response.data);
if (response && response.data) {
    localStorage.setItem('token', response.data.token);
    console.log(response.data.token)
    navigate('/');
}
else{
    console.error('Error en el inicio de sesión:', error.response.data);
    setLoginError(true);
}
    } catch (error) {
    console.error('Error en el inicio de sesión:', error.response ? error.response.data : error.message);
     setLoginError(true);   
    }finally{
        setLoading(false);//Establece el estado de carga a falso despues de recibir la contraseña
    }
};

//Función para mostrar errores en el formulario
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setLoginError(true);
};

    return (
        <>
        <Card
        title='Bienvenido de nuevo!!'
        bordered={false}
        className='responsive-card'
        >
            <Form
                name="normal_login"
                className='login-form'
                initialValues={{
                        remember: true,
                }} 
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message:'Por favor ingrese su correo'
                    }
                ]}                
                >
                    <Input prefix={<UserOutlined/>} placeholder='Correo' />
                </Form.Item>
                <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message:'Por favor ingrese su contraseña'
                    }
                ]}                
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder='Password' />
                </Form.Item>
                <Form.Item>
                {loginError && <p style={{ color: 'red' }}>Credenciales incorrectas. Inténtalo de nuevo.</p>}
                    <Button type="primary" htmlType="submit" className='login-form-button' loading={loading}>
                        Ingresar
                    </Button>
                </Form.Item>
                Aún no tienes cuenta? <a href="">Registrate</a>
            </Form>
        </Card>
        </>
    );
}

export default FormLogin;