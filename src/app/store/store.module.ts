import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducers } from './';

@NgModule({
  imports: [StoreModule.forFeature('root', reducers)],
})
export class MainStoreModule {}
