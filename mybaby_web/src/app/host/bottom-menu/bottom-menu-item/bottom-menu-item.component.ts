import {Component, HostBinding, Input} from '@angular/core';
import {Router} from '@angular/router';
import {BottomMenuItem} from '../bottom-menu-item';
import {BottomMenuItemIconType} from '../bottom-menu-item-icon-type';

@Component({
  selector: 'bb-bottom-menu-item',
  template: `
    <div [routerLink]="item.routingPath.path()" class="item">
      <div class="icon">
        <ng-container *ngIf="item.iconType === BottomMenuItemIconType.FAS">
          <fa-icon [icon]="item.icon"></fa-icon>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./bottom-menu-item.component.scss']
})
export class BottomMenuItemComponent {

  // noinspection JSUnusedGlobalSymbols - used by template
  BottomMenuItemIconType = BottomMenuItemIconType;

  @Input() item: BottomMenuItem;

  @HostBinding('class.active')
  get hostClassActive(): boolean {
    return this.router.url === this.item.routingPath.path();
  }

  constructor(private router: Router) {
  }

}
