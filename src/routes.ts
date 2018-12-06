import { EventDetailsComponent } from './app/events/event-details/event-details.component';
import { EventsListComponent } from './app/events/events-list.component';

export const appRoutes = [
 { path: 'events', component: EventsListComponent },
 { path: 'events/:id', component: EventDetailsComponent },
 { path: '', redirectTo: '/events', pathMatch: 'full' }
];
