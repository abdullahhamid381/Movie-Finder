import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPath, setIsSearchMenuOpen } from '../../store';
import {
  BiSolidSearchAlt2,
  BiSolidMoviePlay,
  BiSolidCameraMovie,
  BiSolidUserCircle
} from 'react-icons/bi';
import NavigationButton from './NavigationButton';
import ImageButton from '../reusable/ImageButton';
import SearchMenu from '../search/SearchMenu';

function Sidebar() {
  const dispatch = useDispatch();

  const isSearchMenuOpen = useSelector((state) => state.navigationReducer.isSearchMenuOpen);

  const navigateToPage = (path) => {
    window.history.pushState({}, '', path);
    dispatch(setCurrentPath(path));
  }

  return (
    <div className="sidebar">
      <SearchMenu className={
        `${(isSearchMenuOpen === 1) ? 'search_close' :
          (isSearchMenuOpen === 2) ? 'search_open' : ''}`} />

      <ImageButton
        onClick={() => {
          dispatch(setIsSearchMenuOpen((isSearchMenuOpen === 0 || isSearchMenuOpen === 1) ? 2 : 1))
        }} title="Search">
        <BiSolidSearchAlt2 className="image-button__img" />
      </ImageButton>

      <div className="sidebar__movies">
        <NavigationButton
          onClick={() => { navigateToPage('/') }} title="Movies" path="/">
          <BiSolidCameraMovie className="image-button__img" />
        </NavigationButton>

        <NavigationButton
          onClick={() => { navigateToPage('/series') }} title="Series" path="/series">
          <BiSolidMoviePlay className="image-button__img" />
        </NavigationButton>
      </div>

      <NavigationButton
        onClick={() => { navigateToPage('/userProfile') }} title="User profile" path="/userProfile">
        <BiSolidUserCircle className="image-button__img" />
      </NavigationButton>
    </div>
  );
}

export default Sidebar;
