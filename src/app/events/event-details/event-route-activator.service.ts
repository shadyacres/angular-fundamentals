import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventService } from '../shared/event.service';


@Injectable()
export class EventRouteActivator implements CanActivate {
  constructor (private eventService: EventService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const routeId: number = +route.params['id'];

    const event = this.eventService.getEventById(routeId);

    const eventExists = event !== undefined;

    if (!eventExists) {
      this.router.navigate(['404']);
    }

    return eventExists;
  }
}
