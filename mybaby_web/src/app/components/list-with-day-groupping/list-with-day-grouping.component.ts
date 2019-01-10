import {Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import moment, {Moment} from 'moment';
import {GroupedRow} from 'src/app/components/list-with-day-groupping/grouped-row';

@Component({
  selector: 'bb-list-with-day-grouping',
  template: `
    <div *ngFor="let day of grouped; trackBy:trackByDay" class="day-group">
      <div class="header">
        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: day}"></ng-container>
      </div>
      <div class="body">
        <div class="row" *ngIf="rowsHeaderTemplate">
          <div class="row-index">&nbsp;</div>
          <div class="row-body">
            <ng-container *ngTemplateOutlet="rowsHeaderTemplate"></ng-container>
          </div>
        </div>
        <div *ngFor="let row of day.rows; let index = index" class="row">
          <div class="row-index" *ngIf="rowIndexing">
            {{day.rows.length - index}}.
          </div>
          <div class="row-body">
            <ng-container *ngTemplateOutlet="rowTemplate; context: {$implicit: row, day: day}"></ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./list-with-day-grouping.component.scss']
})
export class ListWithDayGroupingComponent<T> implements OnChanges {

  @Input() rowIndexing = true;
  @Input() data: T[];
  @Input() dateExtractor: (row: T) => Moment;

  @ContentChild('header') headerTemplate: TemplateRef<any>;
  @ContentChild('rowsHeader') rowsHeaderTemplate: TemplateRef<any>;
  @ContentChild('row') rowTemplate: TemplateRef<any>;

  grouped: GroupedRow<T>[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data || changes.dateExtractor) {
      if (this.data) {
        this.grouped = this.groupByDate(this.data, this.dateExtractor);
      } else {
        this.grouped = [];
      }
    }
  }

  trackByDay(index: number, item: GroupedRow<T>) {
    return item.dateString
  }

  // TODO: move to service
  private groupByDate(data: T[], dateExtractor: (row: T) => Moment) {
    // TODO: sort by date desc using dateExtractor before grouping
    const groupByDate: Record<string, T[]> = data.reduce(
      (prev, row) => {
        const day = dateExtractor(row).format('YYYY-MM-DD');
        return {
          ...prev,
          [day]: prev[day] ? [...prev[day], row] : [row]
        };
      },
      {}
    );
    const grouped = Object.keys(groupByDate)
      .map(key => ({
        dateString: key,
        date: moment(key),
        rows: groupByDate[key]
      }));
    return grouped;
  }

}
