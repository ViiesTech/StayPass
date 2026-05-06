import {createSlice} from '@reduxjs/toolkit';
import {Apis} from '../services';

const initialState = {
  token: null,
  user: {},
  type: '',
  // profileCreated: false,
};

export const Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = {};
      state.token = null;
    },
    setUserType: (state, action) => {
      state.type = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(Apis.endpoints.verifyOTP.matchFulfilled, (state, action) => {
        console.log('aaaaa', action);
        if (action.payload?.data) {
          console.log('accc', action);
          state.user = action.payload.data;
          state.token = action.payload.accessToken;
        }
      })
      .addMatcher(Apis.endpoints.login.matchFulfilled, (state, action) => {
        console.log('acttttssss', action);
        if (action.payload?.data) {
          state.user = action.payload.data;
          state.token = action.payload.accessToken;
        }
      })
      .addMatcher(
        Apis.endpoints.updateProfile.matchFulfilled,
        (state, action) => {
          console.log('acttttssss.payload', action.payload);
          if (action.payload?.data) {
            state.user = action.payload.data;
          }
        },
      )
      .addMatcher(
        Apis.endpoints.deleteAccount.matchFulfilled,
        (state, action) => {
          console.log('action', action.payload);
          if (action.payload?.success) {
            state.user = {};
            state.token = null;
          }
        },
      );
  },
});

export const {logout, setUserType, setUserData} = Slice.actions;

export default Slice.reducer;
