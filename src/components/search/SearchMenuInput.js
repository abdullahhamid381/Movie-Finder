import { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../reusable/Input';
import MoviesSearchResults from './MoviesSearchResults';
import SeriesSearchResults from './SeriesSearchResults';
import BooksSearchResults from './BooksSearchResults';

function SearhMenuInput() {
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchSection = useSelector((state) => state.navigationReducer.searchSection);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchTerm(inputText);
  }

  const handleInput = (value) => {
    setInputText(value);
  }

  const sectionNameInSingular = searchSection.charAt(0).toUpperCase()
    + searchSection.slice(1, searchSection.length - 1);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input value={inputText} onChange={handleInput} label={`${sectionNameInSingular} name`} search />
      </form>

      {searchTerm && searchSection === 'movies' && <MoviesSearchResults searchTerm={searchTerm} />}
      {searchTerm && searchSection === 'series' && <SeriesSearchResults searchTerm={searchTerm} />}
      {searchTerm && searchSection === 'books' && <BooksSearchResults searchTerm={searchTerm} />}
    </>
  );
}

export default SearhMenuInput;
