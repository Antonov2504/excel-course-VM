import {
  CHAR_CODE,
  initialColumnsCount,
  INITIAL_ROWS_COUNT,
} from './constants';

let activeCell = document.querySelector('cell selected');

const createColumn = (_, index) => {
  return `
    <div class="column">${String.fromCharCode(index + CHAR_CODE.A)}</div>
  `;
};

const createRow = (index, content) => {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
};

const createCell = (_, index) => {
  return `
    <div class="cell" contenteditable></div>
  `;
};

export const createTable = ({
  columnsCount = initialColumnsCount,
  rowsCount = INITIAL_ROWS_COUNT,
}) => {
  const rows = [];
  const columns = new Array(columnsCount).fill('').map(createColumn).join('');
  const cells = new Array(columnsCount).fill('').map(createCell).join('');

  rows.push(createRow('', columns));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
};

export const handleClickCell = (e) => {
  const isCell = e.target.classList.contains('cell');

  if (activeCell) {
    activeCell.classList.remove('selected');
  }

  if (isCell) {
    e.target.classList.add('selected');
    activeCell = e.target;
  }
};
