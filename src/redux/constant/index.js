export const BASE_URL = 'https://staypass.apiforapp.link/api/user/';
export const BASE_URL2 = 'https://staypass.apiforapp.link/api/';
export const IMAGE_URL = 'https://staypass.apiforapp.link/api/';
export const API_KEY = 'AIzaSyC29cK8ZfbPVXu1qejhgrcQROTLcCy-6XQ';

export const endpoints = {
  REGISTER: 'signup',
  LOGIN: 'login',
  OTP: 'VerifyOtpAndCreate',
  SEND_EMAIL: 'forgetPassword',
  verifyPassOtp: 'verifyOtp',
  RESET_PASSWORD: 'resetPassword',
  UPDATE_PROFILE: 'updateProfile',
  CHANGE_PASSWORD: 'changePassword',
  DELETE_ACCOUNT: 'deleteUser',
  GETPROPERTIES: 'getAllProperties',
  ADDTOFVRT: 'addOrRemoveFavorite',
  CANCELBOOKING: 'cancelBooking',
  GETFVRTS: 'getFavorites',
  GETREVIEWS: 'getAllReviews',
  CONTACTFORM: 'createContactForm',
  ADDCOMMENT: 'commentByUser',
  CREATEBOOKING: 'createBooking',
  CREATEPOST: 'createPost',
  BLOCKUSER: 'blockUser',
  REPORTPOST: 'reportPost',
  GETBLOCKEDUSERS: 'getBlockedUsers',
  UNBLOCKUSER: 'unBlockUser',
  LIKEPOST: 'likeAndUnLikePost',
  ADDREVIEW: 'addReview',
  GETALLPOST: 'getAllPost',
  CREATEPAYMENTINTENT: 'createSetupIntent',
  CREATEPAYMENT: 'createPayment',
  ADDPAYMENTMETHOD: 'savePaymentMethod',
  GETWALLETBYUSERID: 'getWalletByUserId',
  PAYWITHWALLET: 'paymentWithWallet',
  INITIALIZEPAYSTACK: 'initializePaystack',
  VERIFYPAYSTACK: refCode => `verifyPaystack/${refCode}`,
  GETROOMBOOKINGS: _id => `getAllBookings/?roomId=${_id}&status=Confirmed`,
  getSellerProfile: _id => `getProfile/?userId=${_id}`,
  GETSAVEDCARDS: _id => `getSavedCards/?_id=${_id}`,
  getQueriesByUserId: _id => `getAllContactForms/?userId=${_id}`,
  getUserBookings: _id => `getAllBookings/?userId=${_id}&status=Confirmed`,
  // getTherapistBookings: ({therapistId, bookingStatus, therapistStatus}) => {
  //   let url = `user/getBooking?therapistId=${therapistId}&bookingStatus=${bookingStatus}`;
  //   if (therapistStatus) url += `&therapistStatus=${therapistStatus}`;
  //   return url;
  // },
  // getTherapistById: ({userId, therapistId}) =>
  //   `user/getProfile?userId=${userId}&_id=${therapistId}&type=Provider`,
};
