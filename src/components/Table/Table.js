import { ExcelComponent } from '@core/ExcelComponent';
import { createTable, handleClickCell } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(element) {
    super(element, {
      name: 'Table',
      listeners: ['click'],
    });
  }

  toHTML() {
    return createTable({ rowsCount: 17 });
  }

  onClick(e) {
    return handleClickCell(e);
  }
};
