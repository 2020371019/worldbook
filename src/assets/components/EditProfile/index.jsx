import React, { useState } from "react";
import { Form, Input, Button, message, Layout, Menu, theme, Card, notification } from "antd";
import { upUser } from "../../../services/auth";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  BookOutlined, 
  UserOutlined, 
  HomeOutlined,
  KeyOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const EditProfile = () => {
  const [newReadername, setNewReadername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const { colorBgContainer, borderRadiusLG } = theme.useToken().token;
  const navigate = useNavigate();

  const handleSave = async () => {
    if (newReadername === "" && newEmail === "") {
      openNotification('warning', 'Sin cambios', 'No se han realizado cambios en los datos');
      return;
    }
    try {
      await upUser(user.readerFound._id, newReadername, newEmail);
      openNotification('success', 'Cambios realizados', 'Datos cambiados con éxito');
      setNewReadername(""); // Limpiar el campo de nombre después de guardar
      setNewEmail(""); // Limpiar el campo de correo después de guardar
      setTimeout(() => {
        window.location.reload(); // Recargar la página después de cerrar la notificación después de 3 segundos
      }, 1500); 
    } catch (error) {
      console.error("Error al cambiar los datos:", error);
      openNotification('error', 'Error', 'Hubo un error al cambiar los datos');
    }
  };

  const handleMenuClick = (key) => {
    switch (key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/perfil');
        break;
      case '3':
        navigate('/editprofile');
        break;
      case '4':
        navigate('/productos');
        break;
      default:
        break;
    }
  };


  const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['3']}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Home' },
            { key: '2', icon: <KeyOutlined />, label: 'Editar contraseña' },
            { key: '3', icon: <UserOutlined />, label: 'Editar perfil' },
            { key: '4', icon: <BookOutlined />, label: 'Libros' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowX: 'auto',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 64px)',
          }}
        >
          <Card title="Editar perfil" bordered={true} style={{ width: 500, marginLeft: 200, marginTop: 100 }}>
            <Form layout="vertical">
              <Form.Item label="Nombre">
                <Input 
                  value={newReadername}
                  onChange={(e) => setNewReadername(e.target.value)}
                  placeholder={user.readerFound.readername} 
                />
              </Form.Item>
              <Form.Item label="Correo">
                <Input 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder={user.readerFound.email}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleSave}>
                  Guardar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditProfile;
