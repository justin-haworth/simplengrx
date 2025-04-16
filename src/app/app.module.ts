import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule, MetaReducer } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MainStoreModule } from './store/store.module';
import { PeopleComponent } from './people/people.component';
import { PeopleDumbComponent } from './people-dumb/people-dumb.component';
import { PersonComponent } from './person/person.component';

@NgModule({
  declarations: [AppComponent, PeopleComponent, PeopleDumbComponent, PersonComponent],
  imports: [BrowserModule, StoreModule.forRoot(), MainStoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
