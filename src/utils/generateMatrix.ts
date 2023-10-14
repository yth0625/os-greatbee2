import { weekDays, daysInEachMonth } from 'const/constance';

export function generateMatrix(currentDate: Date) {
  let matrix: { date: number | string }[][] = [];

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let firstDay = new Date(year, month, 1).getDay();
  let maxDays = daysInEachMonth[month];

  if (month == 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }

  let counter = 1;
  for (let row = 1; row < 7; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      matrix[row][col] = { date: -1 };

      if (row == 1 && col >= firstDay) {
        matrix[row][col] = { date: counter++ };
      } else if (row > 1 && counter <= maxDays) {
        matrix[row][col] = { date: counter++ };
      }
    }
  }

  return matrix;
}
