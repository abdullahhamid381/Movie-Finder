import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const booksApi = createApi({
  reducerPath: 'books',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books'
  }),
  endpoints(builder) {
    return {
      fetchBooksBySearchTerm: builder.query({
        query(searchTerm) {
          return {
            url: '/v1/volumes',
            method: 'GET',
            params: {
              q: searchTerm,
              key: 'AIzaSyC1k97c4_4Le_APQIoqUyOPusVTtKewk50',
              langRestrict: 'en'
            }
          }
        }
      }),
      fetchBookById: builder.query({
        query(id) {
          return {
            url: `/v1/volumes/${id}`,
            method: 'GET',
            params: {
              key: 'AIzaSyC1k97c4_4Le_APQIoqUyOPusVTtKewk50',
              langRestrict: 'en'
            }
          }
        }
      })
    }
  }
});

export { booksApi };
export const { useFetchBooksBySearchTermQuery, useFetchBookByIdQuery } = booksApi; 
