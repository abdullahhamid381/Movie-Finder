import { ImSpinner } from 'react-icons/im';
import ReactIcon from '../components/reusable/ReactIcon';
import TopMoviesListItem from '../components/lists/TopMoviesListItem';

function useTopMoviesList(data, error, isLoading, isSeries) {
  let content;
  if (isLoading) {
    content = <ReactIcon src={<ImSpinner className="spinner" />} color="#86a69d" />
  } else if (error) {
    content = <p className="no-results">
      An error occurred while trying to get {(isSeries) ? 'series' : 'movies'}.
    </p>
  } else {
    content = data.results.map((movie) => {
      return <TopMoviesListItem key={movie.id} id={movie.id} type={(isSeries) ? 'serie' : 'movie'}
        poster={movie.poster_path} title={(isSeries) ? movie.name : movie.title}
        description={movie.overview} vote={Number((movie.vote_average).toFixed(1))}
        releaseDate={(isSeries) ? movie.first_air_date : movie.release_date} />;
    });
  }

  return content;
}

export default useTopMoviesList;
