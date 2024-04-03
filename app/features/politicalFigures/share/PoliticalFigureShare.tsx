import { useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { GrShare } from 'react-icons/gr';

type PoliticalFigureShareProps = {
  politicalFigure: Api.PoliticalFigure;
};

function PoliticalFigureShare({ politicalFigure }: PoliticalFigureShareProps) {
  // const canUseNavigationShare = !!(typeof navigator !== 'undefined' && navigator.share);
  const [showTooltip] = useState(false); // setShowTooltip

  const handleShareBtn = async () => {
    // if (!canUseNavigationShare) {
    //   setShowTooltip(!showTooltip);
    //   return;
    // }
    const imageUrl = new URL(process.env.API_URL ?? '', `/political-figures/${politicalFigure.slug}/nav-share`);
    console.log(`clicked shareImageAsset: ${imageUrl}`);
    const fetchedImage = await fetch(imageUrl);
    const blobImage = await fetchedImage.blob();
    const filesArray = [
      new File([blobImage], politicalFigure.slug ?? 'image.png', {
        type: 'image/png',
        lastModified: Date.now(),
      }),
    ];
    const shareData = {
      title: `${politicalFigure.firstName} ${politicalFigure.lastName}`,
      files: filesArray,
      url: document.location.origin,
    };
    console.log('shareData:', shareData);
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    }
  };

  return (
    <div className="text-center flex mx-auto justify-center items-center gap-5 pt-10">
      <div className="text-2xl font-light">
        Comparte este
        <br />
        político
      </div>
      <div>
        <button
          type="button"
          className="text-2xl font-light cursor-pointer"
          onClick={handleShareBtn}
        >
          <span className="sr-only">Compartir</span>
          <GrShare className="text-4xl" />
        </button>
        {showTooltip && (
        <div className="absolute bg-white shadow-lg p-4 rounded-lg flex flex-col gap-4 z-50">
          <a
            className="text-2xl font-light cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
                  // eslint-disable-next-line max-len
            href={`https://www.facebook.com/sharer.php?u=https://srv489338.hstgr.cloud/politico/${politicalFigure.slug}&t=Mira a ${politicalFigure.firstName} ${politicalFigure.lastName} en FACESGOV.`}
          >
            <span className="sr-only">Compartir</span>
            <FaFacebook className="text-4xl hover:text-blue-700" />
          </a>
          <a
            className="text-2xl font-light cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
                  // eslint-disable-next-line max-len
            href={`https://www.instagram.com/sharer.php?u=https://srv489338.hstgr.cloud/politico/${politicalFigure.slug}&t=Mira a ${politicalFigure.firstName} ${politicalFigure.lastName} en FACESGOV.`}
          >
            <span className="sr-only">Compartir en mi instagram</span>
            <FaInstagram className="text-4xl hover:text-blue-700" />
          </a>
        </div>
        )}
      </div>
    </div>
  );
}

export default PoliticalFigureShare;
