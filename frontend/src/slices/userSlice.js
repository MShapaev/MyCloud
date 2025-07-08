import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  avatar: '/img/unknown_user.png',
  changePersonDataMessage: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeAvatar: (state, action) => {
      return { ...state, avatar: action.payload };
    },
    resetPersonData: () => {
      return { ...initialState };
    },
    loadPersonData: (state, action) => {
      const { id, name, lastName, email, avatar } = action.payload;
      if (avatar !== '') {
        return { id, name, lastName, email, avatar };
      }
      return { ...state, id, name, lastName, email };
    },
    changeField: (state, action) => {
      const key = action.payload[0];
      const value = action.payload[1];
      state[key] = value;
      return state;
    },
    addChangeDataMessage: (state, action) => {
      return { ...state, changePersonDataMessage: action.payload };
    },
    resetChangeDataMessage: (state) => {
      return { ...state, changePersonDataMessage: null };
    },
  },
});

export const {
  changeAvatar,
  resetPersonData,
  loadPersonData,
  changeField,
  addChangeDataMessage,
  resetChangeDataMessage,

} = userSlice.actions;

export default userSlice.reducer;
