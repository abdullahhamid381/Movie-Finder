import { useState } from 'react';
import { useFetchMoviesQuery } from '../../store';
import { ImSpinner } from 'react-icons/im';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import useSortList from '../../hooks/use-sort-list.js';
import ReactIcon from '../reusable/ReactIcon';
import ImageButton from '../reusable/ImageButton';
import Dropdown from '../reusable/Dropdown';
import MoviesBooksListItem from './MoviesBooksListItem';

function MoviesList({ url, title, series }) {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useFetchMoviesQuery({ url, page });
  const { sortParams, sortByDate, setSortOrderByDate } = useSortList();

  let content;
  if (isLoading) {
    content = <ReactIcon src={<ImSpinner className="spinner" />} color="#86a69d" />;
  } else if (error) {
    content = <p className="no-results">
      An error occurred while trying to get {(series) ? 'series' : 'movies'}.
    </p>;
  } else {
    content = data.results.map((movie) => {
      return <MoviesBooksListItem key={movie.id} movieId={movie.id} type={((series) ? 'serie' : 'movie')}
        poster={movie.poster_path} title={(series) ? movie.name : movie.title}
        vote={movie.vote_average} releaseDate={(series) ? movie.first_air_date : movie.release_date} />;
    });

    content = sortByDate(content);
  }

  const dropdownOptions = [
    { label: 'Page 1', value: 1 },
    { label: 'Page 2', value: 2 },
    { label: 'Page 3', value: 3 },
  ];

  return (
    <div className="movies">
      <div className="movies__header">
        <h2 className="movies__list-title">{title}</h2>
        <div className="movies__sort" onClick={setSortOrderByDate}>
          <p className="movies__sort-text">Release date</p>
          <div>
            {(sortParams.order === 2 || sortParams.order === 0) && <ImageButton>
              <ReactIcon src={<BiSolidUpArrow className="image-button__img" />} color="#86a69d" />
            </ImageButton>}
            {(sortParams.order === 1 || sortParams.order === 0) && <ImageButton>
              <ReactIcon src={<BiSolidDownArrow className="image-button__img" />} color="#86a69d" />
            </ImageButton>}
          </div>
        </div>
        <Dropdown options={dropdownOptions} value={page} onChange={(value) => setPage(value)} />
      </div>

      <div className={`movies__items ${(isLoading || error) && 'movies__items_loading'}`}>
        {content}
      </div>
    </div>
  );
}

export default MoviesList;
