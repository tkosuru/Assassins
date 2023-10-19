// App.js
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AddPlayerForm from './addplayerform';
import PlayerList from './playerlist';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch player data from your API and set it to players state
    Axios.get('/api/players').then((response) => {
      setPlayers(response.data.players);
    });
  }, []);

  function updatePlayers(){
    Axios.get('/api/players').then((response) => {
      setPlayers(response.data.players);
    });

  }

  function regenerateTargets(){
    const apiUrl = `/api/players/generate_targets/`;
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        updatePlayers();
      })
  };


  const handleAddPlayer = (newPlayer) => {
    console.log(newPlayer)
    // Make a POST request to your API to add a player
    // Axios.post('/api/players/add_player', { username: newPlayer }).then((response) => {
    //   // Update players state with the new player
    //   setPlayers([...players, response.data.player]);
    // });
    const apiUrl = `/api/players/add_player/`;
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer),
    })
      .then((response) => {
        updatePlayers();
      })
  };

  const handleDeletePlayer = (userId) => {
    // Make a POST request to your API to delete a player
    Axios.post(`/api/players/delete_player/${userId}`).then(() => {
      updatePlayers();
    });
  };

  return (
    <div>
      <h1>Assassins</h1>
      <AddPlayerForm onAddPlayer={handleAddPlayer} />
      <br/>
      <button style={{
    background: '#4A90E2',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
  }}
  onClick={regenerateTargets}>Regenerate Targets</button>
      <PlayerList players={players} onDeletePlayer={handleDeletePlayer} />
      <br/>
      <br/>
      <h1>Powered by Teja Kosuru</h1>
    </div>
  );
}

export default App;
