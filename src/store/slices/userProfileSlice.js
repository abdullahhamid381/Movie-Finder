import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../apis/userApi';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    fullName: {
      firstName: null,
      lastName: null
    }
  },
  reducers: {
    setFullName(state, action) {
      state.fullName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.fetchUserName.matchFulfilled,
      (state, action) => {
        console.log(action);
        state.fullName.firstName = action.payload.firstName
        state.fullName.lastName = action.payload.lastName
      }
    )
  },
});

export const userProfileReducer = userProfileSlice.reducer;
export const { setFullName } = userProfileSlice.actions;
