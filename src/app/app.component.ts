import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  families$!: Observable<string[]>;

  constructor(private ngrxStore: Store<fromStore.RootState>) {}

  ngOnInit(): void {
    this.families$ = this.ngrxStore.select(fromStore.getAllFamilies);
  }

  onAdvanceYear(): void {
    this.ngrxStore.dispatch(fromStore.appAdvanceYear());
  }
}
