import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDumbComponent } from './people-dumb.component';

describe('PeopleDumbComponent', () => {
  let component: PeopleDumbComponent;
  let fixture: ComponentFixture<PeopleDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleDumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
