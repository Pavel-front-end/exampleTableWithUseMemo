import { AppState } from "../store";
import { createSelector } from "reselect";

const usersSelector = (state: AppState) => state.user;
export const isUserLoggedSelector = createSelector(
  usersSelector,
  (user) => user.isLogged
);

const authSelector = (state: AppState) => state.auth;
export const isShowAuthSelector = createSelector(
  authSelector,
  (auth) => auth.showAuth === true
);

export const onDeleteAccountSelector = createSelector(
    usersSelector,
    (user) => user.deleteAccountAction
);