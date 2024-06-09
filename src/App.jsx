
import { DatePicker, ConfigProvider } from 'antd'; 
import './App.css'
import LayoutComponent from './assets/components/Layout';
import Imagen from './assets/components/FormLogin/imagen';
import FormLogin from './assets/components/FormLogin';

function App() {

  return (
<LayoutComponent
leftColSize={{xs: 24, sm: 12, md:8, lg:6}}
rightColSize={{xs: 24, sm: 12, md:16, lg:18}}
leftContent={<Imagen />}
rightContent={<FormLogin />}
></LayoutComponent>
  )
}

export default App
