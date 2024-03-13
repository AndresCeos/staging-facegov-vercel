/* eslint-disable jsx-a11y/control-has-associated-label */
"use client";
import RightOfReplyModal from '@/features/politicalFigures/RightOfReplyModal';
import { useState } from 'react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa';

function Footer() {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer className="bg-white">
      <div className="flex justify-between h-20 items-center max-w-[1240px]  mx-auto px-4">
        <ul className="p-0 m-0 flex gap-10">
          <li>
            <a href="/aviso-de-privacidad">Aviso de Privacidad</a>
          </li>
          <li>
            <a href="/terminos">Términos y Condiciones</a>
          </li>
          <li>
            Derecho de Réplica
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
    </footer>
  );
}

export default Footer;
