import {Component, OnInit} from '@angular/core';
import {BottomMenuItem} from './bottom-menu-item';
import {BottomMenuService} from './bottom-menu.service';

@Component({
  selector: 'bb-bottom-menu',
  template: `
    <bb-bottom-menu-item *ngFor="let item of items" [item]="item"></bb-bottom-menu-item>
  `,
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent implements OnInit {

  items: BottomMenuItem[];

  constructor(private config: BottomMenuService) {
  }

  ngOnInit(): void {
    this.config.getItems().subscribe(
      items => this.items = items
    )
  }

}
