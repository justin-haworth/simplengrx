import * as fromApp from '../actions/app.action';
import { createReducer, on } from '@ngrx/store';

import { Person } from '../../person';

export interface AppState {
  year: number;
  people: Person[];
  deathStarts: number;
}

const FIRST_NAMES: string[] = [
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
const DEATH_STARTS = 80;
const DEATH_RANGE = 10;

let allPeople: Person[] = [
  {
    first: 'Adam',
    last: 'Smith',
    birth: 2010,
    alive: true,
  },
  {
    first: 'Barbara',
    last: 'Smith',
    birth: 1980,
    alive: true,
  },
  {
    first: 'Charlie',
    last: 'Smith',
    birth: 1977,
    alive: true,
  },
  {
    first: 'Denise',
    last: 'Smith',
    birth: 2012,
    alive: true,
  },
  {
    first: 'Earl',
    last: 'Jones',
    birth: 1983,
    alive: true,
  },
  {
    first: 'Fran',
    last: 'Jones',
    birth: 1986,
    alive: true,
  },
  {
    first: 'Gabby',
    last: 'Jones',
    birth: 2020,
    alive: true,
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
  deathStarts: DEATH_STARTS,
};

export const reducer = createReducer(
  initialAppState,

  on(fromApp.appAdvanceYear, (state) => {
    const year = state.year + 1;
    const people = state.people.map((p) => {
      const birth = p.birth || 2025;
      let alive = p.alive || false;
      let age = p.age || 0;

      if (alive && age >= DEATH_STARTS) {
        // console.log(`Is this the year ${p.first} dies?`);

        const randomDeathAge =
          Math.floor(Math.random() * DEATH_RANGE) + DEATH_STARTS;

        alive = age < randomDeathAge;

        // if (!alive) {
        //   console.log(`Oh no, ${p.first} died at the age of ${age}!`);
        // }
      }

      if (alive) {
        age = getAge(birth, year);
      }

      return { ...p, age, alive };
    });

    return { ...state, year, people };
  }),

  on(fromApp.appAddPerson, (state, p) => {
    const rand = Math.floor(Math.random() * FIRST_NAMES.length);
    const first = FIRST_NAMES[rand];
    const initAge = Math.ceil(Math.random() * 5);
    const birth = state.year - initAge;

    const newPerson: Person = {
      ...p,
      first,
      birth,
      age: initAge,
      alive: true,
    };

    const people = [...state.people, newPerson];

    return {
      ...state,
      people,
    };
  })
);

export const getYear = (state: AppState) => state.year;
export const getPeople = (state: AppState) => state.people;
export const getDeathStarts = (state: AppState) => state.deathStarts;
