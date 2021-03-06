import { VoterService } from './events/event-details/voter.service';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { DurationPipe } from './events/shared/duration.pipe';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { SessionsListComponent } from './events/event-details/sessions-list.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from '../app/routes';
import { JQ_TOKEN, TOASTR_TOKEN, Toastr, SimpleModalComponent } from './common';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import {
  EventsListComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  UpvoteComponent,
  LocationValidator,
  EventResolver
} from './events';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './navigation/navbar.component';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';

const toastr: Toastr = window['toastr'];
const  jQuery = window['$'];

@NgModule({
  // imports first (dependencies)
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    CreateSessionComponent,
    CollapsibleWellComponent,
    SessionsListComponent,
    Error404Component,
    SimpleModalComponent,
    UpvoteComponent,

    DurationPipe,

    ModalTriggerDirective,
    LocationValidator
  ],
  // services
  providers: [EventService, VoterService,
  { provide: TOASTR_TOKEN, useValue: toastr },
  { provide: JQ_TOKEN, useValue: jQuery },
  EventResolver,
  EventListResolver,
  AuthService ],
  bootstrap: [EventsAppComponent],
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {

if (component.isDirty) {
    return window.confirm('You have not saved this event, are you sure you want to cancel?');
}

  return true;
}
