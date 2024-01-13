import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGUzZDUxOGJiZTU1MGI0MjIwNGQ1OGZhZ' +
    'jRhM2JiNiIsInN1YiI6IjY0ZTZmZmY1ZTg5NGE2MDEwMTIwNjQyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ' +
    '2ZXJzaW9uIjoxfQ.M_3BoaZ8tH59sxOFKuFanWCdbg-ocHcxKZPujfwHX-U'
};

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org'
  }),
  endpoints(builder) {
    return {
      fetchPopularMovies: builder.query({
        query() {
          return {
            url: '/3/movie/popular',
            method: 'GET',
            params: {
              language: 'en-US',
              page: '1'
            },
            headers
          }
        }
      }),
      fetchMovies: builder.query({
        query({ url, page }) {
          return {
            url,
            method: 'GET',
            params: {
              language: 'en-US',
              page
            },
            headers
          }
        }
      }),
      fetchMoviesBySearchTerm: builder.query({
        query({ searchTerm, page }) {
          return {
            url: '/3/search/movie',
            method: 'GET',
            params: {
              query: searchTerm,
              language: 'en-US',
              page
            },
            headers
          }
        }
      }),
      fetchMovieDetails: builder.query({
        query(id) {
          return {
            url: `/3/movie/${id}`,
            method: 'GET',
            params: {
              language: 'en-US',
            },
            headers
          }
        }
      }),
      fetchMovieCast: builder.query({
        query(id) {
          return {
            url: `/3/movie/${id}/credits`,
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

export { moviesApi };
export const {
  useFetchPopularMoviesQuery,
  useFetchMoviesQuery,
  useFetchMoviesBySearchTermQuery,
  useFetchMovieDetailsQuery,
  useFetchMovieCastQuery
} = moviesApi 
