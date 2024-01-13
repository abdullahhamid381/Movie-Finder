import TopSeriesList from '../components/lists/TopSeriesList';
import MoviesList from '../components/lists/MoviesList';

function SeriesPage() {
  return (
    <div>
      <TopSeriesList />
      <MoviesList url="/3/tv/top_rated" title="Top rated" series />
      <MoviesList url="/3/tv/on_the_air" title="On the air" series />
    </div>
  );
}

export default SeriesPage;
