import { useAuth } from '../../../hooks/useAuth';
import React, { useState } from 'react';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  BookOutlined, 
  UserOutlined, 
  HomeOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Home = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const { colorBgContainer, borderRadiusLG } = theme.useToken().token;
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    switch (key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/perfil');
        break;
      case '3':
        navigate('/productos');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Home' },
            { key: '2', icon: <UserOutlined />, label: 'Perfil' },
            { key: '3', icon: <BookOutlined />, label: 'Libros' },
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
          <h1>Home</h1>
          <h1>Bienvenid {user.readerFound.readername}</h1>
          <h1>Bienvenid {user.readerFound.email}</h1>
          {/* <h1>Bienvenid@ {user.readerFound.password}</h1> */}
          {/* <h1>Bienvenid@ {user.readerFound.email}</h1> */}
          <Button onClick={() => logout()}>Cerrar Sesión</Button>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
