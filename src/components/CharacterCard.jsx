import React from 'react';

export default function CharacterCard({ character }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '8px',
      borderRadius: '6px'
    }}>
      <img
        src={character.image}
        alt={character.name}
        style={{
          width: '100%',
          height: '140px',
          objectFit: 'cover',
          borderRadius: '6px'
        }}
      />
      <h4>{character.name}</h4>
      <p>{character.species} — {character.status}</p>
    </div>
  );
}