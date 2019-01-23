import { IEvent } from './shared/event.model';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './shared/event.service';

@Injectable()
export class EventListResolver implements Resolve<IEvent[]> {

  constructor(private eventService: EventService) { }

  resolve() {
    return this.eventService.getEvents();
  }
}
