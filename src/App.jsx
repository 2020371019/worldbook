import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './assets/routes';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from 'antd';

function App() {

  return (
<AuthProvider>
    <ConfigProvider
    theme={{
      token: {
          colorPrimary: '#7A83E1'
      }}}>
          <BrowserRouter>
              <AppRoutes />
          </BrowserRouter>
    </ConfigProvider>
</AuthProvider>
  )
}

export default App;
