import {Component} from '@angular/core';

@Component({
  selector: 'bb-flat-button',
  template: `
    <div class="link">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./flat-button.component.scss']
})
export class FlatButtonComponent {

}
