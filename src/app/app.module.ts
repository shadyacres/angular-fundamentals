import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { SessionsListComponent } from './events/event-details/sessions-list.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from '../app/routes';
import { ToastrService } from './common/toastr.service';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  EventsListComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver
} from './events';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './navigation/navbar.component';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';

@NgModule({
  // imports first (dependencies)
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
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
  ],
  // services
  providers: [EventService, ToastrService, EventRouteActivator,
  { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
  EventListResolver,
  AuthService ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {

if (component.isDirty) {
    return window.confirm('You have not saved this event, are you sure you want to cancel?');
}

  return true;
}
