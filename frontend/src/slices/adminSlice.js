import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onFocus: null,
  addModal: false,
  changeModal: false,
  deleteModal: false,
  data: [],
  card: {},
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdmin: () => {
      return { ...initialState };
    },
    focusOnAcc: (state, action) => {
      return { ...state, onFocus: action.payload }; 
    },
    deleteFocusOnAcc: (state) => {
      return { ...state, onFocus: null };
    },
    showAddModal: (state) => {
      return { ...state, addModal: true };
    },
    hideAddModal: (state) => {
      return { ...state, addModal: false };
    },
    showChangeModal: (state) => {
      return { ...state, changeModal: true };
    },
    hideChangeModal: (state) => {
      return { ...state, changeModal: false };
    },
    showDelete: (state) => {
      return { ...state, deleteModal: true };
    },
    hideDelete: (state) => {
      return { ...state, deleteModal: false };
    },
    loadData: (state, action) => {
      return { ...state, data: action.payload.sort((a, b) => a.id - b.id) };
    },
    deleteAccFromData: (state, action) => {
      return { ...state, data: state.data.filter((el) => el.id !== action.payload) };
    },
    addDataToCard: (state, action) => {
        return { ...state, card: action.payload };
    },
    cangeDataCard: (state, action) => {
      return { ...state, card: { ...state.card, ...action.payload } };
    },
    deleteFileFromDataCard: (state, action) => {
      return { ...state, card: { ...state.card, files: state.card.files.filter((file) => file.id !== Number(action.payload)) } };
    },
    changeFileDataFromDataCard: (state, action) => {
      return { ...state, card: { ...state.card, files: state.card.files.map((el) => el.id === action.payload.id ? action.payload : el) } };
    },
    resetCard: (state) => {
      return { ...state, card: {} };
    }
  },
});

export const {
  resetAdmin,
  focusOnAcc,
  deleteFocusOnAcc,
  showAddModal,
  hideAddModal,
  showChangeModal,
  hideChangeModal,
  showDelete,
  hideDelete,
  loadData,
  deleteAccFromData,
  addDataToCard,
  cangeDataCard,
  deleteFileFromDataCard,
  changeFileDataFromDataCard,
  resetCard,

} = adminSlice.actions;

export default adminSlice.reducer;
