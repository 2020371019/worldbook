import React, { useState } from "react";
import { Drawer, Avatar } from 'antd';
import { UserOutlined } from "@ant-design/icons";

const DrawerComponent = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
        <Avatar
        onClick={showDrawer}
        size={44}
        style={{ 
            backgroundColor: 'yellow',
            cursor: 'pointer' }}
        icon={<UserOutlined/>}/>
        <Drawer
        title="Basic Drawer" onClose={onClose} open={open}
        style={{ 
            backgroundColor: 'teal',
            cursor: 'pointer' }}>
            <p>Soem contents....</p>
            <p>Soem contents....</p>
            <p>Soem contents....</p>


        </Drawer>
            </>
    )
}

export default DrawerComponent;