import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  password: '',
  passwordRepeat: false,
  login: false,
  showPassword: false,
  showRegistrationPassword: false,
  navigation: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadingOn: (state) => {
      return { ...state, loading: true };
    },
    loadingOff: (state) => {
      return { ...state, loading: false };
    },
    correctPassword: (state, action) => {
      return { ...state, password: action.payload };
    },
    incorrectPassword: (state) => {
      return { ...state, password: '' };
    },
    showHidePassword: (state) => {
      return { ...state, showPassword: !state.showPassword };
    },
    showHideRegistrationPassword: (state) => {
      return { ...state, showRegistrationPassword: !state.showRegistrationPassword };
    },
    login: (state) => {
      return { ...state, login: true };
    },
    logout: (state) => {
      return { ...state, login: false };
    },
    showNavigation: (state) => {
      return { ...state, navigation: true };
    },
    hideNavigation: (state) => {
      return { ...state, navigation: false };
    },
  },
});

export const {
  loadingOn,
  loadingOff,
  correctPassword,
  incorrectPassword,
  correctPasswordRepeat,
  incorrectPasswordRepeat,
  showHidePassword,
  showHideRegistrationPassword,
  login,
  logout,
  showNavigation,
  hideNavigation,

} = appSlice.actions;

export default appSlice.reducer;
