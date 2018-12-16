import { Component, Input } from '@angular/core';
import { IEvent } from '.';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-thumbnail',
  template: `
  <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
  <h2>{{event?.name}}</h2>
  <div>Date: {{event?.date}}</div>
  <div>Time: {{event?.time}}</div>
  <div>Price: \${{event?.price}}</div>
  <div [hidden]="event?.location === undefined">
      <span>Location: {{event?.location?.address}}</span>
      <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
  </div>
  <div *ngIf="event?.onlineUrl !== undefined">Online URL: {{event?.onlineUrl}}
</div>
  `,
  styles: [`
    .thumbnail { min-height: 210px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `]
})

export class EventThumbnailComponent {
  @Input() event: IEvent;
}
