import { useState } from "react";

export default function Login({ onlogin }) {

    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [registrando, setRegistrando] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        //Registrar Usuario
        if (registrando) {

            localStorage.setItem("usuario", JSON.stringify({ usuario, clave }));
            setMensaje("Usuario Registrado. Ya puedes iniciar");
            setRegistrando(false);
            setClave("");
            return;
        }

        const datos = JSON.parse(localStorage.getItem("usuario") || null);
        if (datos && datos.usuario === usuario && datos.clave === clave) {
            localStorage.setItem("sesion", "activa");
            setMensaje("Bienvenido" + usuario);

            onlogin?.();
        }
        else {
            setMensaje("Usuario o contraseña incorrecto");
        }
    }

    return (
        <div style={{
            width: "100vw",
            height: "30vw",
            display: "flex",
            justifyContent: "center",
        }}>
            <div style={{ justifyContent: "center", textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
                <h1>{registrando ? "Registro" : "Inicio Sesión"}</h1>
                <form onSubmit={handleSubmit}>

                    <div>
                        <input type="text"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            style={{ padding: "8px", margin: "5px" }}
                            required
                        />
                    </div>

                    <div>
                        <input type="password"
                            placeholder="Contraseña"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            style={{ padding: "8px", margin: "5px" }}
                            required
                        />
                    </div>

                    <button type="submit" style={{ textAlign: "center", marginTop: "10px", padding: "8px 20px", fontFamily: "Arial" }}>

                        {registrando ? "Registrar" : "Iniciar Sesion "}
                    </button>

                </form>
                <button onClick={() => { setRegistrando(!registrando); setMensaje(""); }} style={{ marginTop: "10px" }}>
                    {registrando ? "Ya esta registrado" : "Crear nueva Cuenta"}
                </button>

            </div>
        </div>

    )

}

