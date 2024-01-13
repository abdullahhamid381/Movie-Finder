import { useDispatch } from 'react-redux';
import { setSearchSection } from '../../store';
import {
  BiSolidMoviePlay,
  BiSolidCameraMovie,
  BiSolidBookAlt
} from 'react-icons/bi';
import SearchMenuButton from './SearchMenuButton';
import SearhMenuInput from './SearchMenuInput';

function SearchMenu({ className }) {
  const dispatch = useDispatch();

  return (
    <div className={`search ${className}`}>
      <div className="search__navigation">
        <SearchMenuButton
          onClick={() => { dispatch(setSearchSection('movies')) }} title="Movies" section="movies">
          <BiSolidCameraMovie className="image-button__img" />
        </SearchMenuButton>

        <SearchMenuButton
          onClick={() => { dispatch(setSearchSection('series')) }} title="Series" section="series">
          <BiSolidMoviePlay className="image-button__img" />
        </SearchMenuButton>

        <SearchMenuButton
          onClick={() => { dispatch(setSearchSection('books')) }} title="Series" section="books">
          <BiSolidBookAlt className="image-button__img" />
        </SearchMenuButton>
      </div>

      <SearhMenuInput />
    </div>
  );
}

export default SearchMenu;
