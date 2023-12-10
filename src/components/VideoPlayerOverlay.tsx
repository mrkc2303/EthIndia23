import { useEffect, useRef } from 'react';
import styled from 'styled-components';

type VideoPlayerPropsType = {
  stream: MediaStream | null;
  isMuted: boolean;
};

const VideoPlayerOverlay = ({ stream, isMuted }: VideoPlayerPropsType) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      console.log(videoRef.current, stream);
      videoRef.current.srcObject = stream;
      videoRef.current?.play();
    }
  }, [videoRef, stream]);

  return <Video ref={videoRef} muted={true} autoPlay />;
};

const Video = styled.video`
  width: 20vw;
  height: fit-content;
  margin-bottom: 50px;
  margin-left: 50px;
  border: 2px solid black;
  z-index: 10;
`;

export default VideoPlayerOverlay;
