import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './assets/routes';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider, App as AntdApp } from 'antd'; // Asegúrate de importar `App` desde `antd`

function App() {
    return (
        <AuthProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#7A83E1'
                    }
                }}
            >
                <AntdApp> {/* Envuelve tu aplicación con `App` de antd */}
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </AntdApp>
            </ConfigProvider>
        </AuthProvider>
    );
}

export default App;
