import { useFetchPopularMoviesQuery } from '../../store';
import useTopMoviesList from '../../hooks/use-top-movies-list';

function TopMoviesList() {
  const { data, error, isLoading } = useFetchPopularMoviesQuery();

  const content = useTopMoviesList(data, error, isLoading);

  return (
    <div className="top-movies">
      <h2 className="top-movies__list-title">Trending movies</h2>

      <div className={`top-movies__items ${(isLoading || error) && 'top-movies__items_loading'}`}>
        {content}
      </div>
    </div>
  );
}

export default TopMoviesList;
