import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav';
import { Divider, Table, Button, Modal, Form, Input, notification, AutoComplete } from 'antd';
import { getProducts, UpdateProducts, deleteProducts, addProduct, getProductsByGenre } from '../../../services/products';
import { useAuth } from '../../../hooks/useAuth';
import { EditFilled, DeleteFilled, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { createBook } from '../../../services/books';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  BookOutlined, 
  UserOutlined, 
  HomeOutlined,
  KeyOutlined

} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const Productos = () => {
    const [products, setProducts] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectionType] = useState('checkbox');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const [isFormEdited, setIsFormEdited] = useState(false);
    const [genre, setGenre] = useState("");

    const { user } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                const productsWithKey = data.map(product => ({
                    ...product,
                    key: product._id,
                }));
                setProducts(productsWithKey);
            } catch (error) {
                console.error('Error al obtener los libros', error);
            }
        };

        fetchProducts();
    }, []);

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const handleEdit = () => {
        if (selectedRowKeys.length !== 1) {
            openNotification('warning', 'Editar libro', 'Para editar, selecciona un solo libro.');
            return;
        }

        const selectedProduct = products.find(product => product.key === selectedRowKeys[0]);
        setEditingProduct(selectedProduct);
        form.setFieldsValue(selectedProduct);
        setIsModalVisible(true);
        setIsAdding(false);
        setIsFormEdited(false);
    };

    const handleDelete = async () => {
        if (selectedRowKeys.length !== 1) {
            openNotification('warning', 'Eliminar libro', 'Para eliminar, selecciona un solo libro.');
            return;
        }

        try {
            await deleteProducts(selectedRowKeys[0]);
            const newProducts = products.filter(product => product.key !== selectedRowKeys[0]);
            setProducts(newProducts);
            openNotification('success', 'Eliminar libro', 'El libro se eliminó correctamente.');
            console.log('Libro eliminado', selectedRowKeys[0]);
        } catch (error) {
            console.error('Error al eliminar el libro', error);
            openNotification('error', 'Error', 'Hubo un problema al eliminar el libro.');
        }
    };

    const handleAdd = () => {
        if (selectedRowKeys.length > 0) {
            openNotification('warning', 'Agregar libro', 'Para agregar, no debes seleccionar ningún libro.');
            return;
        }

        form.resetFields(); 
        setEditingProduct(null);
        setIsModalVisible(true);
        setIsAdding(true);
    };

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            if (!isFormEdited) {
                openNotification('warning', 'Editar libro', 'No has realizado cambios.');
                return;
            }

            try {
                if (isAdding) {
                    const newProduct = await createBook(values);
                    setProducts([...products, { ...newProduct, key: newProduct._id }]);
                    openNotification('success', 'Agregar libro', 'El libro se agregó correctamente.');
                } else {
                    await UpdateProducts(editingProduct.key, values);
                    setProducts(products.map(product =>
                        (product.key === editingProduct.key ? { ...product, ...values } : product)
                    ));
                    openNotification('success', 'Editar libro', 'El libro se editó correctamente.');
                }
                setIsModalVisible(false);
                setEditingProduct(null);
            } catch (error) {
                console.error('Error al guardar el libro', error);
                openNotification('error', 'Error', 'Hubo un problema al guardar el libro.');
            }
        }).catch(info => {
            console.log('Validación fallida:', info);
        });
    };

    const handleCancel = () => {
        if (isFormEdited) {
            openNotification('info', 'Editar/Agregar libro', 'No has guardado los cambios.');
            return;
        }

        form.resetFields();
        setIsModalVisible(false);
        setEditingProduct(null);
        setIsFormEdited(false);
    };

    const handleGenreChange = async (value) => {
        setGenre(value);
        if (value) {
            try {
                const data = await getProductsByGenre(value);
                const productsWithKey = data.map(product => ({
                    ...product,
                    key: product._id,
                }));
                setProducts(productsWithKey);
            } catch (error) {
                console.error('Error al obtener los libros por género', error);
                openNotification('error', 'Error', 'Hubo un problema al obtener los libros por género.');
            }
        } else {
            try {
                const data = await getProducts();
                const productsWithKey = data.map(product => ({
                    ...product,
                    key: product._id,
                }));
                setProducts(productsWithKey);
            } catch (error) {
                console.error('Error al obtener los libros', error);
            }
        }
    };

    const columns = [
        {
            title: 'Nombre del Libro',
            dataIndex: 'name',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
        },
        {
            title: 'Autor',
            dataIndex: 'author',
        },
        {
            title: 'Género',
            dataIndex: 'genre',
        }
    ];

    const rowSelection = {
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
        getCheckBoxProps: (record) => ({
            disabled: record.name === 'Disabled user',
            name: record.name,
        }),
    };

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
                navigate('/editprofile');
              break;
            case '4':
              navigate('/productos');
              break;
            default:
              break;
          }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {user && (
                <>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="demo-logo-vertical" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['4']}
                            onClick={({ key }) => handleMenuClick(key)}
                            items={[
                                { key: '1', icon: <HomeOutlined />, label: 'Home'},
                                { key: '2', icon: <KeyOutlined />, label: 'Editar contraseña'},
                                { key: '3', icon: <UserOutlined/>, label: 'Editar perfil'},
                                { key: '4', icon: <BookOutlined />, label: 'Libros'},
                            ]}
                        />
                    </Sider>
                </>
            )}
            <Layout>
                {user && (
                    <>
                        <Header style={{ padding: 0, background: colorBgContainer }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{ fontSize: '16px', width: 64, height: 64 }}
                            />
                        </Header>
                    </>
                )}
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
                    <div>
                        <div className="products-container">
                            {user && (
                                <>
                                    <Button type="primary" onClick={handleAdd}><PlusCircleOutlined /> Agregar libro</Button>
                                    <Button type="primary" onClick={handleEdit}><EditFilled /></Button>
                                    <Button type="primary" onClick={handleDelete}><DeleteFilled /></Button>
                                    <AutoComplete
                                        style={{ width: 200, marginRight: 8 }}
                                        value={genre}
                                        onChange={handleGenreChange}
                                        placeholder="Género"
                                    />
                                    
                                </>
                            )}
                            <Table
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
                                }}
                                columns={columns}
                                dataSource={products}
                                scroll={{ y: 400 }}
                            />
                        </div>
                        <Modal
                            title={isAdding ? "Agregar libro " : "Editar libro "}
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={editingProduct}
                                onValuesChange={() => setIsFormEdited(true)}
                            >
                                <Form.Item
                                    name="name"
                                    label="Nombre"
                                    rules={[{ required: true, message: 'Por favor ingrese el nombre del libro' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="price"
                                    label="Precio"
                                    rules={[{ required: true, message: 'Por favor ingrese el precio del libro' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="author"
                                    label="Autor"
                                    rules={[{ required: true, message: 'Por favor ingrese el autor del libro' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="genre"
                                    label="Género"
                                    rules={[{ required: true, message: 'Por favor ingrese el género del libro' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Productos;
