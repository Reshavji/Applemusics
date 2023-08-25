import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Song.css';
import CustomAudioPlayer from '../Player/CustomAudioPlayer';

function Song() {
  const { id } = useParams();
  const [songData, setSongData] = useState('');

  useEffect(() => {
    // Fetch song details using the song ID from the route parameters
    fetch(`https://academics.newtonschool.co/api/v1/music/song/${id}`, {
      headers: {
        'projectId': 'bmc60xnvc646' 
      }
    })
    .then(response => response.json())
    .then(data => {
      setSongData(data.data); // Store the fetched song data in the state
    });
  }, [id]);

  return (
    <div className='songs-player'>
      <div className='song-box'>
      <img src={songData.thumbnail} className="song-thumb" alt={songData.title} />
      <p className='song-title'>{songData.title}</p>
      <div className="custom-audio-player">
        <audio controls src={songData.audio_url}></audio>
      </div>
      </div>
      <CustomAudioPlayer />
    </div>
  );
}

export default Song;
