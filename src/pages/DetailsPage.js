import { useSelector } from 'react-redux';
import MovieInfo from '../components/details/MovieInfo';
import MovieCast from '../components/details/MovieCast';
import SerieInfo from '../components/details/SerieInfo';
import SerieCast from '../components/details/SerieCast';
import BookInfo from '../components/details/BookInfo';

function DetailsPage() {
  const type = useSelector((state) => state.navigationReducer.openedMovieBookId.type)

  let content;
  switch (type) {
    case 'movie':
      content = <>
        <MovieInfo />
        <MovieCast />
      </>;
      break;
    case 'serie':
      content = <>
        <SerieInfo />
        <SerieCast />
      </>;
      break;
    case 'book':
      content = <BookInfo />;
      break;
    default:
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default DetailsPage;
