import {Component} from '@angular/core';
import {faSadTear} from '@fortawesome/free-solid-svg-icons/faSadTear';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'bb-page-not-found',
  template: `
    <fa-icon [icon]="icon"></fa-icon>
  `,
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent{

  icon: IconDefinition = faSadTear;

}
