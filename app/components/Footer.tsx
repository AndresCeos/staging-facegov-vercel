/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa';

function Footer() {
  return (
    <div className="bg-white shadow-md mb-2">
      <div className="flex justify-between h-20 items-center max-w-[1240px]  mx-auto px-4">
        <ul className="p-0 m-0 flex gap-10">
          <li>
            <a href="/aviso-de-privacidad">Aviso de Privacidad</a>
          </li>
          <li>
            <a href="/terminos">Términos y Condiciones</a>
          </li>
          <li>
            <a href="/derecho-de-replica">Derecho de Réplica</a>
          </li>
        </ul>

        <ul className="p-0 m-0 flex gap-10">
          <li>
            <a href="https://www.facebook.com/sexeniofaces" target="_blank" rel="noreferrer">
              <FaFacebookSquare className="text-2xl" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/sexeniofaces" target="_blank" rel="noreferrer">
              <FaTwitterSquare className="text-2xl" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/sexeniofaces/" target="_blank" rel="noreferrer">
              <FaInstagramSquare className="text-2xl" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
