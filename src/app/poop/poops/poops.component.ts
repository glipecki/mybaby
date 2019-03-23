import {Component, OnInit} from '@angular/core';
import moment from 'moment';
import {Observable} from 'rxjs';
import {Poop, PoopSizeKeys} from '../poop';
import {PoopService} from '../poop.service';

@Component({
  selector: 'bb-poops',
  template: `
    <bb-list-with-day-grouping [data]="poops$|async"
                               [dateExtractor]="poopDateExtractor">
      <ng-template #header let-day>
        {{day.dateString}}
      </ng-template>
      <ng-template #row let-row>
        {{row.date}}: {{keys[row.size]}}
      </ng-template>
    </bb-list-with-day-grouping>
    <button *ngIf="!allLoaded" (click)="loadAll()">kolejne</button>
  `,
  styleUrls: [
    './poops.component.scss'
  ]
})
export class PoopsComponent implements OnInit {

  readonly keys = PoopSizeKeys;
  poopDateExtractor = (poop: Poop) => moment(poop.date);
  poops$: Observable<Poop[]>;
  allLoaded = false;

  constructor(private service: PoopService) {
  }

  ngOnInit() {
    this.poops$ = this.service.poops$(moment().subtract(7, 'days').format('YYYY-MM-DD'));
  }

  loadAll() {
    this.allLoaded = true;
    this.poops$ = this.service.poops$();
  }

}
