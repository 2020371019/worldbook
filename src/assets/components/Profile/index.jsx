import React, { useContext, useState } from "react";
import { Form, Input, Button, message } from "antd";
import auth from "../../../services/auth";
import { AuthContext } from "../../../context/AuthContext";

const Profile = () => {
    const { email, token } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');

    const handleSave = async () => {
        try {
            const response = await auth.changePassword(email, newPassword, token);
            message.success(response.data.message);
        } catch (error) {
            message.error('Error al cambiar la contraseña');
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Perfil</h1>
            <Form layout="vertical">
                <Form.Item label="Correo">
                    <Input value={email} disabled />
                </Form.Item>
                <Form.Item label="Nueva Contraseña">
                    <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;
