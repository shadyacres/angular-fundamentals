import { EventResolver } from './events/event-resolver.service';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import {
  EventDetailsComponent,
  EventsListComponent,
  CreateEventComponent,
  EventListResolver
} from './events';

import { Error404Component } from './errors/404.component';
import { UserModule } from './user/user.module';

export const appRoutes = [
 { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
 { path: 'events/new', component: CreateEventComponent },
 { path: 'events/session/new', component: CreateSessionComponent },
 { path: 'events/:id', component: EventDetailsComponent, resolve:  { event: EventResolver } },
 { path: '404', component: Error404Component },
 { path: '', redirectTo: '/events', pathMatch: 'full' },
 { path: 'user', loadChildren: () => UserModule }
];
