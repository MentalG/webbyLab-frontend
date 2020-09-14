import { createSelector } from 'reselect'

export const getFilms = state => state.films;

export const getFilmsData = createSelector(
    getFilms,
    films => films
)