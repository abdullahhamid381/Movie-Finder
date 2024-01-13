import MoviesList from '../components/lists/MoviesList';
import TopMoviesList from '../components/lists/TopMoviesList';

function MoviesPage() {
  return (
    <div>
      <TopMoviesList />
      <MoviesList url="/3/movie/top_rated" title="Top rated" />
      <MoviesList url="/3/movie/upcoming" title="Upcoming" />
      <MoviesList url="/3/movie/now_playing" title="Now playing" />
    </div>
  );
}

export default MoviesPage;
