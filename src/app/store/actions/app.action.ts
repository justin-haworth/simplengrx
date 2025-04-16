import { createAction, props } from '@ngrx/store';

import { Person } from '../../person';

export const appAdvanceYear = createAction('[App] Advance Year');

export const appAddPerson = createAction('[App] Add Person', props<Person>());
