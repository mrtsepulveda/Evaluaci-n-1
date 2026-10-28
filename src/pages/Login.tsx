import { Link, useNavigate } from 'react-router-dom'
import FormularioLogin from '../components/organisms/FormularioLogin'

interface LoginProps {
  onIniciarSesion: (correo: string) => void
}

function Login({ onIniciarSesion }: LoginProps) {
  const navegar = useNavigate()

  const manejarIngreso = (correo: string) => {
    onIniciarSesion(correo)
    navegar('/')
  }

  return (
    <section className="card shadow-sm mx-auto" style={{ maxWidth: 420 }}>
      <div className="card-body p-4">
        <div className="text-center mb-3">
          <img src="/img/logo_maestros.jpg" alt="Logo Ferretería Los Maestros" height={80} className="rounded-circle mb-2" />
          <h2 className="h4">Iniciar sesión</h2>
        </div>
        <FormularioLogin onIngresar={manejarIngreso} />
        <p className="small text-center mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>.
        </p>
      </div>
    </section>
  )
}

export default Login
