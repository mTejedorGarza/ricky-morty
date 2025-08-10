import axios from 'axios';

class RickAndMortyService {
  baseUrl = 'https://rickandmortyapi.com/api/character';
  nextUrl = '';
  previousUrl = '';

  async getNextPage() {
    const url = this.nextUrl && this.nextUrl.trim() !== '' ? this.nextUrl : this.baseUrl;
    return this.fetchPage(url);
  }

  async getPreviousPage() {
    const url = this.previousUrl && this.previousUrl.trim() !== '' ? this.previousUrl : this.baseUrl;
    return this.fetchPage(url);
  }

  async fetchPage(url) {
    try {
      const response = await axios.get(url);
      return this.mapResponse(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  mapResponse(response) {
    // Guardar URLs para navegación
    this.nextUrl = response.info.next || '';
    this.previousUrl = response.info.prev || '';

    // Construir arreglo de personajes mapeados
    const characters = response.results.map(char => ({
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      image: char.image
    }));

    return {
      characters,
      hasNextPage: !!(response.info.next && response.info.next.trim() !== ''),
      hasPreviousPage: !!(response.info.prev && response.info.prev.trim() !== '')
    };
  }
}

export default new RickAndMortyService();