import './css/Cuerpo.css';

function Cuerpo() {
    return (
        <>
            <div className="tarjetas-precio flotar">
                <div className="tarjeta-precio">
                    <div className="tarjeta-img-circulo">
                        <img src="/src/assets/basico.png" alt="Mantenimiento básico" />
                    </div>
                    <h3>Mantenimiento básico</h3>
                    <p className="subtitulo">Ideal para revisión mensual</p>
                    <p className="precio">
                        <span className="moneda">$</span>120.000<span className="periodo">/mo</span>
                    </p>
                    <p className="precio-regular">$150.000/mo</p>
                    <ul className="lista-incluye">
                        <li>✔ Cambio de aceite</li>
                        <li>✔ Revisión de frenos</li>
                        <li>✔ Ajuste de cadena</li>
                        <li>✔ Inspección general</li>
                    </ul>
                </div>

                <div className="tarjeta-precio">
                    <div className="tarjeta-img-circulo">
                        <img src="/src/assets/avanzado.png" alt="Servicio Completo" />
                    </div>
                    <h3>Servicio Completo</h3>
                    <p className="subtitulo">Cada 6.000 km</p>
                    <p className="precio">
                        <span className="moneda">$</span>150.000<span className="periodo">/servicio</span>
                    </p>
                    <p className="precio-regular">$170.000 regular</p>
                    <ul className="lista-incluye">
                        <li>✔ Todo el básico</li>
                        <li>✔ Limpieza carburador</li>
                        <li>✔ Revisión eléctrica</li>
                        <li>✔ Lubricación general</li>
                    </ul>
                </div>

                <div className="tarjeta-precio">
                    <div className="tarjeta-img-circulo">
                        <img src="/src/assets/premium.png" alt="Diagnóstico Premium" />
                    </div>
                    <h3>Diagnóstico Premium</h3>
                    <p className="subtitulo">Para motos exigentes</p>
                    <p className="precio">
                        <span className="moneda">$</span>250.000<span className="periodo">/servicio</span>
                    </p>
                    <p className="precio-regular">$350.000 regular</p>
                    <ul className="lista-incluye">
                        <li>✔ Scanner computarizado</li>
                        <li>✔ Limpieza profunda</li>
                        <li>✔ Revisión de suspensión</li>
                        <li>✔ Asesoría personalizada</li>
                    </ul>
                </div>
            </div>

            <div className="formulario-contenedor">
                <form className='formulario'>
                    <h2>Agenda tu servicio</h2>

                    <label>Nombre:</label>
                    <input type="text" name="nombre" placeholder="Tu nombre" required />

                    <label>Correo:</label>
                    <input type="email" name="correo" placeholder="Tu correo" pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$" required />

                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" placeholder="Tu número de contacto" required />

                    <label >Servicio:</label>
                    <select name="servicio" required>
                        <option value="">-- Selecciona un servicio --</option>
                        <option value="basico">Mantenimiento básico</option>
                        <option value="avanzado">Servicio completo</option>
                        <option value="premium">Diagnóstico Premium</option>
                    </select>

                    <label>Comentarios:</label>
                    <textarea name="comentarios" placeholder="Detalles adicionales"></textarea>

                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
}

export default Cuerpo;
