import { EventService } from './shared/event.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from '.';


@Component ({
  template: `
  <h1>New Event</h1>
  <hr>
  <div class="col-md-6">
    <form #newEventForm="ngForm" (ngSubmit)="saveEvent(newEventForm.value)" autocomplete="off" novalidate>
      <div class="form-group" [ngClass]="{'error': newEventForm.controls.name?.invalid && newEventForm.controls.name?.touched}">
        <label for="eventName">Event Name:</label>
        <em *ngIf="newEventForm.controls.name?.invalid && (newEventForm.controls.name?.touched)">Required</em>
        <input (ngModel)="newEvent.name" name="name" required id="name" type="text" class="form-control" placeholder="Name of your event..." />
      </div>
      <div class="form-group" [ngClass]="{'error': newEventForm.controls.date?.invalid && newEventForm.controls.date?.touched}">
        <label for="eventDate">Event Date:</label>
        <em *ngIf="newEventForm.controls.date?.invalid && (newEventForm.controls.date?.touched)">Required</em>
        <input (ngModel)="newEvent.date" name="date" required id="eventDate" type="text" class="form-control" placeholder="format (mm/dd/yyyy)..." />
      </div>
      <div class="form-group" [ngClass]="{'error': newEventForm.controls.time?.invalid && newEventForm.controls.time?.touched}">
        <label for="eventTime">Event Time:</label>
        <em *ngIf="newEventForm.controls.time?.invalid && (newEventForm.controls.time?.touched)">Required</em>
        <input (ngModel)="newEvent.time" name="time" required id="eventTime" type="text" class="form-control" placeholder="start and end time..." />
      </div>
      <div class="form-group" [ngClass]="{'error': newEventForm.controls.price?.invalid && newEventForm.controls.price?.touched}">
        <label for="eventPrice">Event Price:</label>
        <em *ngIf="newEventForm.controls.price?.invalid && (newEventForm.controls.price?.touched)">Required</em>
        <input (ngModel)="newEvent.price" name="price" required id="eventPrice" type="text" type="number" class="form-control" placeholder="event price..." />
      </div>
      <div ngModelGroup="location">
        <div class="form-group">
          <label for="address">Event Location:</label>
          <input (ngModel)="newEvent.address" name="address" id="address" type="text" class="form-control" placeholder="Address of event..." />
        </div>
        <div class="row">
          <div class="col-md-6">
            <input (ngModel)="newEvent.city" name="city" id="city" type="text" class="form-control" placeholder="City..." />
          </div>
          <div class="col-md-6" >
            <input (ngModel)="newEvent.country" name="country" id="country" type="text" class="form-control" placeholder="Country..." />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="onlineUrl">Online Url:</label>
        <input (ngModel)="newEvent.onlineUrl" name="onlineUrl" id="onlineUrl" type="text" class="form-control" placeholder="Online Url..." />
      </div>
      <div class="form-group" [ngClass]="{'error': newEventForm.controls.imageUrl?.invalid && newEventForm.controls.imageUrl?.touched}">
        <label for="imageUrl">Image:</label>
        <em *ngIf="newEventForm.controls.imageUrl?.invalid && newEventForm.controls.imageUrl?.touched && newEventForm.controls.imageUrl?.errors.required">Required</em>
        <em *ngIf="newEventForm.controls.imageUrl?.invalid && newEventForm.controls.imageUrl?.touched  && newEventForm.controls.imageUrl?.errors.pattern">Must be a png or jpg url</em>
        <input (ngModel)="newEvent.imageUrl" name="imageUrl" required pattern=".*\/.*.(png|jpg)" id="imageUrl" type="text" class="form-control" placeholder="url of image..." />
        <img src="newEventForm.controls.imageUrl.value"
             *ngIf="newEventForm.controls.imageUrl?.valid"/>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" [disabled]="newEventForm.invalid" class="btn btn-default" (click)="cancel()">Cancel</button>
    </form>
  </div>
  `,
  styles: [`
  em { float:right; color:#E05C65; padding-left: 10px; }
  .error input {background-color: #E3C3C5;}
  .error ::-webkit-input-placeholder { color: #999; }
  .error ::-moz-placeholder { color: #999; }
  .error :-moz-placeholder { color: #999; }
  .error :-ms-input-placeholder { color: #999; }
  `]
})

export class CreateEventComponent {

constructor(private router: Router, private eventService: EventService) { }
  newEvent: IEvent;
  isDirty = true;

  cancel() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues: IEvent) {
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }
}
