import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './store';

// import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ngrxStore: Store<fromStore.RootState>) {}

  onAdvanceYear(): void {
    this.ngrxStore.dispatch(fromStore.appAdvanceYear());
  }
}
