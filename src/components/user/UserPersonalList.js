import { useFetchUserListQuery } from '../../store';
import { ImSpinner } from 'react-icons/im';
import ReactIcon from '../reusable/ReactIcon';
import MoviesBooksListItem from '../lists/MoviesBooksListItem';

function UserPersonalList({ url, type, title }) {
  const { data, error, isLoading } = useFetchUserListQuery(url);

  let content;
  if (isLoading) {
    content = <ReactIcon src={<ImSpinner className="spinner" />} color="#86a69d" />;
  } else if (error) {
    content = <p className="no-results">
      An error occurred while trying to get {title.charAt(0).toLowerCase()}{title.slice(1)}.
    </p>;
  } else {
    content = data.map((item) => {
      return <MoviesBooksListItem key={item.movieId} id={item.id} movieId={item.movieId}
        type={type} poster={item.poster} title={item.title} vote={(item.vote) ?
          Number((item.vote).toFixed(1)) : 0} releaseDate={item.releaseDate}
        dbId={item.id} removeButton />
    });
  }

  return (
    <div className="user-list">
      <h2 className="user-list__title">{title}</h2>
      <div className={`user-list__items ${(error || content.length === 0)
        && 'user-list__items_no-results'}`}>
        {content}
        {(!isLoading && !error && content.length === 0) &&
          <p className="no-results">{`There are no ${type}s in your watchlist.`}</p>}
      </div>
    </div>
  );
}

export default UserPersonalList;
