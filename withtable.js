var randomInc = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// CREATE NUMLIST: AN ARRAY CONTAINING ALL THE NUMBERS WITHIN THE SPECIFIED RANGE (E.G. NUMLIST = [1,2,3,..,MAXRANGE])
var numlist = [];

var createNumList = function(maxrange) {
  numlist = [];
  for (i = 1; i<maxrange+1;i++) {
    numlist.push(i);
  }
};

// createNumList(9);

console.log(numlist);

//CREATE A RANDOM COLOUR FUNCTION SO THAT WE CAN ASSIGN DIFFERENT (RANDOM) COLOURS TO DIFFERENT MATCHING NUMBERS.
var color = [];
var letterdigits = ['a','b','c','d','e','f'];
var randomHex = function() {
  var x = Math.floor(Math.random()*(16));
  if (x<10) {
    return x;
  } else {
    switch (x) {
      case 10: return 'a';
      case 11: return 'b';
      case 12: return 'c';
      case 13: return 'd';
      case 14: return 'e';
      case 15: return 'f';
      default: return '';
    }
  }
 };

// console.log(randomHex());

var randomColour = function(){
    return '#'+ randomHex()+''+randomHex()+''+randomHex()+''+randomHex()+''+randomHex()+''+randomHex();
};

//CREATE A TABLE DYNAMICALLY WITH SPECIFIED ROWS AND COLUMNS

var rows = [];
var cols = [];

var createRows = function(x) {
  rows = [];
  for (var i = 1; i <= x; i++) {
    var addRow = document.createElement('tr');
    var table = document.getElementsByTagName('table')[0];
    addRow.classList.add('r');
    addRow.classList.add('row' + i);
    table.appendChild(addRow);
    rows.push('.row' + i);
  }
};

var createColumns = function(y) {
  cols = [];
  for (var i = 0; i < rows.length; i++) {
    for (var j = 1; j <= y; j++) {
      var addCol = document.createElement('td');
      var row = document.querySelector(rows[i]);
      addCol.classList.add('col' + j);
      row.appendChild(addCol);
      if (i === 0) {
        cols.push('.col' + j);
      }
    }
  }
};

function createTable(rows, cols) {
  createRows(rows);
  createColumns(cols);
}

// createTable(4,6);
console.log(rows);
console.log(cols);

//ALLOCATE A RANDOM NUMBER WITHIN THE SPECIFIED RANGE TO EACH CELL WITHIN THE TABLE.

var num = [];

function allocateCells(max) {
  num = [];
  var table = document.getElementsByTagName("table")[0];
  var cells = table.getElementsByTagName('td');
  console.log(cells);
  for (var i = 0; i < cells.length; i++) {
    var number = randomInc(1, max);
    cells[i].innerHTML = number;
    //   console.log(cells[i].innerHTML);
    num.push(number);
  }
}
console.log(num);

// allocateCells(9);

// CREATE AN ARRAY CONTAINING AN ARRAY FOR EACH ROW.

var allRowN = [];

function createRowArrays() {
  allRowN =[];
  for (var i = 0; i < rows.length; i++) {
    var rowN = [];
    var row = document.querySelector(rows[i]);
    var rowArray = row.getElementsByTagName('td');
    console.log(rowArray);
    for (var j = 0; j < cols.length; j++) {
      rowN.push(parseInt(row.querySelector(cols[j]).innerHTML));
      console.log(rowN);
    }
    allRowN.push(rowN);
  }
}

// createRowArrays();
console.log(allRowN);
// function checkMatches () {
//   for (var i = 0; i<)
// }

var binarycheck = [];
var idx = [];
var check = [];
var groupMap = [];
var groupBinarycheck = [];

//FUNCTION TO HIGHLIGHT SAME WITHOUT CONSIDERING ROWS AND COLUMNS
function hlRowSame() {
  groupBinarycheck = [];tom

  for (var i = 0; i < allRowN.length; i++) {
      var m = {};
      binarycheck = [];

      for (var w = 0; w<allRowN[i].length;w++) {
        var x = 1;
        if (m[allRowN[i][w]]===undefined) {
          m[allRowN[i][w]] = 1;
        for (var y=w+1;y<allRowN[i].length;y++) {

        console.log(m);
        if (m[allRowN[i][y]]===m[allRowN[i][w]]) {
          x += 1;
          m[allRowN[i][w]] = x;
          console.log(m);
        }
      }
    }
      console.log(m);
    }  groupMap.push(m);
    console.log(groupMap);
    for (var j = 0; j < numlist.length; j++) {

        check = [];
        idx = allRowN[i].indexOf(numlist[j]);
        if (idx === -1) {
          binarycheck.push(0);
        } else {
          // check.push(numlist[i]);
          while (idx !== -1) {
            check.push(idx);
            console.log(check);
            idx = allRowN[i].indexOf(numlist[j], idx + 1);
          }
          if (check.length > 1) {
            var color = randomColour();
            binarycheck.push(check.length);
            console.log(binarycheck);
            for (l = 0; l < check.length; l++) {
              var element = document.querySelector(rows[i]).querySelector(cols[check[l]]);
              element.classList.add('hl');
              element.style.backgroundColor = color;
              element.style.color = 'black';

              //  console.log(blocks[check[j]]);
              //                console.log(element);
            }
          } else {
            binarycheck.push(0);
            console.log(binarycheck);
          }
        }
      } groupBinarycheck.push(binarycheck);
      console.log(groupBinarycheck);
    }
  var text = "";
  var repeats = 0;
  for (var m = 0; m < groupBinarycheck.length; m++) {
    for (var n = 0; n < groupBinarycheck[m].length; n++) {
      if (groupBinarycheck[m][n] != 0) {
        repeats += 1;
      }
      if (groupBinarycheck[m][n] === 1) {
        text += "Number " + numlist[n] + " is repeated once in Row " + (m+1) + ". ";
      } else if (groupBinarycheck[m][n] === 2) {
        text += "Number " + numlist[n] + " is repeated twice in Row " + (m+1) + ". ";
      } else if (groupBinarycheck[m][n] > 2) {
        text += "Number " + numlist[n] + " is repeated " + groupBinarycheck[m][n] + " times in Row "+(m+1)+". ";
      }
    if (repeats === 1) {
      document.querySelector('.message').innerHTML = repeats + " number has been repeated. " + text;

    } else if (repeats > 1) {
      document.querySelector('.message').innerHTML = repeats + " numbers have been repeated. " + text;
    } else {
      document.querySelector('.message').innerHTML = "No numbers have been repeated.";
    }
  }
} text = "";
repeats =0;
}
// hlRowSame();

var rowsInput = 3;
var colsInput = 3;
var rangeInput = 9;

window.addEventListener("DOMContentLoaded", function() {
  createNumList(rangeInput);
  createTable(rowsInput,colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  hlRowSame();
});



document.getElementById('b2').addEventListener("click", function() {
  document.getElementsByTagName('table')[0].innerHTML = "";
  document.getElementsByClassName('message')[0].innerHTML = "";
  rowsInput = document.getElementById('rows').value;
  colsInput = document.getElementById('cols').value;
  console.log(rowsInput, colsInput);

  createNumList(rangeInput);
  createTable(rowsInput,colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  hlRowSame();
})

document.querySelector('#b1').addEventListener('click', function() {
  document.getElementsByTagName('table')[0].innerHTML = "";
  document.getElementsByClassName('message')[0].innerHTML = "";
  createNumList(rangeInput);
  createTable(rowsInput,colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  hlRowSame();
});

document.getElementById('b3').addEventListener("click", function() {
  document.getElementsByTagName('table')[0].innerHTML = "";
  document.getElementsByClassName('message')[0].innerHTML = "";
  rangeInput = document.getElementById('range').value;
  createNumList(rangeInput);
  createTable(rowsInput,colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  hlRowSame();
})

console.log(allRowN);
var match = [];
for (var i = 0; i<allRowN.length;i++) {
  for (var j = 0; j<allRowN[i].length;j++) {
    for (var instance in groupMap[i]) {
      if (groupMap[i][instance]>1) {
        match.push()
      }
    }
  }
}
console.log(match);
console.log(allRowN[0])

var colMap = [];

function createColMap(x) {
for (var i = 0; i<allRowN[x].length; i++) {
  var m = {};
  for (var j=0; j<allRowN.length; j++) {
    var x = 1;
    if (m[allRowN[j][i]]===undefined) {
      m[allRowN[j][i]] = 1;
      for (var k=j+1; k<allRowN.length;k++) {
        console.log(m);
        if (m[allRowN[k][i]]===m[allRowN[j][i]]) {
          x += 1;
          m[allRowN[j][i]] = x;
          console.log(m);
        }
      }
    }
  } colMap.push(m);
  x++;
}
}
createColMap(0);

console.log(colMap);
