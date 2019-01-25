import { Observable, of } from 'rxjs';
import { ISession } from './../shared/event.model';
import { VoterService } from './voter.service';

describe('VoterService', () => {


  let voterService: VoterService;
  let mockHttp: any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    mockHttp.delete.and.returnValue(of(false));
    mockHttp.post.and.returnValue(of(false));

    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      // arrange
      const session = { id: 6, voters: ['joe', 'john'] };

      // act
      voterService.deleteVoter(3, <ISession>session, 'joe');

      // assert
      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
    });

    it('should call http delete url', () => {
      // arrange
      const session = { id: 6, voters: ['joe', 'john'] };

      // act
      voterService.deleteVoter(3, <ISession>session, 'joe');

      // assert
      expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe');
    });
  });

  describe('addVoter', () => {
    it('should call http add url', () => {
      // arrange
      const session = { id: 6, voters: ['john'] };

      // act
      voterService.addVoter(3, <ISession>session, 'joe');

      // assert
      expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {}, jasmine.any(Object));
    });
  });
});
