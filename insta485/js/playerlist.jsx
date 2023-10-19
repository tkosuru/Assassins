// PlayerList.js
import React from 'react';

function PlayerList({ players, onDeletePlayer }) {
  function getPlayerUsername(targetUserId) {
    const targetPlayer = players.find(player => player.user_id === targetUserId);
    return targetPlayer ? targetPlayer.username : 'N/A'; // 'N/A' or another default value if user not found
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'left' }}>
      <ul>
        {players.map((player) => (
          <p
            style={{
              padding: '10px',
              border: '2px solid #4A90E2',
              borderRadius: '4px',
              fontSize: '16px',
            }}
            key={player.user_id}
          >
            <span> {player.username} - Target: {getPlayerUsername(player.target_user_id)}         </span>
            <button
              style={{
                background: '#880000',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                justifyContent: 'flex-end',
                alignSelf: 'end',
              }}
              onClick={() => onDeletePlayer(player.user_id)}
            >
              Kill {player.username}
            </button>
          </p>
        ))}
      </ul>
    </div>
  );
  
}

export default PlayerList;
