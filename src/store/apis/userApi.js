import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001'
  }),
  endpoints(builder) {
    return {
      fetchUserName: builder.query({
        query() {
          return {
            url: '/fullName',
            method: 'GET'
          }
        },
        providesTags() {
          return ['FullName'];
        }
      }),
      setUserName: builder.mutation({
        query({ firstName, lastName }) {
          return {
            url: '/fullName',
            method: 'POST',
            body: { firstName, lastName }
          }
        },
        invalidatesTags() {
          return ['FullName'];
        }
      }),
      fetchUserList: builder.query({
        query(url) {
          return {
            url,
            method: 'GET'
          }
        },
        providesTags(_, __, listType) {
          return [{ type: 'UserList', id: listType }];
        }
      }),
      addItemToUserList: builder.mutation({
        query({ url, item }) {
          return {
            url,
            method: 'POST',
            body: { ...item }
          }
        },
        invalidatesTags(_, __, { url }) {
          return [{ type: 'UserList', id: url }];
        }
      }),
      removeItemFromUserList: builder.mutation({
        query({ url, id }) {
          return {
            url: `${url}/${id}`,
            method: 'DELETE'
          }
        },
        invalidatesTags(_, __, { url }) {
          return [{ type: 'UserList', id: url }];
        }
      })
    }
  }
});

export { userApi }
export const {
  useFetchUserNameQuery,
  useSetUserNameMutation,
  useFetchUserListQuery,
  useAddItemToUserListMutation,
  useRemoveItemFromUserListMutation
} = userApi; 
