import Cookies from "js-cookie";

export const authCookie = "authtoken";

export const useAuth = () => {
  const isAuthenticated = Cookies.get(authCookie) ? true : false;
  const saveUserToken = (token: string, expiration?: Date | number) => {
    Cookies.set(authCookie, token, {
      expires: expiration,
    });
  };
  const getUserToken = () => Cookies.get(authCookie);
  const removeAuthToken = () => Cookies.remove(authCookie);
  return {
    saveUserToken,
    getUserToken,
    isAuthenticated,
    removeAuthToken,
  };
};
