// AddPlayerForm.js
import React, { useState } from 'react';


function AddPlayerForm({ onAddPlayer }) {
  const [newPlayer, setNewPlayer] = useState('');

  const handleAddPlayer = () => {
    onAddPlayer(newPlayer);
    setNewPlayer('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
  <input
    type="text"
    value={newPlayer}
    onChange={(e) => setNewPlayer(e.target.value)}
    style={{
      padding: '10px',
      border: '2px solid #4A90E2',
      borderRadius: '4px',
      marginRight: '10px',
      fontSize: '16px',
    }}
    placeholder="Enter a player's name"
  />
  <button
    onClick={handleAddPlayer}
    style={{
      background: '#4A90E2',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    }}
  >
    Add Player
  </button>
</div>

  );
}

export default AddPlayerForm;
