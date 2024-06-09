
import { DatePicker, ConfigProvider } from 'antd'; 
import './App.css'
import LayoutComponent from './assets/components/Layout';
import Imagen from './assets/components/FormLogin/imagen';
import FormLogin from './assets/components/FormLogin';
import FormRegister from './assets/components/FormRegister';

function App() {

  return (
<LayoutComponent
leftColSize={{xs: 24, sm: 12, md:16, lg:18}}
rightColSize={{xs: 24, sm: 12, md:8, lg:6}}
leftContent={<Imagen />}
rightContent={<FormRegister />}
></LayoutComponent>
  )
}

export default App
