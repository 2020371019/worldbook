import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { Divider, Table, Button, Modal, Form, Input } from 'antd';
import { getProducts, UpdateProducts, deleteProducts, addProduct } from '../../../services/products';

const Productos = () => {
    const [products, setProducts] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

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
                console.error('Error al obtener los productos', error);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (record) => {
        setEditingProduct(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
        setIsAdding(false);
    };

    const handleDelete = async (key) => {
        try {
            await deleteProducts(key);
            const newProducts = products.filter((product) => product.key !== key);
            setProducts(newProducts);
            console.log('Producto eliminado', key);
        } catch (error) {
            console.error('Error al eliminar el producto', error);
        }
    };

    const handleAdd = () => {
        form.resetFields();
        setEditingProduct(null);
        setIsModalVisible(true);
        setIsAdding(true);
    };

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            try {
                if (isAdding) {
                    const newProduct = await addProduct(values);
                    setProducts([...products, { ...newProduct, key: newProduct._id }]);
                } else {
                    await UpdateProducts(editingProduct.key, values);
                    setProducts(products.map(product => 
                        (product.key === editingProduct.key ? { ...product, ...values } : product)
                    ));
                }
                setIsModalVisible(false);
                setEditingProduct(null);
            } catch (error) {
                console.error('Error al guardar el producto', error);
            }
        }).catch(info => {
            console.log('Validación fallida:', info);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingProduct(null);
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Genero',
            dataIndex: 'genre',
        },
        {
            title: 'Acciones',
            render: (text, record) => (
                <div>
                    <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
                    <Button type="link" onClick={() => handleDelete(record.key)}>Eliminar</Button>
                </div>
            ),
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckBoxProps: (record) => ({
            disabled: record.name === 'Disabled user',
            name: record.name,
        }),
    };

    return (
        <div>
            <Nav />
            <Divider />
            <div className="products-container">
                <Button type="primary" onClick={handleAdd}>Agregar Producto</Button>
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
                title={isAdding ? "Agregar Producto" : "Editar Producto"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={editingProduct}
                >
                    <Form.Item
                        name="name"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre del producto' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Precio"
                        rules={[{ required: true, message: 'Por favor ingrese el precio del producto' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="Author"
                        rules={[{ required: true, message: 'Por favor ingrese el autor del producto' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="genre"
                        label="Género"
                        rules={[{ required: true, message: 'Por favor ingrese el género del producto' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Productos;
