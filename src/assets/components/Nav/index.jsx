import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import book from "../../book.jpg"; // Asegúrate de que esta ruta sea correcta
import './Nav.css';
import DrawerComponent from "../Drawer";

const { Header } = Layout;

const Nav = () => {
    const { user } = useContext(AuthContext);

    const tabNames = ["Inicio", "Productos", "Servicios", "Contacto"];
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
