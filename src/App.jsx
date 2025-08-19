import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Cuerpo from './components/Cuerpo'
import Encabezado from './components/Encabezado'
import Footer from './components/Footer'
import './components/css/App.css'
import Login from './components/Login'

/*function App({nombre}) {
  const saludo = "hola " + nombre;
  return(
    <>
    <h1>{saludo}</h1>
    </>
  );
}*/

function App() {
  // const saludo = "hola";

  const [sesionActiva, setSesionActiva] = useState(false);
  const [user, setUser] = useState(null);

  //Cargamos los estados del LocalStorage al iniciar
  useEffect(() => {

    const ses = localStorage.getItem("sesion") == "activa";
    const usu = JSON.parse(localStorage.getItem("usuario") || null);
    setSesionActiva(ses);
    setUser(usu);

  }, []);

  const handleLoginSuccess = () => {

    setSesionActiva(true);
    setUser(JSON.parse(localStorage.getItem("usuario") || null));
  }

  const handleLogout = () => {
    setSesionActiva(false);
    localStorage.removeItem("sesion");
    setUser(null);
  }

  if (!sesionActiva) {
    return <Login onlogin={handleLoginSuccess} />
  }

  return (
    <>
      <Encabezado
        user={user}
        sesionActiva={sesionActiva}
        onLogout={handleLogout}
      />

      <Cuerpo user={user} />
      <Footer />
    </>
  );
}

export default App
