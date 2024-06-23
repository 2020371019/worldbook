import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav';
import { Divider, Table, Button, Modal, Form, Input, message } from 'antd';
import { getProducts, UpdateProducts, deleteProducts, addProduct } from '../../../services/products';
import { useAuth } from '../../../hooks/useAuth';
import { EditFilled, DeleteFilled, PlusCircleOutlined } from '@ant-design/icons';

const Productos = () => {
    const [products, setProducts] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectionType] = useState('checkbox');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const [isFormEdited, setIsFormEdited] = useState(false); // Nuevo estado para controlar si se han realizado cambios en el formulario

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

    const handleEdit = () => {
        if (selectedRowKeys.length !== 1) {
            message.warning('Para editar, selecciona un solo libro.', 3);
            return;
        }

        const selectedProduct = products.find(product => product.key === selectedRowKeys[0]);
        setEditingProduct(selectedProduct);
        form.setFieldsValue(selectedProduct);
        setIsModalVisible(true);
        setIsAdding(false);
        setIsFormEdited(false); // Reinicia el estado de isFormEdited al abrir la modal de edición
    };

    const handleDelete = async () => {
        if (selectedRowKeys.length !== 1) {
            message.warning('Para eliminar, selecciona un solo libro.', 3);
            return;
        }

        try {
            await deleteProducts(selectedRowKeys[0]);
            const newProducts = products.filter(product => product.key !== selectedRowKeys[0]);
            setProducts(newProducts);
            console.log('Libro eliminado', selectedRowKeys[0]);
        } catch (error) {
            console.error('Error al eliminar el libro', error);
        }
    };

   
    

    const handleAdd = () => {

        if (selectedRowKeys.length > 0) {
            message.warning('Para agregar, no debes seleccionar ningún libro.', 3);
            return;
        }


        form.resetFields(); // Siempre limpiar el formulario al agregar
        setEditingProduct(null);
        setIsModalVisible(true);
        setIsAdding(true);
    };
    
    

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            if (!isFormEdited) {
                message.warning('No has realizado cambios.', 3);
                return;
            }
    
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
                window.location.reload(); // Recargar la página después de agregar o editar
            } catch (error) {
                console.error('Error al guardar el libro', error);
            }
        }).catch(info => {
            console.log('Validación fallida:', info);
        });
    };
    

    const handleCancel = () => {
        // Verificar si se han realizado cambios en el formulario
            // Si se han realizado cambios, limpiar el formulario y cerrar la modal
            form.resetFields();
            setIsModalVisible(false);
            setEditingProduct(null);
            setIsFormEdited(false);
            
        
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

    return (
        <div>
            {user && <Nav />}
            <Divider />
            <div className="products-container">
                {user && (
                    <>
                        <Button type="primary" onClick={handleAdd}><PlusCircleOutlined /> Agregar libro</Button>
                        <Button 
                            type="primary" 
                            onClick={handleEdit} 
                        >
                            <EditFilled />
                        </Button>
                        <Button 
                            type="primary" 
                            onClick={handleDelete} 
                        >
                            <DeleteFilled />
                        </Button>
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
                title={isAdding ? "Agregar libro" : "Editar libro"}
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
    );
};

export default Productos;
