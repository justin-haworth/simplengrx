import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromApp from './app.reducer';

export interface RootState {
  app: fromApp.AppState;
}

export const reducers: ActionReducerMap<RootState> = {
  app: fromApp.reducer,
};

export const getRootState = createFeatureSelector<RootState>('root');
