import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGUzZDUxOGJiZTU1MGI0MjIwNGQ1OGZhZ' +
    'jRhM2JiNiIsInN1YiI6IjY0ZTZmZmY1ZTg5NGE2MDEwMTIwNjQyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ' +
    '2ZXJzaW9uIjoxfQ.M_3BoaZ8tH59sxOFKuFanWCdbg-ocHcxKZPujfwHX-U'
};

const seriesApi = createApi({
  reducerPath: 'series',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org'
  }),
  endpoints(builder) {
    return {
      fetchPopularSeries: builder.query({
        query() {
          return {
            url: '/3/trending/tv/day',
            method: 'GET',
            params: {
              language: 'en-US'
            },
            headers
          }
        }
      }),
      fetchSeriesBySearchTerm: builder.query({
        query({ searchTerm, page }) {
          return {
            url: '/3/search/tv',
            method: 'GET',
            params: {
              query: searchTerm.replace(' ', '%20'),
              language: 'en-US',
              page
            },
            headers
          }
        }
      }),
      fetchSerieDetails: builder.query({
        query(id) {
          return {
            url: `/3/tv/${id}`,
            method: 'GET',
            params: {
              language: 'en-US',
            },
            headers
          }
        }
      }),
      fetchSerieCast: builder.query({
        query(id) {
          return {
            url: `/3/tv/${id}/credits`,
            method: 'GET',
            params: {
              language: 'en-US',
            },
            headers
          }
        }
      }),
    }
  }
});

export { seriesApi };
export const {
  useFetchPopularSeriesQuery,
  useFetchSeriesBySearchTermQuery,
  useFetchSerieDetailsQuery,
  useFetchSerieCastQuery
} = seriesApi; 
