import { ToastrService } from './../common/toastr.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  // tslint:disable-next-line:component-selector
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
          <event-thumbnail
            (click)="handleThumbnailClick(event.name)"
            [event]="event"
          ></event-thumbnail>
        </div>
      </div>
    </div>
  `
})

export class EventsListComponent implements OnInit {
  events: any[];

  constructor(private eventService: EventService, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.events = this.route.snapshot.data['events'];
  }

  handleThumbnailClick(eventName: string): void {
    this.toastrService.success(eventName);
  }
}
