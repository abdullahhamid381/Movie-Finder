import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  navigationReducer, setCurrentPath, setSearchSection, setIsSearchMenuOpen, setOpenedMovieBookId
} from './slices/navigationSlice';
import {
  userProfileReducer, setFullName
} from './slices/userProfileSlice';
import { moviesApi } from './apis/moviesApi';
import { seriesApi } from './apis/seriesApi';
import { booksApi } from './apis/booksApi';
import { userApi } from './apis/userApi';

const store = configureStore({
  reducer: {
    navigationReducer,
    userProfileReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(seriesApi.middleware)
      .concat(booksApi.middleware)
      .concat(userApi.middleware)
  }
});

setupListeners(store.dispatch);

export {
  store, setCurrentPath, setSearchSection, setIsSearchMenuOpen,
  setOpenedMovieBookId, setFullName
};
export {
  useFetchPopularMoviesQuery,
  useFetchMoviesQuery,
  useFetchMoviesBySearchTermQuery,
  useFetchMovieDetailsQuery,
  useFetchMovieCastQuery
} from './apis/moviesApi';
export {
  useFetchPopularSeriesQuery,
  useFetchSeriesBySearchTermQuery,
  useFetchSerieDetailsQuery,
  useFetchSerieCastQuery
} from './apis/seriesApi';
export {
  useFetchBooksBySearchTermQuery,
  useFetchBookByIdQuery
} from './apis/booksApi';
export {
  useFetchUserNameQuery,
  useSetUserNameMutation,
  useFetchUserListQuery,
  useAddItemToUserListMutation,
  useRemoveItemFromUserListMutation
} from './apis/userApi';
