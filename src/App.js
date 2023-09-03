import React, { useEffect } from "react";
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js"; // wrapper around web API, easier
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi(); // instance 

function App() {
  const [{user, token}, dispatch] = useDataLayerValue(); // use dispatch to shoot at datalayer

  // run code based on a given condition, runs when app loads and if given var changes
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token); // key btwn react and spotifyapi

      dispatch({
        type: "SET_TOKEN",
        token : _token,
      });

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user, // put into dataLayer
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
      spotify.getPlaylist('37i9dQZEVXcQ9COmYvdajy').then((response) =>
        dispatch ({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      );
    }
  }, [token, dispatch]);

  return (
    <div className="app">
      {
        token ? (<Player spotify={spotify}/>) : (<Login />)
      }
    </div>
  );
}

export default App;
