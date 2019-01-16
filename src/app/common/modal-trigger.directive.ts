import { JQ_TOKEN } from './jQuery.service';
import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  // tslint:disable-next-line:no-input-rename
  @Input('modal-trigger')  modalId: string;

  constructor(el: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = el.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('click', _ => {
    this.$(`#${this.modalId}`).modal({});
    });
  }
}
