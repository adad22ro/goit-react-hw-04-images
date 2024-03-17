import React, { useState } from 'react';
import Searchbar from './Searchbar';

import './styles.css';

export const App = () => {
  const [ , setSearchedImages] = useState([]);

  return (
    <section>
      <Searchbar setSearchedImages={setSearchedImages} />
    </section>
  );
};
