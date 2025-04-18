import { Component, Input, OnChanges } from '@angular/core';

import { Person } from '../person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnChanges {
  // dumb component
  @Input() person!: Person;
  @Input() deathStarts = 0;

  showStatus = false;
  status = '';

  ngOnChanges(): void {
    // console.log(this.person.age);
    this.status = this.person.alive ? 'Yes' : 'No';
    this.showStatus =
      (this.person && this.person.age && this.person.age >= this.deathStarts) ||
      false;
  }
}
