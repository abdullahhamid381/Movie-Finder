import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPath, setIsSearchMenuOpen } from './store'
import Sidebar from './components/navigation/Sidebar';
import Route from './components/navigation/Route';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import UserProfilePage from './pages/UserProfilePage';
import DetailsPage from './pages/DetailsPage';

function App() {
  const dispatch = useDispatch();

  const { currentPath, isSearchMenuOpen, openedMovieBookId } = useSelector((state) => (
    {
      currentPath: state.navigationReducer.currentPath,
      isSearchMenuOpen: state.navigationReducer.isSearchMenuOpen,
      openedMovieBookId: state.navigationReducer.openedMovieBookId
    }
  ));

  useEffect(() => {
    if (window.location.pathname !== currentPath) {
      dispatch(setCurrentPath(window.location.pathname));
    }
  }, [dispatch, currentPath]);

  useEffect(() => {
    const handler = () => {
      dispatch(setCurrentPath(window.location.pathname));
    };
    window.addEventListener('popstate', handler);

    return () => {
      window.removeEventListener('popstate', handler);
    }
  }, [dispatch]);

  if (currentPath === '/details' && !openedMovieBookId) {
    window.history.pushState({}, '', '/');
    dispatch(setCurrentPath('/'));
  }

  return (
    <div className="content">
      <div className={`shade-area ${(isSearchMenuOpen === 1) ? 'shade-area_hide' :
        (isSearchMenuOpen === 2) ? 'shade-area_show' : ''}`}
        onClick={() => { dispatch(setIsSearchMenuOpen(1)) }}></div>
      <Sidebar />

      <div className="main">
        <Route path="/">
          <MoviesPage />
        </Route>
        <Route path="/series">
          <SeriesPage />
        </Route>
        <Route path="/userProfile">
          <UserProfilePage />
        </Route>
        <Route path="/details">
          <DetailsPage />
        </Route>
      </div>
    </div>
  );
}

export default App;
