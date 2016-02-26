var randomInc = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// CREATE NUMLIST: AN ARRAY CONTAINING ALL THE NUMBERS WITHIN THE SPECIFIED RANGE (E.G. NUMLIST = [1,2,3,..,MAXRANGE])
var numlist = [];

var createNumList = function(maxrange) {
  numlist = [];
  for (i = 1; i < maxrange + 1; i++) {
    numlist.push(i);
  }
};

// createNumList(9);

console.log(numlist);

//CREATE A RANDOM COLOUR FUNCTION SO THAT WE CAN ASSIGN DIFFERENT (RANDOM) COLOURS TO DIFFERENT MATCHING NUMBERS.
var color = [];
var letterdigits = ['a', 'b', 'c', 'd', 'e', 'f'];
var randomHex = function() {
  var x = Math.floor(Math.random() * (16));
  if (x < 10) {
    return x;
  } else {
    switch (x) {
      case 10:
        return 'a';
      case 11:
        return 'b';
      case 12:
        return 'c';
      case 13:
        return 'd';
      case 14:
        return 'e';
      case 15:
        return 'f';
      default:
        return '';
    }
  }
};

// console.log(randomHex());

var randomColour = function() {
  return '#' + randomHex() + '' + randomHex() + '' + randomHex() + '' + randomHex() + '' + randomHex() + '' + randomHex();
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
// console.log(rows);
// console.log(cols);

//ALLOCATE A RANDOM NUMBER WITHIN THE SPECIFIED RANGE TO EACH CELL WITHIN THE TABLE.

var cellN = [];

function allocateCells(max) {
  cellN = [];
  var table = document.getElementsByTagName("table")[0];
  var cells = table.getElementsByTagName('td');
  console.log(cells);
  for (var i = 0; i < cells.length; i++) {
    var number = randomInc(1, max);
    cells[i].innerHTML = number;
    //   console.log(cells[i].innerHTML);
    cellN.push(number);
  }
}


// allocateCells(9);

// CREATE AN ARRAY CONTAINING AN ARRAY FOR EACH ROW.

var allRowN = [];

function createRowArrays() {
  allRowN = [];
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
// console.log(allRowN);
// function checkMatches () {
//   for (var i = 0; i<)
// }

var binarycheck = [];
var idx = [];
var check = [];
var rowMap = [];
var cellMap = [];
var rowBinarycheck = [];

//FUNCTION TO HIGHLIGHT SAME WITHOUT CONSIDERING ROWS AND COLUMNS
function hlCellSame() {

}

function hlRowSame() {
  rowBinarycheck = [];
  for (var i = 0; i < allRowN.length; i++) {
    var m = {};
    binarycheck = [];

    for (var w = 0; w < allRowN[i].length; w++) {
      var x = 1;
      if (m[allRowN[i][w]] === undefined) {
        m[allRowN[i][w]] = 1;
        for (var y = w + 1; y < allRowN[i].length; y++) {

          console.log(m);
          if (m[allRowN[i][y]] === m[allRowN[i][w]]) {
            x += 1;
            m[allRowN[i][w]] = x;
            console.log(m);
          }
        }
      }
      console.log(m);
    }
    rowMap.push(m);
    console.log(rowMap);
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
            element.style.color = 'white';

            //  console.log(blocks[check[j]]);
            //                console.log(element);
          }
        } else {
          binarycheck.push(0);
          console.log(binarycheck);
        }
      }
    }
    rowBinarycheck.push(binarycheck);
    console.log(rowBinarycheck);
  }
  var text = "";
  var repeats = 0;
  for (var m = 0; m < rowBinarycheck.length; m++) {
    for (var n = 0; n < rowBinarycheck[m].length; n++) {
      if (rowBinarycheck[m][n] != 0) {
        repeats += 1;
      }
      if (rowBinarycheck[m][n] === 1) {
        text += "Number " + numlist[n] + " is repeated once in Row " + (m + 1) + ". ";
      } else if (rowBinarycheck[m][n] === 2) {
        text += "Number " + numlist[n] + " is repeated twice in Row " + (m + 1) + ". ";
      } else if (rowBinarycheck[m][n] > 2) {
        text += "Number " + numlist[n] + " is repeated " + rowBinarycheck[m][n] + " times in Row " + (m + 1) + ". ";
      }
      if (repeats === 1) {
        document.querySelector('.messageTable').innerHTML = repeats + " number has been repeated. " + text;

      } else if (repeats > 1) {
        document.querySelector('.messageTable').innerHTML = repeats + " numbers have been repeated. " + text;
      } else {
        document.querySelector('.messageTable').innerHTML = "No numbers have been repeated.";
      }
    }
  }
  text = "";
  repeats = 0;
}
// hlRowSame();

var colMap = [];

function createColMap(x) {
  for (var i = 0; i < allRowN[x].length; i++) {
    var m = {};
    for (var j = 0; j < allRowN.length; j++) {
      var y = 1;
      if (m[allRowN[j][i]] === undefined) {
        m[allRowN[j][i]] = 1;
        for (var k = j + 1; k < allRowN.length; k++) {
          console.log(m);
          if (m[allRowN[k][i]] === m[allRowN[j][i]]) {
            y += 1;
            m[allRowN[j][i]] = y;
            console.log(m);
          }
        }
      }
    }
    colMap.push(m);
    if (x < allRowN.length - 1) {
      x++;
    }
  }
}
//
var locMap = [];


function createDiagonalMap() {
  var rowinc = 0;
  var colinc = 1;
  var m = {};
  var loc = [];
  var length;
  if (allRowN.length > allRowN[0].length) {
    length = allRowN[0].length;
  } else if (allRowN.length < allRowN[0].length) {
    length = allRowN.length;
  }
  //FOR CHECKING DIAGONALS TO THE LEFT.
  while (rowinc < length) {

    m = {};
    for (var i = 0; i < length; i++) {

      loc = [];
      x = 1;
      if (allRowN[i+rowinc]!==undefined) {
      if (m[allRowN[i + rowinc][i]] === undefined) {
        m[allRowN[i + rowinc][i]] = 1;
        loc.push([rows[i + rowinc], cols[i]]);
        for (var j = i + 1; j < length; j++) {
          if (allRowN[j+rowinc]!==undefined) {
          if (m[allRowN[j + rowinc][j]] === m[allRowN[i + rowinc][i]]) {
            x++;
            m[allRowN[i + rowinc][i]] = x;
            loc.push([rows[j + rowinc], cols[j]]);
          }
        }
        }
      }
      }
      if (loc.length > 1) {
        if (locMap.length > 0) {
          for (var x = 0; x < locMap.length; x++) {
            if (locMap[x][0] === allRowN[i + rowinc][i]) {
              locMap[x].push(loc);
              break;
            } else {
              locMap.push([allRowN[i + rowinc][i], loc]);
              break;
            }
          }
        } else {
        locMap.push([allRowN[i + rowinc][i], loc]);
      }
      }
    } rowinc++;

  }
  while (colinc < length) {

    m = {};
    for (var i = 0; i < length; i++) {

      loc = [];
      x = 1;
      if(allRowN[i][i+colinc]!==undefined) {
      if (m[allRowN[i][i+colinc]] === undefined) {
        m[allRowN[i][i+colinc]] = 1;
        loc.push([rows[i], cols[i+colinc]]);
        for (var j = i + 1; j < length; j++) {
          if (allRowN[0][j+colinc]!==undefined) {
          if (m[allRowN[j][j+colinc]] === m[allRowN[i][i+colinc]]) {
            x++;
            m[allRowN[i][i+colinc]] = x;
            loc.push([rows[j], cols[j+colinc]]);
          }
        }
      }
        }
      }
      if (loc.length > 1) {
        if (locMap.length > 0) {
          for (var x = 0; x < locMap.length; x++) {
            if (locMap[x][0] === allRowN[i][i+colinc]) {
              locMap[x].push(loc);
              break;
            } else {
              locMap.push([allRowN[i][i+colinc], loc]);
              break;
            }
          }
        } else {
        locMap.push([allRowN[i][i+colinc], loc]);
      }
      }
    } colinc++;

  }
}

function hlDiagonalMatches() {
  for (var i = 0; i<locMap.length;i++) {

    for (var j=0; j<locMap[i].length;j++) {
      var color = randomColour();
      for (var k=0; k<locMap[i][j].length;k++) {
        var element = document.querySelector(locMap[i][j][k][0]);
        var cell = element.querySelector(locMap[i][j][k][1]);
        cell.style.backgroundColor = color;
      }
    }
  }
}
//FOR CHECKING DIAGONALS TO THE RIGHT.
//     m = {};
//     for (var k=0;k<allRowN[0].length; k++)
//     for (var l = 0; l < allRowN[0].length; l++) {
//     loc = [];
//     x = 1;
//     if (m[allRowN[l+1][l]] === undefined) {
//       m[allRowN[l+1][l]] = 1;
//       loc.push([rows[l+1], cols[l]]);
//       for (var m = l + 1; j < allRowN[0].length; j++) {
//         if (m[allRowN[m+1][m]] === m[allRowN[l+1][l]]) {
//           x++;
//           m[allRowN[l+1][l]] = x;
//           loc.push([rows[m+1], cols[m]]);
//         }
//       }
//     }
//     if (loc.length > 1) {
//       locMap[allRowN[l+1][l]] = loc;
//     }
//   }
// }
// }




// if (allRowN[0].length > allRowN.length) {
//
// }
// if (allRowN[0].length === allRowN.length) {}


//FIND MATCH IN CELLS:
function createCellMap() {
  var m = {};
  var table = document.getElementsByTagName('table')[0];
  var cell = table.getElementsByTagName('td');
  for (var i = 0; i < cellN.length; i++) {
    x = 1;
    if (m[cellN[i]] === undefined) {
      m[cellN[i]] = 1;
      for (var j = i + 1; j < cellN.length; j++) {
        if (m[cellN[j]] === m[cellN[i]]) {
          x++;
          m[cellN[i]] = x;
        }
      }
    }
  }
  cellMap = m;
}

var rowsInput = 3;
var colsInput = 6;
var rangeInput = 3;

window.addEventListener("DOMContentLoaded", function() {
  createNumList(rangeInput);
  createTable(rowsInput, colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  // hlRowSame();
  createColMap(0);
  console.log(colMap);
  console.log(cellN);
  createCellMap();
  createDiagonalMap();
  hlDiagonalMatches();
});



document.getElementById('b2').addEventListener("click", function() {
  if (document.getElementById('cols').value === "" && document.getElementById('rows').value === "") {
    alert("You have not entered any values!");
  } else if (document.getElementById('cols').value === "" || document.getElementById('rows').value === "") {
    if (document.getElementById('cols').value === "") {
      alert("Please enter a value for columns!");
    } else {
      alert("Please enter a value for rows!");
    }
  } else if (document.getElementById('cols').value !== "" && document.getElementById('cols').value !== "") {
    document.getElementsByTagName('table')[0].innerHTML = "";
    document.getElementsByClassName('messageTable')[0].innerHTML = "";
    rowsInput = document.getElementById('rows').value;
    colsInput = document.getElementById('cols').value;
    console.log(rowsInput, colsInput);

    createNumList(rangeInput);
    createTable(rowsInput, colsInput);
    allocateCells(rangeInput);
    createRowArrays();
    createDiagonalMap();
    hlDiagonalMatches();
    // hlRowSame();
  }
})

document.querySelector('#b1').addEventListener('click', function() {
  document.getElementsByTagName('table')[0].innerHTML = "";
  document.getElementsByClassName('messageTable')[0].innerHTML = "";
  createNumList(rangeInput);
  createTable(rowsInput, colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  createDiagonalMap();
  hlDiagonalMatches();
  // hlRowSame();
});

document.getElementById('b3').addEventListener("click", function() {
  document.getElementsByTagName('table')[0].innerHTML = "";
  document.getElementsByClassName('messageTable')[0].innerHTML = "";
  rangeInput = document.getElementById('range').value;
  createNumList(rangeInput);
  createTable(rowsInput, colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  createDiagonalMap();
  hlDiagonalMatches();
  // hlRowSame();
})

// console.log(allRowN);
var match = [];
for (var i = 0; i < allRowN.length; i++) {
  for (var j = 0; j < allRowN[i].length; j++) {
    for (var instance in rowMap[i]) {
      if (rowMap[i][instance] > 1) {
        match.push()
      }
    }
  }
}



// console.log(allRowN[0])
