import { useRemoveItemFromUserListMutation } from '../../store';
import { BiSolidStar } from 'react-icons/bi';
import useNavigateToDetailsPage from '../../hooks/use-navigate-to-details-page';
import ReactIcon from '../reusable/ReactIcon';

function MoviesBooksListItem({ id, movieId, type, poster, title, vote, releaseDate, removeButton }) {
  const [removeItemFromList] = useRemoveItemFromUserListMutation();

  return (
    <div className="movies__item">
      <img className="movies__img" onClick={useNavigateToDetailsPage(type, movieId)}
        src={(type !== 'book') ? `https://image.tmdb.org/t/p/w500/${poster}` : poster} alt={title} />
      <p className="movies__title">{title}</p>
      <div className={`movies__date-vote ${(removeButton) ? 'movies-date-vote_margin' : ''}`}>
        <div className="vote">
          <ReactIcon src={<BiSolidStar className="vote__img" />} color="#d4d420" />
          <p className="vote__text">{vote}</p>
        </div>
        <p className="movies__date">{releaseDate}</p>
      </div>
      {removeButton && <button className="button"
        onClick={() => { removeItemFromList({ url: `/${type}sList`, id }) }}>
        Remove {type}
      </button>}
    </div >
  )
}

export default MoviesBooksListItem;
