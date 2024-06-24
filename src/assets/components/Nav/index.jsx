<<<<<<< HEAD

/*
import React from "react";
=======
import React, { useContext } from "react";
>>>>>>> liliana
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import book from "../../book.jpg"; // Asegúrate de que esta ruta sea correcta
import './Nav.css';
import DrawerComponent from "../Drawer";

const { Header } = Layout;

<<<<<<< HEAD
    const tabNames = ["Home", "Productos"];
=======
const Nav = () => {
    const { user } = useContext(AuthContext);

    const tabNames = ["Inicio", "Productos", "Servicios", "Contacto"];
>>>>>>> liliana
    const items = tabNames.map((name, index) => ({
        key: index + 1,
        label: <Link to={index === 0 ? "/" : `/${name.toLowerCase()}`}>{name}</Link>
    }));

    if (user) {
        items.push({
            key: 'perfil',
            label: <Link to="/perfil">Perfil</Link>
        });
    }

    return (
        <Header className="header-content">
            <Link to="/">
                <img src={book} alt="logo" style={{ height: 100, width: 150 }} />
            </Link>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={items} // Usar 'items' en lugar de 'children'
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flex: 1,
                    minWidth: 0,
                    marginRight: '20px'
                }}
            />
            <DrawerComponent />
        </Header>
    );
};

export default Nav;
<<<<<<< HEAD

*/


import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';


const { Header, Sider, Content } = Layout;

const Nav = () => {
    const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          
        </Header>
      </Layout>
    </Layout>
  );
};

export default Nav;
=======
>>>>>>> liliana
