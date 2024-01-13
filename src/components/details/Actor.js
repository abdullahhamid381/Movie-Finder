import { BiSolidUser } from 'react-icons/bi';
import ReactIcon from '../reusable/ReactIcon';

function Actor({ profile, name, character }) {
  return (
    <>
      {
        (profile) ?
          <img className="movie-cast__img" src={`https://image.tmdb.org/t/p/w200/${profile}`} alt={name} /> :
          <ReactIcon src={<BiSolidUser className="movie-cast__img movie-cast__img_alt" />} color="#86a69d" />
      }
      <p className="movie-cast__name">{name}</p>
      <p className="movie-cast__character">{character}</p>
    </>
  );
}

export default Actor;
