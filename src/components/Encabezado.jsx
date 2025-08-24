import './css/Encabezado.css';

function Encabezado({ sesionActiva, onLogout, theme, onToggleTheme, navegar }) {

    return (
        <header className="header">
            <div className="container header__container">
                <div className="header__logo">
                    <img
                        className="header__img"
                        src="/src/assets/logo.png"
                        alt="Logo MotoArte"
                    />
                    <h1 className="header__title">
                        Moto<span className="header__light">A</span>rte
                    </h1>
                </div>

                <div className="header__menu">
                    <nav id="navbar" className="header__nav collapse">
                        <ul className="header__elenco">
                            <li className="header__el">
                                <a href="#" className="header__link " onClick={() => navegar('inicio')}>Inicio</a>
                            </li>                            <li className="header__el"><a href="#" className="header__link">Productos</a></li>
                            <li className="header__el"><a href="#" className="header__link">Ubicación</a></li>
                            <li className="header__el"><a href="#" className="header__link">Contáctenos</a></li>
                            <li className="header__el">
                                <a href="#" className="header__link " onClick={() => navegar('tareas')}>Tareas</a>
                            </li>

                            {/* Tema */}

                            <button onClick={onToggleTheme} aria-label='Cambiar Tema' className="header__tema-btn"
                            >{theme === "ligth" ? "🌙" : "☀️"}</button>


                            <li className="header__el header__usuario">
                                {sesionActiva ? (
                                    <button
                                        onClick={onLogout}
                                        className="header__logout-btn"
                                    >
                                        Cerrar sesión
                                    </button>
                                ) : (
                                    <img
                                        src="/src/assets/usuarioM.png"
                                        alt="Usuario"
                                        className="header__usuario-img"
                                    />
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header >
    );
}

export default Encabezado;
