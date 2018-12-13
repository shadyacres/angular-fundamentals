import {
  EventDetailsComponent,
  EventsListComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver
} from './events';

import { Error404Component } from './errors/404.component';
import { UserModule } from './user/user.module';

export const appRoutes = [
 { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
 { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
 { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
 { path: '404', component: Error404Component },
 { path: '', redirectTo: '/events', pathMatch: 'full' },
 { path: 'user', loadChildren: () => UserModule }
];
