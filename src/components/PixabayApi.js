// PixabayApi.js
import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '41018255-2956d420614a58465a44a1bb0';

export default class PixabayApi {
  constructor() {
    this.queryPage = 1;
    this.searchQuery = '';
  }

  async getImages(query, page) {
    try {
      const response = await axios.get(ENDPOINT, {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: page,
          per_page: 12,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  resetPage() {
    this.queryPage = 1;
  }

  incrementPage() {
    this.queryPage += 1;
  }

  // New method to get more images
  async getMoreImages(query) {
    this.incrementPage();
    try {
      const response = await this.getImages(query, this.queryPage);
      return response.hits.map(hit => ({
        id: hit.id,
        imageUrl: hit.webformatURL,
        alt: hit.tags,
      }));
    } catch (error) {
      throw error;
    }
  }
}
