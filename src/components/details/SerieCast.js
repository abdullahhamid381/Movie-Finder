import { useSelector } from 'react-redux';
import { useFetchSerieCastQuery } from '../../store';
import { ImSpinner } from 'react-icons/im';
import ReactIcon from '../reusable/ReactIcon';
import Actor from './Actor';

function SerieCast() {
  const id = useSelector((state) => state.navigationReducer.openedMovieBookId.id);
  const { data, error, isLoading } = useFetchSerieCastQuery(id);

  let content;
  if (isLoading) {
    content = <ReactIcon src={<ImSpinner className="spinner" />} color="#86a69d" />;
  } else if (error) {
    content = 'An error occurred while trying to get serie cast.';
  } else {
    content = data.cast.map((actor) => {
      return <Actor key={actor.id} profile={actor.profile_path}
        name={actor.name} character={actor.character} />
    });
  }

  return (
    <div className="movie-cast">
      <h2 className="movie-cast__title">Cast</h2>
      <div className={`movie-cast__items ${(isLoading ||
        (!isLoading && !error && content.length === 0)) && 'movie-cast__items_loading'}`}>
        {content}
        {(!isLoading && !error && content.length === 0) &&
          <p className="no-results">There is no information about the cast of the serie.</p>}
      </div>
    </div>
  );
}

export default SerieCast;
