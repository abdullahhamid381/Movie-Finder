import { useFetchBooksBySearchTermQuery } from '../../store';
import { ImSpinner } from 'react-icons/im';
import useSortList from '../../hooks/use-sort-list';
import ReactIcon from '../reusable/ReactIcon';
import SortCriteria from '../lists/SortCriteria';
import BooksListItem from './BooksListItem';

function BooksSearchResults({ searchTerm }) {
  const { data, error, isLoading } = useFetchBooksBySearchTermQuery(searchTerm);

  let content;
  if (isLoading) {
    content = <ReactIcon src={<ImSpinner className="spinner" />} color="#86a69d" />
  } else if (error) {
    content = <p className="no-results">An error occurred while trying to get books.</p>;
  } else {
    content = data.items?.map((book) => {
      return <BooksListItem key={book.id} id={book.id}
        cover={book.volumeInfo.imageLinks?.thumbnail} authors={book.volumeInfo.authors?.join(', ')}
        title={book.volumeInfo.title} subtitle={book.volumeInfo.subtitle}
        description={book.volumeInfo.description} vote={book.volumeInfo.averageRating || 0}
        releaseDate={book.volumeInfo.publishedDate} />;
    });
  }

  const {
    sortParams,
    sortByRating,
    sortByDate,
    setSortOrderByRating,
    setSortOrderByDate
  } = useSortList(content);

  if (!error && !isLoading && data.totalItems !== 0 && sortParams.criteria === 'rating') {
    content = sortByRating(content);
  } else if (!error && !isLoading && data.totalItems !== 0 && sortParams.criteria === 'date') {
    content = sortByDate(content);
  }

  return (
    <div className={`search-list ${(isLoading || error) && 'search-list_loading'}`}>
      {(!isLoading && !error) && <div className="search-list__sort">
        <SortCriteria
          sortParams={sortParams} onSort={setSortOrderByRating} title="Rating" criteria="rating" />
        <SortCriteria
          sortParams={sortParams} onSort={setSortOrderByDate} title="Release date" criteria="date" />
      </div>}

      {content}
      {(!isLoading && !error && data.totalItems === 0) &&
        <p className="no-results">There are no results for your search.</p>}
    </div>
  );
}

export default BooksSearchResults;
