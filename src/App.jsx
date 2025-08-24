import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Cuerpo from './components/Cuerpo'
import Encabezado from './components/Encabezado'
import Footer from './components/Footer'
import './components/css/App.css'
import Login from './components/Login'
import Todo from './components/Todo'

function App() {
  const [sesionActiva, setSesionActiva] = useState(false);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "ligth");
  const [vista, setVista] = useState("inicio");
  const [loading, setLoading] = useState(true); // ← Nuevo estado loading

  // Cargamos los estados del LocalStorage al iniciar
  useEffect(() => {
    const ses = localStorage.getItem("sesion") === "activa";
    const usuRaw = localStorage.getItem("usuario");
    const usu = usuRaw ? JSON.parse(usuRaw) : null;
    setSesionActiva(ses);
    setUser(usu);

    // tema
    const savedTheme = localStorage.getItem("theme") || "ligth";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    setLoading(false); // ← Finalizamos loading
  }, []);

  const handleLoginSuccess = () => {
    setSesionActiva(true);
    setUser(JSON.parse(localStorage.getItem("usuario") || null));
  }

  const handleLogout = () => {
    setSesionActiva(false);
    localStorage.removeItem("sesion");
    localStorage.removeItem("usuario");
    setUser(null);
    setVista("inicio"); // ← Volver a inicio al cerrar sesión
  }

  const toggleTheme = () => {
    const next = theme === "ligth" ? "dark" : "ligth"
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  const NavegarPagina = () => {
    if (loading) {
      return <div>Cargando...</div>; // ← Loading mientras se verifica sesión
    }

    switch (vista) {
      case 'inicio':
        return <Cuerpo user={user} />
      case 'tareas':
        return user ? <Todo user={user} /> : <div>Debes iniciar sesión</div>
      default:
        return <Cuerpo user={user} />
    }
  }

  const navegar = (pagina) => {
    setVista(pagina);
  };

  if (loading) {
    return <div>Cargando...</div>; // ← Loading inicial
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
        theme={theme}
        onToggleTheme={toggleTheme}
        navegar={navegar}
      />
      <div className="main-content">
        {NavegarPagina()}
      </div>
      <Footer />
    </>
  );
}

export default App