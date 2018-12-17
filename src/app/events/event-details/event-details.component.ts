import { ISession } from './../shared/event.model';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../shared';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-details',
  template: `
  <div class="container">
  <img class="event-image" [src]="event?.imageUrl" [alt]="event?.name">

  <div class="row">
    <div class="col-md-11">
      <h2>{{event?.name}} </h2>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div><strong>Date:</strong> {{event?.date.toLocaleDateString()}}</div>
      <div><strong>Time:</strong> {{event?.time}}</div>
      <div><strong>Price:</strong> \${{ event?.price }}</div>
    </div>
    <div class="col-md-6">
      <address>
        <strong>Address:</strong><br />
        {{event?.location?.address}}<br />
        {{event?.location?.city}}, {{event?.location?.country}}
      </address>
    </div>
  </div>

  <hr />
  <div class="row">
    <div class="col-md-2">
      <h3 style="margin:0">Sessions</h3>
    </div>

    <div class="col-md-2">
      <a (click)="addSession()">Add Session</a>
    </div>
  </div>
  <sessions-list *ngIf="!addMode" [sessions]="event?.sessions"></sessions-list>
  <create-session *ngIf="addMode" (saveNewSession)="saveNewSession($event)" (cancelSave)="cancelSave()"></create-session>
</div>`,
styles: [`
  .container { padding-left:20px; padding-right:20px; }
  .event-image { height: 100px; }
  a { cursor: pointer; }
`]
})

export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event = this.eventService.getEventById(+this.route.snapshot.params['id']);
  }

  addSession(): void {
      this.addMode = true;
  }

  saveNewSession(session: ISession): void {
    session.id = Math.max.apply(this.event.sessions.map(s => s.id)) + 1;

    this.event.sessions = [...this.event.sessions, session];
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelSave(): void {
    this.addMode = false;
  }
}
