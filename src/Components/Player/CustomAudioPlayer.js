import React, { useState, useEffect } from 'react';
import Slider from "@material-ui/core/Slider";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FastForwardIcon from "@material-ui/icons/FastForward";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import VolumeMuteSharpIcon from "@material-ui/icons/VolumeMuteSharp";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import LoopIcon from "@material-ui/icons/Loop";
import './CustomAudioPlayer.css'; // Apply your own CSS

const CustomAudioPlayer = ({ currentSong }) => {
  const [value, setValue] = React.useState(30);
  const [audioIndex, setAudioIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isLoopOn, setIsLoopOn] = useState(false);
  const audioRef = React.createRef();
  const songarray = currentSong.allSong;
  const handleVolumeChange = (event, newValue) => {
    const newVolume = newValue / 100;
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setValue(newValue);
  };
 
  useEffect(() => {
    const audio = audioRef.current;
    console.log(currentSong.songData)
    if (audio && songarray.length > 0 && currentSong.title) {
      // Set initial song based on currentSong.link
      setIsPlaying(true);
      if (audioIndex === 0) {
        audio.src = currentSong.link;
      } else {
        audio.src = songarray[audioIndex];
      }
      audio.play();

      const updateProgress = () => {
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        const progressPercentage = (currentTime / duration) * 100;
        setProgress(progressPercentage);
      };

      const handleAudioEnd = () => {
        if (isLoopOn) {
          audio.currentTime = 0;
          audio.play();
        } else {
          if (audioIndex === 0) {
            setAudioIndex(1);
          } else {
            setAudioIndex((audioIndex + 1) % songarray.length); // Circular navigation
          }
        }
      };

      audio.addEventListener('timeupdate', updateProgress);
      if (isLoopOn) {
        audio.addEventListener('ended', handleAudioEnd);
      }

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        if (isLoopOn) {
          audio.removeEventListener('ended', handleAudioEnd);
        }
      };
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioIndex, songarray, isLoopOn, currentSong.link]);
  

  const handleSeek = (e) => {
    const progressBar = e.target;
    const clickedX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;

    const seekTime = (clickedX / progressBarWidth) * audioRef.current.duration;
    if (!isNaN(seekTime) && isFinite(seekTime)) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleAudioEnd = () => {
    if (isLoopOn) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      setAudioIndex((audioIndex + 1) % songarray.length); // Circular navigation
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
    const newIndex = isShuffleOn ? audioIndex : Math.floor(Math.random() * songarray.length);
    setAudioIndex(newIndex);
  };

  const handleLoop = () => {
    setIsLoopOn(!isLoopOn);
    if (isLoopOn) {
      audioRef.current.removeEventListener('ended', handleAudioEnd);
    } else {
      audioRef.current.addEventListener('ended', handleAudioEnd);
    }
  };

  return (
    <div className="icon-container">
   <div className="player-icon">
        <ShuffleIcon fontSize="small" onClick={handleShuffle} color={isShuffleOn ? "primary" : "inherit"} />
        <FastRewindIcon fontSize="large" onClick={() => setAudioIndex((audioIndex - 1 + songarray.length) % songarray.length)} />
        {isPlaying ? (
          <PauseIcon fontSize="large" onClick={handlePlayPause} />
        ) : (
          <PlayArrowIcon fontSize="large" onClick={handlePlayPause} />
        )}
        <FastForwardIcon fontSize="large" onClick={() => setAudioIndex((audioIndex + 1) % songarray.length)} />
        <LoopIcon fontSize="small" onClick={handleLoop} color={isLoopOn ? "primary" : "inherit"} />
      </div>
    <div className="middle-player">
      <div className="song-container">
        <div className="song-icon">
          {currentSong &&
          currentSong.songData ? (
            <img
              className="header-img"
              src={currentSong.songData.thumbnail}
              alt="Album"
            />
          ) : (
            <MusicNoteIcon />
          )}
        </div>
      </div>
      <div className="player-container">
        {currentSong.title ? (
          <div className="player-control">
            <div className='song-data'>
            <h4 className='song-name'>{currentSong.title}</h4>
            </div>
            <div className="custom-audio-player">
      <audio ref={audioRef} controls={false} onEnded={handleAudioEnd} autoPlay>
        {/* The source will be set in the useEffect */}
      </audio>
    </div>
    <div className="progress-bar" onClick={handleSeek}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
          </div>
        ) : (
          <svg
            id="Layer_1"
            version="1.1"
            viewBox="0 0 18 18"
            x="0px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            y="0px"
            data-test="apple-logo"
            className="apple-icon"
          >
            <path
              d="M8.8,5.2c-0.7,0-1.8-0.8-3-0.8c-1.5,0-2.9,0.9-3.7,2.3c-1.6,2.8-0.4,6.8,1.1,9.1C4,16.8,4.9,18,6.1,18c1.1,0,1.6-0.7,3-0.7
    c1.4,0,1.8,0.7,3,0.7c1.2,0,2-1.1,2.8-2.2c0.9-1.3,1.2-2.5,1.2-2.6c0,0-2.4-0.9-2.4-3.6c0-2.3,1.9-3.4,1.9-3.4
    c-1.1-1.6-2.7-1.7-3.3-1.8C10.7,4.2,9.5,5.2,8.8,5.2z M11.3,2.9c0.6-0.8,1.1-1.8,0.9-2.9c-0.9,0-2,0.6-2.6,1.4C9,2,8.5,3.1,8.6,4.1
    C9.6,4.2,10.7,3.6,11.3,2.9"
            ></path>
          </svg>
        )}
      </div>
    </div>

    <div
        style={{
          width: 130,
          display: "flex",
          alignItems: "center",
          fill: "white",
        }}
      >
        <div className="player-icon">
          <VolumeMuteSharpIcon fontSize="small" />
        </div>
        <Slider
          value={value}
          onChange={handleVolumeChange}
          aria-label="Volume slider"
          className="slider-style"
        />
      </div>

  </div>
  );
};

export default CustomAudioPlayer;
