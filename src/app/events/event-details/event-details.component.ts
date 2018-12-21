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
      <h2>{{event?.name | uppercase}} </h2>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div><strong>Date:</strong> {{event?.date | date: 'shortDate'}}</div>
      <div><strong>Time:</strong> {{event?.time}}</div>
      <div><strong>Price:</strong> {{ event?.price | currency:'USD'}}</div>
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
  <div class="row" style="margin-bottom:10px;">
    <div class="col-md-2">
      <h3 style="margin:0">Sessions</h3>
    </div>

    <div class="col-md-7">
      <div class="btn-group btn-group-sm" style="margin-right:20px">
        <button class="btn btn-default" [class.active]="sortBy === 'name'" (click)="sortBy = 'name'">
          Name
        </button>
        <button class="btn btn-default" [class.active]="sortBy === 'votes'" (click)="sortBy = 'votes'">
        By Votes
      </button>
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-default" [class.active]="filterBy === 'all'" (click)="makeActive('all')">
          All
        </button>

        <button class="btn btn-default" [class.active]="filterBy === 'beginner'" (click)="makeActive('beginner')">
          Beginner
        </button>
        <button class="btn btn-default" [class.active]="filterBy === 'intermediate'" (click)="makeActive('intermediate')">
          Intermediate
        </button>
        <button class="btn btn-default" [class.active]="filterBy === 'advanced'" (click)="makeActive('advanced')">
          Advanced
        </button>
      </div>
    </div>
    <div class="col-md-2">
      <a (click)="addSession()">Add Session</a>
    </div>
  </div>
  <sessions-list *ngIf="!addMode" [filterBy]="filterBy" [sortBy]="sortBy" [sessions]="event?.sessions"></sessions-list>
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
  filterBy: filterString  = 'all';
  sortBy: sortString = 'name';

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

  makeActive(filterBy: filterString ) {
    this.filterBy = filterBy;
  }
}

export type filterString = 'all' | 'beginner' | 'intermediate' | 'advanced';
export type sortString = 'name' | 'votes';
