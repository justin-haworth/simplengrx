import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store';

import { Person } from '../person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  // smart component
  @Input() display = '';
  @Input() familyName = '';
  @Input() personType = '';

  people$!: Observable<Person[]>;

  constructor(private ngrxStore: Store<fromStore.RootState>) {}

  ngOnInit(): void {
    if (!this.familyName && !this.personType) {
      this.people$ = this.ngrxStore.select(fromStore.getAllPeopleSortedByAge);
    } else if (!!this.familyName) {
      this.people$ = this.ngrxStore.select(
        fromStore.getFamily(this.familyName)
      );
    } else if (!!this.personType) {
      if (this.personType == 'adults') {
        this.people$ = this.ngrxStore.select(fromStore.getAllAdults);
      } else {
        this.people$ = this.ngrxStore.select(fromStore.getAllChildren);
      }
    }
  }

  onCreatePerson(p: Person): void {
    // console.log('onCreatePerson', p);
    this.ngrxStore.dispatch(fromStore.appAddPerson(p));
  }
}
