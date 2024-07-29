import { useState } from 'react';

import VideoModal from '@/utils/VideoModal';

function VideoModalHome() {
  const [showModal, setShowModal] = useState(false);
  return (

    <div className="m-0 p-0 w-full">
      <button type="button" className="w-full" onClick={() => setShowModal(true)}>
        <img src="/video.jpg" alt="video-modal" className="md:w-full w-12/12" />
      </button>
      <VideoModal showModal={showModal} setShowModal={setShowModal} media="/video.jpg" />
    </div>
  );
}

export default VideoModalHome;
