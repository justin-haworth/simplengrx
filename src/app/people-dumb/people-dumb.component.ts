import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Person } from '../person';

@Component({
  selector: 'app-people-dumb',
  templateUrl: './people-dumb.component.html',
  styleUrls: ['./people-dumb.component.scss'],
})
export class PeopleDumbComponent {
  // dumb component

  @Input() display = '';
  @Input() familyName = '';
  @Input() personType = '';
  @Input() people!: Person[];
  @Input() deathStarts = 0;

  @Output() createPerson = new EventEmitter<Person>();

  onAddFamilyMember(): void {
    const p: Person = {
      first: '', // will randomly generate in reducer
      last: this.familyName,
    };

    this.createPerson.emit(p);
  }
}
