import cx from 'classnames';
import { useState } from 'react';

import {
  FaEnvelope,
  FaFacebook,
  FaLink,
  FaWhatsapp,
} from 'react-icons/fa';
import { GrShare } from 'react-icons/gr';

import Loader from '@/components/Loader';
import navigatorShare from '@/utils/navigatorShare';

type ShareProps = {
  className?: string;
  iconClassName? : string;
  politicalFigure: Api.PoliticalFigure;
  comment?: Api.Comment;
};

function Share({
  className, politicalFigure, comment, iconClassName,
}: ShareProps) {
  const isMobile = window.innerWidth < 768;
  const canUseNavigationShare = isMobile ? !!(typeof navigator !== 'undefined' && navigator.share) : false;
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigatorShare = async () => {
    setIsLoading(true);
    const shareData = await navigatorShare(politicalFigure, comment);
    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const handleShareBtn = async () => {
    try {
      if (showTooltip) {
        setShowTooltip(!showTooltip);
        return;
      }
      if (!canUseNavigationShare) {
        setShowTooltip(!showTooltip);
        return;
      }
      handleNavigatorShare();
    } catch (error) {
      console.error('Error sharing:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="fixed w-full bg-white bg-opacity-70 left-0 top-0 z-50"><Loader isFullHeight /></div>;
  }

  const PoliticalFigureURL = new URL(`/politico/${politicalFigure.slug}${comment ? `/comment/${comment.id}` : ''}`, process.env.APP_URL).toString();
  const PoliticalFigureMsg = comment
    ? `Mira el comentario que acabo de hacer a ${politicalFigure.firstName} ${politicalFigure.lastName} en FACESGOV.`
    : `Mira a ${politicalFigure.firstName} ${politicalFigure.lastName} en FACESGOV.`;

  return (
    <div className="relative">
      <button
        type="button"
        className={cx(className)}
        onClick={handleShareBtn}
      >
        <span className="sr-only">Compartir</span>
        <GrShare className={cx(!iconClassName ? 'text-4xl' : iconClassName)} />
      </button>
      {showTooltip && (
      <div className="absolute bg-white shadow-lg p-4 rounded-lg flex flex-col gap-4 z-50 right-0 min-w-80">
        <h3 className="font-bold">Compartir en:</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 items-center justify-start">
            <button
              type="button"
              className="text-2xl font-light cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(PoliticalFigureURL);
                setShowTooltip(!showTooltip);
              }}
            >
              <span className="sr-only">Copiar enlace</span>
              <FaLink className="text-4xl hover:text-gray-700" />
            </button>
            <span className="text-xs">
              Copiar
              <br />
              enlace
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-start">
            <a
              className="text-2xl font-light cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer.php?u=${PoliticalFigureURL}&quote=${PoliticalFigureMsg}`}
            >
              <span className="sr-only">Compartir</span>
              <FaFacebook className="text-4xl hover:text-blue-700" />
            </a>
            <span className="text-xs">
              Facebook
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-start">
            <a
              className="text-2xl font-light cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/?text=${PoliticalFigureMsg} ${PoliticalFigureURL}`}
            >
              <span className="sr-only">Compartir en Whatsapp</span>
              <FaWhatsapp className="text-4xl hover:text-green-700" />
            </a>
            <span className="text-xs">
              Whatsapp
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-start">
            <a
              className="text-2xl font-light cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/intent/tweet?text=${PoliticalFigureMsg} ${PoliticalFigureURL}`}
            >
              <span className="sr-only">Compartir en X</span>
              <div className="text-4xl hover:text-blue-600">
                𝕏
              </div>
            </a>
            <span className="text-xs">
              X
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-start">
            <a
              className="text-2xl font-light cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:?subject=${PoliticalFigureMsg} ${PoliticalFigureURL}`}
            >
              <span className="sr-only">Compartir por Correo</span>
              <FaEnvelope className="text-4xl hover:text-green-700" />
            </a>
            <span className="text-xs">
              Correo
            </span>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Share;
