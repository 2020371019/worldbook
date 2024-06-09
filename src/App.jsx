
import { DatePicker, ConfigProvider } from 'antd'; 
import './App.css'
import LayoutComponent from './assets/components/Layout';

function App() {

  return (
<LayoutComponent
leftColSize={{xs: 24, sm: 12, md:8, lg:6}}
rightColSize={{xs: 24, sm: 12, md:16, lg:18}}
leftContent={{xs: 24, sm: 12, md:8, lg:6}}
rightContent={{xs: 24, sm: 12, md:8, lg:6}}
></LayoutComponent>
  )
}

export default App
