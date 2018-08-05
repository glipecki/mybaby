import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bb-operation-with-confirm',
  template: `
    <div *ngIf="mode === 'summary'">
      <bb-button (click)="onOperationClicked()">{{operationText}}</bb-button>
    </div>
    <div *ngIf="mode === 'confirm'" class="confirm">
      <div class="summary">
        <ng-content></ng-content>
      </div>
      <div class="actions">
        <bb-button (click)="onConfirmClicked()" class="confirm">{{confirmText}}</bb-button>
        <bb-button (click)="onCancelClicked()" class="cancel">{{cancelText}}</bb-button>
      </div>
    </div>
  `,
  styleUrls: [
    './operation-with-confirm.component.scss'
  ]
})
export class OperationWithConfirmComponent {

  @Input() operationText: string;
  @Input() confirmText: string;
  @Input() cancelText: string;
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() confirmOpen = new EventEmitter();

  mode: 'summary' | 'confirm' = 'summary';

  onOperationClicked() {
    this.mode = 'confirm';
    this.confirmOpen.next();
  }

  onCancelClicked() {
    this.mode = 'summary';
    this.cancel.emit();
  }

  onConfirmClicked() {
    this.mode = 'summary';
    this.confirm.emit();
  }

}
