import React, { useState } from 'react';
import './FormRegister.css'
import { Form, Input, Button, Card, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/auth';
import { validatePassword } from '../../../utils/validation';

const FormRegister = () => {
    const navigate = useNavigate();
   //Estado de error del registro
   const [registerError, setRegisterError] = useState(false);
   //Estado de carga
   const [loading, setLoading] = useState(false);

//Función para enviar los datos del formulario
const onFinish = async (values) => {
    setLoading(true); //Establece el estado de carga a true al enviar el formulario
    try {
        const response = await authService.register(values.username, values.correo, values.password);
        console.log('Registro exitoso:');
        navigate('/login');
    } catch (error) {
     console.error('Error en el registro:', error.response.data);
     setRegisterError(true);   
    }finally{
        setLoading(false);//Establece el estado de carga a falso despues de recibir la contraseña
    }
};

//Función para mostrar errores en el formulario
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setRegisterError(true);
};


    return (
        <>
       <Card
    title="Registro de Usuario"
    bordered={false}
    className='responsive-card'
    >
            <Form
                name="normal_register"
                className='register-form'
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
                        message:'Por favor ingrese su usario'
                    }
                ]}                
                >
                    <Input prefix={<UserOutlined/>} placeholder='Username' />
                </Form.Item>

                <Form.Item
                name="correo"
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
                    <Input.Password
                    prefix={<LockOutlined/>} 
                    type='password'
                    placeholder='Password' />
                </Form.Item>

                <Form.Item
                name='password-repet'
                rules={[
                    {
                        required: true,
                        message:'Por favor repita su contraseña'
                    },
                    ({getFieldValue}) => validatePassword({getFieldValue}),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className='site-form-item-icon'/>}
                    type="password"
                    placeholder='Repetir contraseña'
                />
                </Form.Item>

                <Form.Item
                name="Rol"
                rules={[
                    {
                        required: true,
                        message:'Por favor ingrese su Rol'
                    }
                ]}                
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder='Rol' />
                </Form.Item>

                

                <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-buttton' loading={loading}>
                Registrarse
            </Button>
        </Form.Item>
        ¿Ya tienes cuenta? <a href=''>Inicia Sesión</a>
       </Form>
        </Card>
        </>
    );
}

export default FormRegister;