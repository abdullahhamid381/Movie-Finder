import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    currentPath: '/',
    searchSection: 'movies',
    isSearchMenuOpen: 0,
    openedMovieBookId: null
  },
  reducers: {
    setCurrentPath(state, action) {
      state.currentPath = action.payload;
    },
    setSearchSection(state, action) {
      state.searchSection = action.payload;
    },
    setIsSearchMenuOpen(state, action) {
      state.isSearchMenuOpen = action.payload;
    },
    setOpenedMovieBookId(state, action) {
      state.isSearchMenuOpen = 0;
      state.currentPath = '/details';
      state.openedMovieBookId = action.payload;
    }
  }
});

export const navigationReducer = navigationSlice.reducer;
export const {
  setCurrentPath,
  setSearchSection,
  setIsSearchMenuOpen,
  setOpenedMovieBookId
} = navigationSlice.actions;
