export const PATH_API = {
  // auth
  SIGN_IN: '/api/auth/sign-in',
  SIGN_UP: '/api/auth/sign-up',
  SIGN_OUT: '/api/auth/sign-out',
  // refresh token
  TOKEN_REISSUE: '/api/auth/token-reissue',
  SEND_EMAIL: '/api/auth/mail/send',
  VERIFY_EMAIL: '/api/auth/mail/verify',
  // user
  USER_INFO: '/api/user',
  USER_RESIGN: '/api/user/resign',
  // capsule
  CAPSULE_BOX: '/api/capsule-box',
  MAKE_CAPSULE_BOX: '/api/capsule-box',
  MAKE_CAPSULE: '/api/capsule',
  CAPSULE_LIST: '/api/capsule-list',
  CAPSULE_DETAIL: '/api/capsule',
  // MAKE_CAPSULE: '/api//capsule',
  // notice
  NOTICE: '/api/notice',
  // history
  HISTORY: '/api/history-capsule-boxes',
  // inquiry
  INQUIRY: '/api/inquiry',
};

/**
- /oauth/{provider}/sign-in-uri
- /oauth/{provider}/sign-in
 */
