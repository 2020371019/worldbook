import React, { useState} from "react";
import { Form, Input, Button, message, Layout, Menu, theme, Card, notification } from "antd";
import { updateUser } from "../../../services/auth";
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

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const { colorBgContainer, borderRadiusLG } = theme.useToken().token;
  const navigate = useNavigate();
//es el usuario que ya inicio sesion  se optiene desde el useAuth
  const handleSave = async () => {
    try {
      await updateUser(user.readerFound._id, newPassword);
      openNotification('success', 'Exito', 'Tu contraseña se ha cambiado correctamente');

      setNewPassword(""); // Limpiar el campo de contraseña después de guardar
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
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
          defaultSelectedKeys={['2']}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Home' },
            { key: '2', icon: <KeyOutlined />, label: 'Editar contraseña' },
            { key: '3', icon: <UserOutlined/>, label: 'Editar perfil' },
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
            overflowX: 'auto', // Scroll horizontal
            overflowY: 'auto', // Scroll vertical
            maxHeight: 'calc(100vh - 64px)', // Altura máxima
          }}
        >
          <Card title="Editar contraseña" bordered={true} style={{ width: 500, marginLeft: 200, marginTop: 100 }}>
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
          </Card>
    
   
    </Content>
    </Layout>
    </Layout>
  );
};

export default Profile;
