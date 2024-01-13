import { useState } from 'react';

function useSortList() {
  const [sortParams, setSortParams] = useState({ criteria: 'date', order: 0 });

  const sortByDate = (content) => {
    const sortedContent = [...content];

    if (sortParams.order === 1) {
      sortedContent.sort((a, b) => {
        const date1 = new Date(a.props.releaseDate || 0).getTime();
        const date2 = new Date(b.props.releaseDate || 0).getTime();

        return date2 - date1;
      });
    } else if (sortParams.order === 2) {
      sortedContent.sort((a, b) => {
        const date1 = new Date(a.props.releaseDate || 0).getTime();
        const date2 = new Date(b.props.releaseDate || 0).getTime();

        return date1 - date2;
      });
    }

    return sortedContent;
  }

  const sortByRating = (content) => {
    const sortedContent = [...content];

    if (sortParams.order === 1) {
      sortedContent.sort((a, b) => {
        return b.props.vote - a.props.vote;
      });
    } else if (sortParams.order === 2) {
      sortedContent.sort((a, b) => {
        return a.props.vote - b.props.vote;
      });
    }

    return sortedContent;
  }

  const setSortOrderByRating = () => {
    if (sortParams.criteria !== 'rating') {
      setSortParams({ criteria: 'rating', order: 1 });
    } else {
      setSortParams((sortParams.order === 2) ?
        { ...sortParams, order: 0 } :
        { ...sortParams, order: sortParams.order + 1 });
    }
  }

  const setSortOrderByDate = () => {
    if (sortParams.criteria !== 'date') {
      setSortParams({ criteria: 'date', order: 1 });
    } else {
      setSortParams((sortParams.order === 2) ?
        { ...sortParams, order: 0 } :
        { ...sortParams, order: sortParams.order + 1 });
    }
  }

  return {
    sortParams,
    sortByDate,
    sortByRating,
    setSortOrderByRating,
    setSortOrderByDate
  };
}

export default useSortList;
