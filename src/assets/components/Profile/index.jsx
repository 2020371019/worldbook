import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { updateUser } from "../../../services/auth";
import { useAuth } from "../../../hooks/useAuth";

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const { user } = useAuth();
//es el usuario que ya inicio sesion  se optiene desde el useAuth
  const handleSave = async () => {
    try {
      await updateUser(user.readerFound._id, newPassword);
      message.success("Contraseña cambiada correctamente");
      setNewPassword(""); // Limpiar el campo de contraseña después de guardar
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      message.error("Hubo un error al cambiar la contraseña");
    }
  };
//cuando le doy clic se manda a llamar la funcion handleSave
  return (
    <div style={{ padding: "20px" }}>
      <h1>Perfil</h1>
      <h1>{user.readerFound.email}</h1>
      <Form layout="vertical">
        <Form.Item label="Correo">
          <Input value={user.readerFound.email} disabled />
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
