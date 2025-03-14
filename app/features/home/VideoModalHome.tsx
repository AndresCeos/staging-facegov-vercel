import { useState } from 'react';

import VideoModal from '@/utils/VideoModal';

function VideoModalHome() {
  const [showModal, setShowModal] = useState(false);
  return (

    <div className="m-0 p-0 w-full">
      <button type="button" className="w-full" onClick={() => setShowModal(true)}>
        <img src="/video.jpg" alt="video-modal" className="md:w-full w-12/12" />
      </button>
      <VideoModal showModal={showModal} setShowModal={setShowModal} media="https://www.youtube.com/embed/NpEaa2P7qZI?si=4XS0APpaKUOWJ_V8" />
    </div>
  );
}

export default VideoModalHome;
