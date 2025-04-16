import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromApp from '../reducers/app.reducer';

import { Person } from '../../person';

const ADULT_AGE = 21;

export const getAppState = createSelector(
  fromFeature.getRootState,
  (state: fromFeature.RootState) => state.app
);

export const getPeople = createSelector(getAppState, fromApp.getPeople);

// custom selectors

export const getAllPeopleSortedByAge = createSelector(
  getPeople,
  (people: Person[]) => {
    if (!people || !people.length) {
      return [];
    }

    // ts or ngrx complain if you just do people.sort()
    // i made birth optional in the Person interface and TS lost its shit lol - this sort used to be simple
    return [...people].sort((a, b) => {
      const ab = a.birth || 0;
      const bb = b.birth || 0;
      return ab - bb;
    });
  }
);

export const getFamily = (lastName: string) =>
  createSelector(getAllPeopleSortedByAge, (people: Person[]) => {
    // console.log('getFanmily', lastName);
    if (!people || !people.length) {
      return [];
    } else if (!lastName) {
      return [...people];
    }

    return people.filter((p) => p.last == lastName);
  });

export const getAllAdults = createSelector(
  getAllPeopleSortedByAge,
  (people: Person[]) => {
    // console.log('getAllAdults');
    if (!people || !people.length) {
      return [];
    }

    // people.forEach((p) => console.log(p.first, p.last, p.age));

    return people.filter((p) => (!!p.age ? p.age >= ADULT_AGE : false));
  }
);

export const getAllChildren = createSelector(
  getAllPeopleSortedByAge,
  (people: Person[]) => {
    // console.log('getAllChildren');
    if (!people || !people.length) {
      return [];
    }

    return people.filter((p) => (!!p.age ? p.age < ADULT_AGE : false));
  }
);
