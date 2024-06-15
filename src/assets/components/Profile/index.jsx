import React, { useContext, useState } from "react";
import { Form, Input, Button, message, App } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import auth from "../../../services/auth";

const Profile = () => {
  const { email, token, user } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");

  const handleSave = async () => {
    try {
      const response = await auth.changePassword(email, newPassword, token);
      if (response.data.success) {
        message.success("Contraseña cambiada correctamente");
      } else {
        message.error("Hubo un error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      message.error("Error al cambiar la contraseña");
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Muestra un indicador de carga mientras se obtiene el estado del usuario
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Perfil</h1>
      <Form layout="vertical">
        <Form.Item label="Correo">
          <Input value={email} disabled />
        </Form.Item>
        <Form.Item label="Nueva Contraseña">
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
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
