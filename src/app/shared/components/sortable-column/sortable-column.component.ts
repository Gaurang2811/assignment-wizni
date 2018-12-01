import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

// Custom sort column to add sorting in column headers

@Component({
  selector: '[sort-column]',
  templateUrl: './sortable-column.component.html',
  styleUrls: [],
})
export class SortableColumnComponent {

  _sortDirection = '';

  @Input('sort-column') columnName = '';

  @Input('direction')
  set sortDirection(value: any) {
    if (value !== undefined && value.column === this.columnName) {
      this._sortDirection = value.order;
    } else {
      this._sortDirection = '';
    }
  }

  get sortDirection() {
    return this._sortDirection;
  }

  @Output() sortAction = new EventEmitter<any>();

  @HostListener('click')
  sort() {
    this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortAction.emit({
    	columnName: this.columnName,
    	direction: this._sortDirection,
    });
  }

}
