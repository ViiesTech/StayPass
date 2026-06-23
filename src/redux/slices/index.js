import {createSlice} from '@reduxjs/toolkit';
import {Apis} from '../services';

const initialState = {
  token: null,
  user: {},
  type: '',
  isGuest: true,
  blockedUserIds: [],
  // profileCreated: false,
};

export const Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = {};
      state.token = null;
      state.isGuest = false;
    },
    goToLogin: state => {
      state.user = {};
      state.token = null;
      state.isGuest = false;
    },
    setUserType: (state, action) => {
      state.type = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setGuestMode: state => {
      state.isGuest = true;
    },
    blockCommunityUser: (state, action) => {
      if (!action.payload) {
        return;
      }
      if (!state.blockedUserIds.includes(action.payload)) {
        state.blockedUserIds.push(action.payload);
      }
    },
    unblockCommunityUser: (state, action) => {
      state.blockedUserIds = state.blockedUserIds.filter(
        userId => userId !== action.payload,
      );
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

export const {
  logout,
  goToLogin,
  setUserType,
  setUserData,
  setGuestMode,
  blockCommunityUser,
  unblockCommunityUser,
} = Slice.actions;

export default Slice.reducer;
