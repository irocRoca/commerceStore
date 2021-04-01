import * as userAPI from "./user-api";

export function signUp(userData) {
  const token = userAPI.signUp(userData);
  return token;
}
