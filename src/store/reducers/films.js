import { createReducer } from '@reduxjs/toolkit';
import { getFilmsRequest, getFilmsSuccess, modalChange } from '../actions/films';

const initialState = {
  films: [],
  loading: false,
  isAddFilmOpen: false,
  isImportDataOpen: false,
};

export default createReducer(initialState, {
  [getFilmsRequest]: (state) => {
    state.loading = true
  },
  [getFilmsSuccess]: (state, { payload }) => {
    state.films = [...payload];
    state.loading = false
  },
  [modalChange] : (state, { payload }) => {
    const {target, isOpen} = payload
    state[target] = isOpen;
  },
});
