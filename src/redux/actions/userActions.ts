import { UserData } from "../../pages/Auth";

// type 선언
export const LOGIN_USER = "LOGIN_USER" as const;
export const LOGOUT_USER = "LOGOUT_USER" as const;

// action
export const login = (user: UserData) => ({
  type: LOGIN_USER,
  payload: user,
});
export const logout = () => ({
  type: LOGOUT_USER,
});
