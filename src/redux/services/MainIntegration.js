// src/services/mainApis.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, endpoints} from '../constant';

export const MainApis = createApi({
  reducerPath: 'mainApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().persistedData.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUserQueries: builder.query({
      query: _id => ({
        url: endpoints.getQueriesByUserId(_id),
        method: 'GET',
      }),
    }),
    getUserBookings: builder.query({
      query: _id => ({
        url: endpoints.getUserBookings(_id),
        method: 'GET',
      }),
    }),
    getSellerProfile: builder.query({
      query: _id => ({
        url: endpoints.getSellerProfile(_id),
        method: 'GET',
      }),
    }),

    getAllProperties: builder.query({
      query: params => ({
        url: `${endpoints.GETPROPERTIES}?${new URLSearchParams(
          params,
        ).toString()}`,
        method: 'GET',
      }),
    }),
    getAllReviews: builder.query({
      query: params => ({
        url: `${endpoints.GETREVIEWS}?${new URLSearchParams(
          params,
        ).toString()}`,
        method: 'GET',
      }),
    }),
    getAllPosts: builder.query({
      query: params => ({
        url: `${endpoints.GETALLPOST}?${new URLSearchParams(
          params,
        ).toString()}`,
        method: 'GET',
      }),
    }),
    getRoomBookings: builder.query({
      query: _id => ({
        url: endpoints.GETROOMBOOKINGS(_id),
        method: 'GET',
      }),
    }),
    initializePaystack: builder.mutation({
      query: data => ({
        url: endpoints.INITIALIZEPAYSTACK, // create this in constants
        method: 'POST',
        body: data,
      }),
    }),

    verifyPaystack: builder.query({
      query: reference => ({
        url: endpoints.VERIFYPAYSTACK(reference), // create this
        method: 'GET',
      }),
    }),
    getAllFvrts: builder.query({
      query: () => ({
        url: endpoints.GETFVRTS,
        method: 'GET',
      }),
    }),
    addToFvrt: builder.mutation({
      query: data => ({
        url: endpoints.ADDTOFVRT,
        method: 'POST',
        body: data,
      }),
    }),
    cancelBooking: builder.mutation({
      query: data => ({
        url: endpoints.CANCELBOOKING,
        method: 'POST',
        body: data,
      }),
    }),
    createBooking: builder.mutation({
      query: data => ({
        url: endpoints.CREATEBOOKING,
        method: 'POST',
        body: data,
      }),
    }),
    createPost: builder.mutation({
      query: data => ({
        url: endpoints.CREATEPOST,
        method: 'POST',
        body: data,
      }),
    }),
    likePost: builder.mutation({
      query: data => ({
        url: endpoints.LIKEPOST,
        method: 'POST',
        body: data,
      }),
    }),
    contactForm: builder.mutation({
      query: data => ({
        url: endpoints.CONTACTFORM,
        method: 'POST',
        body: data,
      }),
    }),
    addReview: builder.mutation({
      query: data => ({
        url: endpoints.ADDREVIEW,
        method: 'POST',
        body: data,
      }),
    }),
    addComment: builder.mutation({
      query: data => ({
        url: endpoints.ADDCOMMENT,
        method: 'POST',
        body: data,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: data => ({
        url: endpoints.CREATEPAYMENTINTENT,
        method: 'POST',
        body: data,
      }),
    }),
    addPaymentMethod: builder.mutation({
      query: data => ({
        url: endpoints.ADDPAYMENTMETHOD,
        method: 'POST',
        body: data,
      }),
    }),
    payWithWallet: builder.mutation({
      query: data => ({
        url: endpoints.PAYWITHWALLET,
        method: 'POST',
        body: data,
      }),
    }),
    // getSavedCards: builder.mutation({
    //   query: data => ({
    //     url: endpoints.GETSAVEDCARDS,
    //     method: 'GET',
    //     body: data,
    //   }),
    // }),
    getSavedCards: builder.query({
      query: _id => ({
        url: endpoints.GETSAVEDCARDS(_id),
        method: 'GET',
      }),
    }),
    createPayment: builder.mutation({
      query: data => ({
        url: endpoints.CREATEPAYMENT,
        method: 'POST',
        body: data,
      }),
    }),
    getWalletByUserId: builder.query({
      query: () => ({
        url: endpoints.GETWALLETBYUSERID,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  // useLazyGetUserBookingsQuery,
  useLazyGetAllPropertiesQuery,
  useLazyGetAllFvrtsQuery,
  useLazyGetAllReviewsQuery,
  useAddToFvrtMutation,
  useCreateBookingMutation,
  useContactFormMutation,
  useAddReviewMutation,
  useLazyGetUserQueriesQuery,
  useCreatePostMutation,
  useLazyGetUserBookingsQuery,
  useCancelBookingMutation,
  useLazyGetSellerProfileQuery,
  useLazyGetAllPostsQuery,
  useLikePostMutation,
  useAddCommentMutation,
  useCreatePaymentIntentMutation,
  useAddPaymentMethodMutation,
  useLazyGetSavedCardsQuery,
  useCreatePaymentMutation,
  useLazyGetWalletByUserIdQuery,
  usePayWithWalletMutation,
  useLazyGetRoomBookingsQuery,
  useInitializePaystackMutation,
  useLazyVerifyPaystackQuery,
} = MainApis;
