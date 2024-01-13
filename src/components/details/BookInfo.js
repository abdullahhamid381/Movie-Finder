import { useSelector } from 'react-redux';
import { useFetchBookByIdQuery } from '../../store';
import { useAddItemToUserListMutation } from '../../store';
import { ImSpinner } from 'react-icons/im';
import ReactIcon from '../reusable/ReactIcon';

function BookInfo() {
  const id = useSelector((state) => state.navigationReducer.openedMovieBookId.id);
  const { data, error, isLoading } = useFetchBookByIdQuery(id);
  const [addBookToReadingList, results] = useAddItemToUserListMutation();

  let content;
  if (isLoading) {
    content = <ReactIcon src={<ImSpinner className="spinner" />} color="#86a69d" />
  } else if (error) {
    content = <p className="no-results">An error occurred while trying to get book details.</p>;
  } else {
    const getCoverUrl = () => {
      return data.volumeInfo.imageLinks.extraLarge || data.volumeInfo.imageLinks.large ||
        data.volumeInfo.imageLinks.medium || data.volumeInfo.imageLinks.thumbnail
    }

    const item = {
      movieId: data.id,
      type: 'book',
      poster: getCoverUrl(),
      title: data.volumeInfo.title,
      vote: data.volumeInfo.averageRating,
      releaseDate: data.volumeInfo.publishedDate
    }

    content = (
      <>
        <div className="movie-book-info__button-img">
          <img className="movie-book-info__img" src={getCoverUrl()} alt={data.volumeInfo.title} />

          <button className="button" onClick={() => { addBookToReadingList({ url: '/booksList', item }) }}>
            {(results.isSuccess) ? 'Added to list' : '+ Add to reading list'}
          </button>
        </div>
        <div className="movie-book-info__text">
          <h1 className="movie-book-info__title">{data.volumeInfo.title}</h1>
          <h2 className="movie-book-info__subtitle">{data.volumeInfo.subtitle}</h2>
          <div className="movie-book-info__table">
            <p className="movie-book-info__detail-name">Authors</p>
            <p className="movie-book-info__detail-value">
              {data.volumeInfo.authors?.join(', ') || 'Not provided'}
            </p>
            <p className="movie-book-info__detail-name">Categories</p>
            <p className="movie-book-info__detail-value">
              {data.volumeInfo.categories?.join(', ') || 'Not provided'}
            </p>
            <p className="movie-book-info__detail-name">Page count</p>
            <p className="movie-book-info__detail-value">{data.volumeInfo.pageCount}</p>
            <p className="movie-book-info__detail-name">Retail price</p>
            <p className="movie-book-info__detail-value">
              {(data.saleInfo.saleability !== 'NOT_FOR_SALE') ?
                ((data.saleInfo.retailPrice?.amount || 'Not for ') + ' ' +
                  (data.saleInfo.retailPrice?.currencyCode || 'sale')) : 'Not for sale'}
            </p>
            <p className="movie-book-info__detail-name">Average vote</p>
            <p className="movie-book-info__detail-value">
              {data.volumeInfo.averageRating || 'Not provided'}
            </p>
            <p className="movie-book-info__detail-name">Maturity rating</p>
            <p className="movie-book-info__detail-value">{data.volumeInfo.maturityRating}</p>
            <p className="movie-book-info__detail-name">Published date</p>
            <p className="movie-book-info__detail-value">
              {data.volumeInfo.publishedDate || 'Not provided'}
            </p>
            <p className="movie-book-info__detail-name">Link</p>
            <a className="movie-book-info__detail-value"
              href={data.volumeInfo.canonicalVolumeLink || '#'} target="_blank" rel="noreferrer">
              {data.volumeInfo.canonicalVolumeLink || 'Not provided'}
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`movie-book-info ${isLoading && 'movie-book-info_loading'}`}>
        {content}
      </div>
      {(!error && !isLoading) &&
        <div className="book-description">
          <h2 className="book-description__title">Description</h2>
          <p className="book-description__text"
            dangerouslySetInnerHTML={{ __html: data.volumeInfo.description }}></p>
        </div>}
    </>
  );
}

export default BookInfo;
