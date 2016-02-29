var randomInc = function (min,max) {
    return Math.floor(Math.random()*(max - min +1) + min);
  };

var numpush = [];
var numlist = [];
var blocks = [];

///////////////////////////////////////////////////////////////

var rows = [];

var createRows = function(x) {
  rows = [];
  for (var i = 1; i<=x; i++) {
    var addRow = document.createElement('tr');
    var table = document.getElementsByTagName('table')[0];
    addRow.classList.add('r');
    addRow.classList.add('row'+i);
    table.appendChild(addRow);
    rows.push('.row'+i);
  }
};

var cols = [];

var createColumns = function(y) {
  cols = [];
  for (var i = 0;i<rows.length;i++) {
    for (var j=1;j<=y;j++) {
    var addCol = document.createElement('td');
    var row = document.querySelector(rows[i]);
    addCol.classList.add('col'+j);
    row.appendChild(addCol);
      if (i===0) {
      cols.push('.col'+j);
      }
  }
  }
};

function createTable(rows,cols) {
  createRows(rows);
  createColumns(cols);
}

// THE FUNCTION BELOW DIDN'T WORK: RETRIEVED FROM STACKOVERFLOW. WHY??
// function allocateRowCol(max) {
// var table = document.getElementsByTagName("table")[0];
// for (var i = 0, row; row = table.rows[i]; i++) {
//   for (var j = 0, col; col = row.cells[j]; j++) {
//     var number = randomInc(1,max);
//     numpushCol.push(col);
//    }
// }
// }
var num = [];
function allocateCells(max) {
var table = document.getElementById("table");
var cells = table.getElementsByTagName('td');
console.log(cells);
for (var i = 0; i<cells.length; i++) {
  var number = randomInc(1,max);
  cells[i].innerHTML = number;
//   console.log(cells[i].innerHTML);
  num.push(number);
}
}
console.log(num);

/// FIRST CREATE TABLE, THEN ALLOCATE RANDOM NUMBERS TO CELLS.
createTable(3,4);
allocateCells(9);
// CREATE ROW AND COLUMN ARRAYS THEN USE THEM TO CHECK FOR MATCHES & HIGHLIGHT THEM
var rowN = [];
var allRowN = [];
// var colN = [];
// var allColN = [];

function createRowArrays() {
  //  var r;
  //  var c;
  for (var i =0;i<rows.length;i++) {
    rowN = [];
    var row = document.querySelector(rows[i]);
    var rowArray = row.getElementsByTagName('td');
    console.log(rowArray);
    for (var j=0; j<cols.length;j++) {
      rowN.push(row.querySelector(cols[j]).innerHTML);
    } allRowN.push(rowN);
}
}

createRowArrays();

console.log(allRowN);

// function checkMatches () {
//   for (var i = 0; i<)
// }

console.log(rows);
console.log(cols);
