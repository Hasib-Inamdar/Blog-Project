export const selectIsAuth = (state) => state.auth.isAuthenticated;

export const selectUser = (state) => state.auth.user;

export const selectUserRole = (state) => state.auth.user?.role;
