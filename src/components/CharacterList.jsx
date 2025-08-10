import React, { useEffect, useState } from 'react';
import RickAndMortyService from '../services/rickandmorty.service.js';
import CharacterCard from './CharacterCard';

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadNext = async () => {
    setLoading(true);
    try {
      const data = await RickAndMortyService.getNextPage();
      setCharacters(data.characters);
      setHasNext(data.hasNextPage);
      setHasPrev(data.hasPreviousPage);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const loadPrev = async () => {
    setLoading(true);
    try {
      const data = await RickAndMortyService.getPreviousPage();
      setCharacters(data.characters);
      setHasNext(data.hasNextPage);
      setHasPrev(data.hasPreviousPage);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNext();
  }, []);

  return (
    <div>
      <h2>Rick & Morty Characters</h2>

      {loading && <p>Cargando...</p>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
        gap: '12px'
      }}>
        {characters.map(c => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>

      <div style={{ marginTop: '12px' }}>
        <button onClick={loadPrev} disabled={!hasPrev || loading}>Anterior</button>
        <button onClick={loadNext} disabled={!hasNext || loading} style={{ marginLeft: '8px' }}>Siguiente</button>
      </div>
    </div>
  );
}