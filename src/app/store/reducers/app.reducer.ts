import * as fromApp from '../actions/app.action';
import { createReducer, on } from '@ngrx/store';

import { Person } from '../../person';

export interface AppState {
  year: number;
  people: Person[];
}

const possibleFirstNames: string[] = [
  'Sonya',
  'Bob',
  'Andy',
  'Jennifer',
  'Randall',
  'Allison',
  'Timothy',
  'Sandy',
  'Sally',
  'Cindy',
  'Mark',
  'Paul',
  'Joseph',
  'Allen',
  'Robert',
  'Erica',
  'Julie',
];

let allPeople: Person[] = [
  {
    first: 'Adam',
    last: 'Smith',
    birth: 2010,
  },
  {
    first: 'Barbara',
    last: 'Smith',
    birth: 1980,
  },
  {
    first: 'Charlie',
    last: 'Smith',
    birth: 1977,
  },
  {
    first: 'Denise',
    last: 'Smith',
    birth: 2012,
  },
  {
    first: 'Earl',
    last: 'Jones',
    birth: 1983,
  },
  {
    first: 'Fran',
    last: 'Jones',
    birth: 1986,
  },
  {
    first: 'Gabby',
    last: 'Jones',
    birth: 2020,
  },
];

function getAge(birth: number, year = 2025): number {
  return year - birth;
}

// this is not typical for ngrx or anything ... just using it to map ages
allPeople = allPeople.map((d) => {
  if (!d.birth) {
    // so TS doesnt complain down below
    return { ...d };
  }

  const age = getAge(d.birth);

  return { ...d, age };
});

export const initialAppState: AppState = {
  year: 2025,
  people: [...allPeople],
};

export const reducer = createReducer(
  initialAppState,

  on(fromApp.appAdvanceYear, (state) => {
    const year = state.year + 1;
    const people = state.people.map((p) => {
      if (!p.birth) {
        return { ...p };
      }
      const age = getAge(p.birth, year);
      return { ...p, age };
    });

    return { ...state, year, people };
  }),

  on(fromApp.appAddPerson, (state, p) => {
    const rand = Math.floor(Math.random() * possibleFirstNames.length);
    const first = possibleFirstNames[rand];
    const initAge = Math.ceil(Math.random() * 5);
    const birth = state.year - initAge;

    const newPerson: Person = {
      ...p,
      first,
      birth,
      age: initAge,
    };

    const people = [...state.people, newPerson];

    return {
      ...state,
      people,
    };
  })
);

export const getPeople = (state: AppState) => state.people;
