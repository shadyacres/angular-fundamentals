import { ISession } from './../shared/event.model';
import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sessions-list',
  template: `

    <div class="row" *ngFor="let session of sessions">
      <div class="col-md-10">
        <collapsible-well [title]="session.name">
          <div well-title>
            {{session.name}}&nbsp;
            <i *ngIf="session.voters.length > 3" class="glyphicon glyphicon-fire" style="color:red;"></i>
          </div>
          <div well-body>
            <h6>{{session.presenter}}</h6>
            <span>Duration: {{session.duration | duration}}</span><br />
            <span>Level: {{session.level}}</span>
            <p>{{session.abstract}}</p>
          </div>
        </collapsible-well>
      </div>
    </div>
    `,
  styles: [`

    `]
})
export class SessionsListComponent {
  @Input() sessions: ISession[];
}
