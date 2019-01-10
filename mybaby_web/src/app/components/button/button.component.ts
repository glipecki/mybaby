import {Component} from '@angular/core';

@Component({
  selector: 'bb-button',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
}
