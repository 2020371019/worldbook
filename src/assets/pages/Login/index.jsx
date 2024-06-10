import Imagen from '../../components/FormLogin/imagen';
import FormLogin from '../../components/FormLogin';
import LayoutComponent from '../../components/Layout';

function Login() {

  return (
<LayoutComponent
leftColSize={{xs: 24, sm: 12, md:8, lg:6}}
rightColSize={{xs: 24, sm: 12, md:16, lg:18}}
leftContent={<Imagen />}
rightContent={<FormLogin />}
></LayoutComponent>
  )
}

export default Login
