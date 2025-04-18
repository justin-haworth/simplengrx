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
  year$!: Observable<number>;
  families$!: Observable<string[]>;

  constructor(private ngrxStore: Store<fromStore.RootState>) {}

  ngOnInit(): void {
    this.year$ = this.ngrxStore.select(fromStore.getYear);
    this.families$ = this.ngrxStore.select(fromStore.getAllFamilies);
  }

  onAdvanceYear(): void {
    this.ngrxStore.dispatch(fromStore.appAdvanceYear());
  }
}
