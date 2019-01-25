import { Component } from '@angular/core';
import { ISession } from './../shared/event.model';
import { SessionsListComponent } from './sessions-list.component';


describe('sessionListComponent', () => {
  let component: SessionsListComponent;
  let mockAuthService, mockVoterService;

  beforeEach(() => {

    component = new SessionsListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', () => {
    it('should filter', () => {
      component.sessions = <ISession[]>[
        { name: 'session1', level: 'intermediate' },
        { name: 'session2', level: 'intermediate' },
        { name: 'session3', level: 'beginner' }
      ];

      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 1;

      component.ngOnChanges();

      expect(component.filterSessions.length).toBe(1);
    });
  });

  describe('ngOnChanges', () => {
    it('should filter', () => {
      component.sessions = <ISession[]>[
        { name: 'session1', level: 'intermediate' },
        { name: 'session3', level: 'intermediate' },
        { name: 'session2', level: 'beginner' }
      ];

      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 1;

      component.ngOnChanges();

      console.log(component.filterSessions);
      expect(component.filterSessions[0].name).toBe('session3');
    });
  });
});
