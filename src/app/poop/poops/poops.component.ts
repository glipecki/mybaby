import {Component, OnInit} from '@angular/core';
import moment from 'moment';
import {Observable} from 'rxjs';
import {Poop} from '../poop';
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
        kupa: {{row | json}}
      </ng-template>
    </bb-list-with-day-grouping>
  `,
  styleUrls: [
    './poops.component.scss'
  ]
})
export class PoopsComponent implements OnInit {

  poopDateExtractor = (poop: Poop) => moment(poop.date);
  poops$: Observable<Poop[]>;

  constructor(private service: PoopService) {
  }

  ngOnInit() {
    this.poops$ = this.service.poops$();
  }

}