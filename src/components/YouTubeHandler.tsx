import React, { FunctionComponent, useRef } from "react";
import YouTube, {
  YouTubeProps,
} from "react-youtube";

interface YouTubeHandlerprops {
  videoIdStr: string;
}

const YouTubeHandler: FunctionComponent<YouTubeHandlerprops> = ({
  videoIdStr,
}) => {
  const playerRef = useRef<YouTube | null>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const playerInst = event.target;
    playerInst.playVideo();
    // console.log(playerInst.playerInfo.videoData["video_id"]); // Prints the current running video id
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    const playerInst = event.target;
    if (event.data === YouTube.PlayerState.ENDED) {
      playerInst.seekTo(0);
      playerInst.playVideo();
    }
  };

  const opts = {
    height: "500",
    width: "1500",
    playerVars: {
      autoplay: 1,
      disablekb: 1,
      controls: 0,
      rel: 0,
      fs: 0,
      // playlist: videoIdStr,
      mute: 1,
      playsinline: 1,
    },
  };

  return videoIdStr ? (
    <YouTube
      key={videoIdStr}
      style={{ position: "absolute", height: "100%" }}
      onReady={onPlayerReady}
      onStateChange={onPlayerStateChange}
      videoId={videoIdStr}
      opts={opts}
      ref={playerRef}
    />
  ) : null;
};

export default YouTubeHandler;
