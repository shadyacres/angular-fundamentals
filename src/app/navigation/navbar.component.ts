import { EventService } from './../events/shared/event.service';
import { AuthService } from './../user/auth.service';
import { Component } from '@angular/core';
import { IUser } from '../user/user.model';
import { ISession } from '../events';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-bar',
  template: `
    <div class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header"><a class="navbar-brand">ngEvents</a></div>

        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a [routerLink]="['./events']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">All Events</a></li>
            <li><a [routerLink]="['./events/new']"  routerLinkActive="active">Create Event</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                Events <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li><a href="">Angular Connect</a></li>
              </ul>
            </li>
          </ul>
          <div class="navbar-header navbar-right">
            <ul class="nav navbar-nav">
              <li *ngIf="!authService.isAuthenticated()">
                <a [routerLink]="['./user/login']">Login</a>
                </li>
              <li *ngIf="authService.isAuthenticated()">
                <a [routerLink]="['./user/profile']">Welcome {{authService.currentUser.userName}}</a>
              </li>
            </ul>
          </div>
          <form id="searchForm" (ngSubmit)="searchSessions(searchTerm)" class="navbar-form navbar-right">
            <div class="form-group">
              <input
                [(ngModel)]="searchTerm"
                name="searchTerm"
                type="text"
                class="form-control"
                placeholder="Search Sessions"
              />
            </div>
            <button class="btn btn-default" modal-trigger="searchResults">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>

    <simple-modal closeOnBodyClick="true" elementId="searchResults" title="Matching Sessions">
      <div class="list-group">
        <a class="list-group-item" *ngFor="let session of foundSessions"
           [routerLink]="['/events', session.eventId]">{{session.name}}</a>
      </div>
    </simple-modal>
  `,
  styles: [`
   .nav.navbar-nav { font-size: 15px; }
   #searchForm {margin-right: 100px; }
   @media (max-width: 1200px) { #searchForm { display: none; } }
   li > a.active { color: #F97924; }
  `]
})
export class NavBarComponent {
  user: IUser;
  searchTerm = '';
  foundSessions: ISession[];

  constructor(public authService: AuthService, private eventService: EventService) { }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe
      (sessions => {
        this.foundSessions = sessions;
      });


  }
}
