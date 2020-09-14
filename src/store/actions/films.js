import { createAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';

const apiService = new ApiService();

export const getFilmsRequest = createAction('R:films/get');
export const getFilmsSuccess = createAction('S:films/get');
export const setFilmSuccess = createAction('S:films/set');
export const eraseFilmSuccess = createAction('S:films/erase');
export const modalChange = createAction('modal/update');

export const getFilms = async (dispatch) => {
  try {
    dispatch(getFilmsRequest());
    const response = await apiService.getAllFilms();

    dispatch(getFilmsSuccess(response));
  } catch (error) {
    console.log(error);
  }
};

export const setModal = (target, isOpen) => {
    return (dispatch) => {
        dispatch(modalChange({target, isOpen}))
    }
}

export const addFilm = (params) => {
    return async (dispatch) => {
        try {
            const response = await apiService.setFilm({params});

            console.log(response);
            dispatch(setFilmSuccess());
        } catch (error) {
            
        }
    }
}

export const eraseFilm = (id) => {
  return async (dispatch) => {
      try {
          const response = await apiService.deleteFilm({id});

          console.log(response);
          dispatch(setFilmSuccess());
      } catch (error) {
          console.log(error);
      }
  }
}
