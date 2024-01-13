import { useState } from 'react';
import { useFetchSeriesBySearchTermQuery } from '../../store';
import useTopMoviesList from '../../hooks/use-top-movies-list';
import useSortList from '../../hooks/use-sort-list';
import SortCriteria from '../lists/SortCriteria';
import Dropdown from '../reusable/Dropdown';

function SeriesSearchResults({ searchTerm }) {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useFetchSeriesBySearchTermQuery({ searchTerm, page });

  let content = useTopMoviesList(data, error, isLoading, true);
  const {
    sortParams,
    sortByRating,
    sortByDate,
    setSortOrderByRating,
    setSortOrderByDate
  } = useSortList(content);

  if (!error && !isLoading && sortParams.criteria === 'rating') {
    content = sortByRating(content);
  } else if (!error && !isLoading && sortParams.criteria === 'date') {
    content = sortByDate(content);
  }

  const dropdownOptions = [
    { label: 'Page 1', value: 1 },
    { label: 'Page 2', value: 2 },
    { label: 'Page 3', value: 3 },
  ];

  return (
    <div className={`search-list ${(isLoading || error) && 'search-list_loading'}`}>
      {(!isLoading && !error) && <div className="search-list__sort">
        <SortCriteria
          sortParams={sortParams} onSort={setSortOrderByRating} title="Rating" criteria="rating" />
        <SortCriteria
          sortParams={sortParams} onSort={setSortOrderByDate} title="Release date" criteria="date" />

        <Dropdown options={dropdownOptions} value={page} onChange={(value) => { setPage(value) }} />
      </div>}

      {content}
      {(!isLoading && !error && content.length === 0) &&
        <p className="no-results">There are no results for your search.</p>}
    </div>
  );
}

export default SeriesSearchResults;
