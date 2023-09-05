import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "./spotify";
import { useDataLayerValue } from "./DataLayer";
import './App.css';
import Login from './Login';
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import MakePlaylist from "./MakePlaylist";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();
  const [playlists, setPlaylists] = useState([]); // State to store the user's playlists

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        setPlaylists(playlists.items); // Save the user's playlists to state
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
        // Automatically select and load the first playlist from the list
        if (playlists.items.length > 0) {
          const firstPlaylistId = playlists.items[0].id;
          fetchAndSetPlaylist(firstPlaylistId);
        }
      });
    }
  }, [token, dispatch]);

  const fetchAndSetPlaylist = (playlistId) => {
    // Fetch the selected playlist and set it as discover_weekly
    spotify.getPlaylist(playlistId).then((response) => {
      dispatch({
        type: 'SET_DISCOVER_WEEKLY',
        discover_weekly: response,
      });
    });
  };

  return (
    <div className="app">
      {token ? (
        <div>
          {playlists.length > 0 ? (
            <Player spotify={spotify} />
          ) : (
            <MakePlaylist />
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
  
}

export default App;
