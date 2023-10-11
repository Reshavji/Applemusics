import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./AlbumDetails.css";

const AlbumDetails = ({ setCurrentSong }) => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [songSources, setSongSources] = useState([]); // Store song sources
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    
    // Fetch album details using the album ID from the route parameters
    fetch(`https://academics.newtonschool.co/api/v1/music/album/${id}`, {
      headers: {
        projectId: "bmc60xnvc646",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbumData(data.data); // Store the fetched album data in the state
        collectSongSources(data.data); // Collect song sources
      })
      .catch((error) => {
        console.error("Error fetching album data:", error);
      });
  }, [id]); // Fetch whenever the album ID changes

  const collectSongSources = (albumData) => {
    const sources = [];

    for (const artist of albumData.artists) {
      for (const songId of artist.songs) {
        const song = albumData.songs.find((song) => song._id === songId);
        if (song) {
          sources.push(song.audio_url);
        }
      }
    }

    setSongSources(sources);
  };
  const handleAddToWatchlist = (song) => {
  if (!watchlist.includes(song)) {
    const updatedWatchlist = [...watchlist, song];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist)); // Update local storage
    console.log("Song added to watchlist:", song.title);
  } else {
    console.log("Song already in watchlist:", song.title);
  }
};

  const handleRemoveFromWatchlist = (song) => {
    const updatedWatchlist = watchlist.filter((item) => item !== song);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist)); // Update local storage
    console.log("Song removed from watchlist:", song.title);
  };
  
  if (!albumData) {
    return null; // If album data is not fetched yet, don't render anything
  }

  return (
    <div className="album-details-popup">
      <div className="album-box">
        <div className="album-img">
          <img
            className="song-img"
            src={albumData.image}
            alt={albumData.title}
          />
        </div>
        <div className="album-details">
          <span className="song-title">{albumData.title}</span>
          <p className="song-description">{albumData.description}</p>
          <button className="main-btn">Preview</button>
        </div>
      </div>
      <div className="main-box">
        <div className="head-name">
          <p>Song</p>
          <p>Artist</p>
          <p>Mood</p>
          <p>Play</p>
        </div>
        {albumData.artists.map((artist) => (
          <div className="song-by-name" key={artist._id}>
            {artist.songs.map((songId) => {
              const song = albumData.songs.find((song) => song._id === songId);
              if (song) {
                const isInWatchlist = watchlist.includes(song);
                return (
                  <div
                    className="song-play"
                    key={song._id}
                    onDoubleClick={() =>
                      setCurrentSong({
                        link: song.audio_url,
                        image: song.image,
                        title: song.title,
                        songData: song,
                        songId: song._id,
                        allSong: songSources,
                      })
                    }
                  >
                    <div className="song-collect">
                      <div className="first-data">
                        <img
                          className="song-images"
                          src={albumData.image}
                          alt={albumData.title}
                        />
                        <p className="audio-title">{song.title}</p>
                      </div>
                      <Link to={`/artist/${artist._id}`}>
                        <p>{artist.name}</p>
                      </Link>
                      <p className="audio-title">{song.mood}</p>

                      <button
                    className="watchlist-btn"
                    onClick={() =>
                      isInWatchlist
                        ? handleRemoveFromWatchlist(song)
                        : handleAddToWatchlist(song)
                    }
                  >
                    {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                  </button>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetails;
