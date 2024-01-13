import { useFetchPopularSeriesQuery } from '../../store';
import useTopMoviesList from '../../hooks/use-top-movies-list';

function TopSeriesList() {
  const { data, error, isLoading } = useFetchPopularSeriesQuery();

  const content = useTopMoviesList(data, error, isLoading, true);

  return (
    <div className="top-movies">
      <h2 className="top-movies__list-title">Trending series</h2>

      <div className={`top-movies__items ${(isLoading || error) && 'top-movies__items_loading'}`}>
        {content}
      </div>
    </div>
  );
}

export default TopSeriesList;
