import React, { useState } from 'react';
import Imagen from '../../components/FormLogin/imagen';
import FormLogin from '../../components/FormLogin';
import LayoutComponent from '../../components/Layout';
import Productos from '../Productos';

function Login() {
  const [showProductos, setShowProductos] = useState(false);

  const handleMostrarProductos = () => {
    setShowProductos(true);
  };

  const handleOcultarProductos = () => {
    setShowProductos(false);
  };

  return (
    <LayoutComponent
      leftColSize={{ xs: 24, sm: 12, md: 12, lg: 12 }}
      rightColSize={{ xs: 24, sm: 12, md: 12, lg: 12 }}
      leftContent={
        showProductos ? (
          <>
            <Productos />
            <button onClick={handleOcultarProductos}>Ocultar Productos</button>
          </>
        ) : (
          <button onClick={handleMostrarProductos}>Mostrar Productos</button>
        )
      }
      rightContent={<FormLogin />}
    />
  );
}

export default Login;
