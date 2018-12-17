import { ISession } from './../shared/event.model';
import { Component, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sessions-list',
    template: `
    <div class="row" *ngFor="let session of sessions">
      <div class="col-md-10">
        <div class="well">
          <h4>{{session.name}}</h4>
          <h6>{{session.presenter}}</h6>
          <span>Duration: {{session.duration}}</span><br />
          <span>Level: {{session.level}}</span>
          <p>{{session.abstract}}</p>
        </div>
      </div>
    </div>
    `,
    styles: [`

    `]
})
export class SessionsListComponent {
  @Input() sessions: ISession[];
}
