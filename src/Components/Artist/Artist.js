import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './Artist.css';

function Artist() {
  const [artistData, setArtistData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/music/artist/${id}`, {
          headers: {
            'projectId': 'bmc60xnvc646'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setArtistData(data.data);
        }
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };

    fetchArtistData();
  }, [id]);

  return (
    <div  className="browse-container">
      {artistData && (
        <div className='artist-box'>
        <div className='artist-heading'>
            <img src={artistData.image} className='artist-image' alt={artistData.name} />
            <div className='artist-detail'>
          <h2>{artistData.name}</h2>
          <p>{artistData.description}</p></div>
          </div>
          <div className='artist-lang'>
            <div className='lang-title'>
          <p>Languages:</p></div>
            {artistData.languages.map((language, index) => (
              <span className='lang-name' key={index}>{language}</span>
            ))}
          </div>
          <div className='song-lists'>
          <h3>Songs:</h3>
          <Grid container spacing={2}>
            {artistData.songs.map((song) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={song._id}>
               <Link to={`/album/${song.album}`} className="album-link" > 
               <div className="album-cards">
                <img src={song.thumbnail} alt={song.thumbnail} className="album-imgs"/>
                <p className='album-title'>{song.title}</p> 
                <strong>{song.mood}</strong> 
                </div>
              </Link>
               </Grid>
            ))}  
          </Grid>
          </div>
        </div>
      )}
    </div>
  );
}

export default Artist;
