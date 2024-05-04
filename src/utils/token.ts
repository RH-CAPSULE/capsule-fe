import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token);

  const expiredAt = new Date(decodedToken.exp! * 1000);
  const now = new Date();

  return now >= expiredAt;
};
