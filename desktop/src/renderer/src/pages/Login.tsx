import AuthCard from '@renderer/components/Login/AuthCard'
import DecorLines from '@renderer/components/Login/DecorLines'
import FormularioLogin from '@renderer/components/Login/FormularioLogin'
import FormularioRecuperacion from '@renderer/components/Login/FormularioRecuperacion'
import FormularioRegistro from '@renderer/components/Login/FormularioRegistro'
import { useAuthFlow } from '@renderer/context/AuthFlowContext'
import AuthFlowProvider from '@renderer/context/AuthFlowProvider'
import backgroundImage from '@renderer/img/puno_f.webp'
import logoVertical from '@renderer/img/vertical_logo_sin_fondo.png'

export default function Login(): React.JSX.Element {
  return (
    <AuthFlowProvider>
      <LoginScreen />
    </AuthFlowProvider>
  )
}

function LoginScreen(): React.JSX.Element {
  const { stage, goTo } = useAuthFlow()

  return (
    <main className="relative h-screen w-full overflow-hidden bg-surface">
      {/* Fondo de pantalla + overlays de profundidad */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(3, 12, 9, 0.92) 0%, rgba(3, 12, 9, 0.55) 45%, rgba(3, 12, 9, 0.16) 68%, rgba(3, 12, 9, 0.7) 100%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(2, 8, 6, 0.55) 0%, transparent 16%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(0deg, rgba(2, 8, 6, 0.45) 0%, transparent 22%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 100% 18%, rgba(30, 215, 96, 0.10) 0%, transparent 38%)' }}
        />
        <DecorLines variant="background" />
      </div>

      {/* Lado izquierdo: contenido de la marca (visible en pantallas anchas) */}
      <section className="absolute inset-y-0 left-0 z-20 hidden w-[46%] flex-col pl-20 pr-10 pt-14 xl:flex">
        <div>
          <img
            src={logoVertical}
            alt="GM Ingenieros y Consultores"
            draggable={false}
            className="w-[280px]"
          />
        </div>

        <div className="mt-[72px]">
          <div className="h-1 w-16 rounded-full bg-brand" />
          <h2 className="mt-6 text-[clamp(34px,3.3vw,50px)] font-extrabold leading-[1.14] tracking-tight">
            <span className="block text-white">
              COMPROMETIDOS
              <br />
              CON LA CALIDAD
            </span>
            <span className="block font-semibold text-white/50">
              Y LAS NECESIDADES
              <br />
              DE NUESTROS CLIENTES
            </span>
          </h2>
        </div>

        <div className="mt-auto pb-14">
          <div className="h-1 w-10 rounded-full bg-white/80" />
          <p className="mt-4 text-[17px] font-bold tracking-wide text-white">INGENIERÍA & PROYECTOS</p>
          <p className="mt-1 text-[15px] text-white/60">Soluciones sostenibles para un mejor futuro.</p>
        </div>
      </section>

      {/* Lado derecho: tarjeta de autenticación */}
      <section className="absolute inset-y-0 right-0 z-20 flex items-center justify-center px-10 xl:justify-end xl:pr-12">
        <AuthCard onBack={stage === 'login' ? undefined : () => goTo('login')}>
          <div key={stage} className="auth-form-enter">
            {stage === 'login' && <FormularioLogin />}
            {stage === 'registro' && <FormularioRegistro />}
            {stage === 'recuperacion' && <FormularioRecuperacion />}
          </div>
        </AuthCard>
      </section>
    </main>
  )
}
