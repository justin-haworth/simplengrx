import { Component, Input } from '@angular/core';

import { Person } from '../person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  // dumb component
  @Input() person!: Person;
}
