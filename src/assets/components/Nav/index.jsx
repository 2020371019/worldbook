import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import book from "../../book.jpg"; // Ruta corregida para la imagen book
import './Nav.css';
import DrawerComponent from "../Drawer";

const { Header } = Layout;

const Nav = () => {
    const { user } = useContext(AuthContext);

    const tabNames = ["Inicio", "Productos", "Servicios", "Contacto"];
    const items = tabNames.map((name, index) => ({
        key: index + 1,
        label: name,
        url: index === 0 ? "/" : `/${name.toLowerCase()}`,
    }));

    return (
        <Header className="header-content">
            <Link to="/">
                <img src={book} alt="logo" style={{ height: 100, width: 150 }} />
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
                {user && (
                    <Menu.Item key="perfil">
                        <Link to="/perfil">Perfil</Link>
                    </Menu.Item>
                )}
            </Menu>
            <DrawerComponent />
        </Header>
    );
};

export default Nav;
