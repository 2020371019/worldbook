import LayoutComponent from '../../components/Layout';
import Imagen from '../../components/FormLogin/imagen';
import FormRegister from '../../components/FormRegister';

function Register() {

  return (
<LayoutComponent
leftColSize={{xs: 24, sm: 12, md:16, lg:18}}
rightColSize={{xs: 24, sm: 12, md:8, lg:6}}
leftContent={<Imagen />}
rightContent={<FormRegister />}
></LayoutComponent>
  )
}

export default Register
