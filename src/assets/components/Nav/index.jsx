
/*
import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header } = Layout;
import book from '../../book.jpg';
import './Nav.css';
import DrawerComponent from "../Drawer";

const Nav = () => {

    const tabNames = ["Home", "Productos"];
    const items = tabNames.map((name, index) => ({
        key: index +1,
        label: name,
        url: index === 0 ? "/" : `/${name.toLowerCase()}`,
    }));

    return (
        <Header className="header-content">
            <Link to="/">
                <img src={book} alt="logo" 
                style={{
                    height: 100,
                    width: 150
                }}/>
            </Link>
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                flex: 1,
                minWidth: 0,
                marginRight: '20px'
            }}
            >
                
                {items.map(item => (
                    <Menu.Item key={item.key}>
                        <Link to={item.url}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
            <DrawerComponent/>
        </Header>
    )
}

export default Nav;

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