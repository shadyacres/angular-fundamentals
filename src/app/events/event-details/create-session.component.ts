import { ISession, restrictedWords } from './../shared';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-session',
  template: `
  <div class="col-md-12">
  <h3>Create Session</h3>
</div>
<div class="col-md-6">
  <form [formGroup]="newSessionForm" autocomplete="off" (ngSubmit)="saveSession()">
    <div class="form-group" [ngClass]="{'error': name.invalid && name.dirty}">
      <em *ngIf="name.invalid && name.dirty">Required</em>
      <label for="sessionName">Session Name:</label>
      <input formControlName="name" id="sessionName" type="text" class="form-control" placeholder="session name..." />
    </div>
    <div class="form-group" [ngClass]="{'error': presenter.invalid && presenter.dirty}">
      <em *ngIf="presenter.invalid && presenter.dirty">Required</em>
      <label for="eventDate">Presenter:</label>
      <input formControlName="presenter" id="presenter" type="text" class="form-control" placeholder="presenter..." />
    </div>
    <div class="form-group" [ngClass]="{'error': duration.invalid && duration.dirty}">
      <em *ngIf="duration.invalid && duration.dirty">Required</em>
      <label for="duration">Duration:</label>
      <select formControlName="duration" class="form-control">
        <option value="">select duration...</option>
        <option value="1">Half Hour</option>
        <option value="2">1 Hour</option>
        <option value="3">Half Day</option>
        <option value="4">Full Day</option>
      </select>
    </div>
    <div class="form-group" [ngClass]="{'error': level.invalid && level.dirty}">
      <em *ngIf="level.invalid && level.dirty">Required</em>
      <label for="level">Level:</label>
      <select formControlName="level" class="form-control">
        <option value="">select level...</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
    <div class="form-group" [ngClass]="{'error': abstract.invalid && abstract.dirty}">
      <label for="abstract">Abstract:</label>
      <em *ngIf="abstract.invalid && abstract.dirty && abstract.errors['required']">Required</em>
      <em *ngIf="abstract.invalid && abstract.dirty && abstract.errors['maxlength']">Max length is 400 characters</em>
      <em *ngIf="abstract.invalid && abstract.dirty && abstract.errors['restrictedWords']">
        Invalid entry: {{abstract.errors['restrictedWords']}}
      </em>
      <textarea formControlName="abstract" id="abstract" rows=3 class="form-control" placeholder="abstract..."></textarea>
    </div>
    <button type="submit" [disabled]="!newSessionForm.valid" class="btn btn-primary">Save</button>
    <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
  </form>
</div>`,

styles: [`
em { float:right; color:#E05C65; padding-left: 10px; }
.error input {background-color: #E3C3C5;}
.error textarea {background-color: #E3C3C5; color: #999 }
.error ::-webkit-input-placeholder { color: #999; }
.error ::-moz-placeholder { color: #999; }
.error :-moz-placeholder { color: #999; }
.error :-ms-input-placeholder { color: #999; }
`]
})
export class CreateSessionComponent implements OnInit {
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelSave = new EventEmitter();
  public newSessionForm: FormGroup;
  public name: FormControl;
  public presenter: FormControl;
  public duration: FormControl;
  public level: FormControl;
  public abstract: FormControl;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = new FormControl('', [Validators.required]);
    this.presenter = new FormControl('', [Validators.required]);
    this.duration = new FormControl('', [Validators.required]);
    this.level = new FormControl('', [Validators.required]);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    });
  }

  saveSession(): void {
    const session: ISession = {
      id: undefined,
      name: this.newSessionForm.controls.name.value,
      presenter: this.newSessionForm.controls.presenter.value,
      duration: +this.newSessionForm.controls.duration.value,
      level: this.newSessionForm.controls.level.value,
      abstract: this.newSessionForm.controls.abstract.value,
      voters: []
    };

    this.saveNewSession.emit(session);
  }

  cancel() {
    this.cancelSave.emit();
  }
}
