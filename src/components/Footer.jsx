import './css/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h1 className="footer__title">
            Moto<span className="footer__light">A</span>rte
          </h1>
          <p className="footer__text">
            Taller especializado en mantenimiento y personalización de motos.
          </p>
        </div>
        <div className="footer-right">
          Created by<span className="footer__author"> Sofia Valencia</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
