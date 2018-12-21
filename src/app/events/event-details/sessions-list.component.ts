import { filterString, sortString } from './event-details.component';
import { ISession } from './../shared/event.model';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sessions-list',
  template: `

    <div class="row" *ngFor="let session of filteredSessions">
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
})
export class SessionsListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: filterString;
  @Input() sortBy: sortString;
  filteredSessions: ISession[] = [];

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.filteredSessions.sort(this.sortByNameAsc) : this.filteredSessions.sort(this.sortByVotesDesc);
    }
  }

  filterSessions(filter: filterString) {
    if (filter === 'all') {
      this.filteredSessions = this.sessions.slice(0);
    } else {
      this.filteredSessions = this.sessions.filter(s => s.level.toLocaleLowerCase() === filter.toLocaleLowerCase()).slice(0);
    }
  }

  private sortByNameAsc(s1: ISession, s2: ISession): number {
    if (s1.name > s2.name) {
      return 1;
    }
    if (s1.name === s2.name) {
      return 2;
    }

    return -1;
  }

  private sortByVotesDesc(s1: ISession, s2: ISession): number {
    return s2.voters.length - s1.voters.length;
  }
}
