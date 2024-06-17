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