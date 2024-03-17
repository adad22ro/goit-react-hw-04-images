import React, { useState } from 'react';
import PixabayApi from './PixabayApi';
import ImageGallery from './ImageGallery';

const Searchbar = ({ setSearchedImages }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const pixabayApi = new PixabayApi();

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchQuery) {
      return;
    }

    try {
      const response = await pixabayApi.getImages(searchQuery, page);
      const newImages = response.hits.map((hit) => ({
        id: hit.id,
        imageUrl: hit.webformatURL,
        alt: hit.tags,
      }));

      setImages(newImages);
      setPage(page + 1);
      setSearchedImages(newImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleLoadMore = async () => {
    try {
      const moreImages = await pixabayApi.getMoreImages(searchQuery, page);
      setImages((prevImages) => [...prevImages, ...moreImages]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching more images:', error);
    }
  };

  return (
    <section>
      <div className="search-box">
        <span className="logo-name" onClick={() => window.location.reload()}>
          Image Seeker
        </span>
        <form className="search-form" id="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            name="searchQuery"
            autoComplete="off"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-form-button" type="submit">
            &#128269;
          </button>
        </form>
      </div>
      <ImageGallery images={images} loadMore={handleLoadMore} />
    </section>
  );
};

export default Searchbar;
