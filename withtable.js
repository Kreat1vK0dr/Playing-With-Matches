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
    // addRow.classList.add('clearfix');
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
      addCol.classList.add('clearfix');
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


// hlRowSame();

function createRowMap() {
  rowMap = [];
  for (var i = 0; i < allRowN.length; i++) {
    var m = {};
    for (var w = 0; w < allRowN[i].length; w++) {
      var x = 1;
      if (m[allRowN[i][w]] === undefined) {
        m[allRowN[i][w]] = 1;
        for (var y = w + 1; y < allRowN[i].length; y++) {
          if (m[allRowN[i][y]] === m[allRowN[i][w]]) {
            x += 1;
            m[allRowN[i][w]] = x;
          }
        }
      }
    }
    rowMap.push(m);
  }
}

var colMap = [];

function createColMap(x) {
  colMap = [];
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

function hlColMatches() {
  var text = "";
  var colrepeats = [];
  var repeats = [];
  for (var i = 0; i < colMap.length; i++) {
    for (var j in colMap[i]) {
      if (colMap[i][j] > 1) {
        if (colrepeats.indexOf(i) === -1) {
          colrepeats.push(i);
        }

        var colour = randomColour();
        for (var k = 0; k < allRowN.length; k++) {
          var element = document.querySelector(rows[k]);
          var cell = element.querySelector(cols[i]);
          if (cell.innerHTML === j) {
            cell.style.backgroundColor = colour;
            cell.style.color = 'white';
          }
        }
        text = text + j + " is matched " + (colMap[i][j] - 1) + " time(s) in column " + (i + 1) + ". ";
        if (repeats.indexOf(j) === -1) {
          repeats.push(j);
        }
      }
    }
  }
  document.querySelector('.messageTable').innerHTML = repeats.length + " number(s) have been matched in " + colrepeats.length + " column(s). " + text;
}


var diagDownMap = [];

function createDiagonalMapDown() {
  diagDownMap = [];
  var rowinc = 0;
  var colinc = 1;
  var m = {};
  var loc = [];
  var length;
  if (allRowN.length > allRowN[0].length) {
    length = allRowN[0].length;
  } else if (allRowN.length < allRowN[0].length) {
    length = allRowN.length;
  } else {
    length = allRowN.length;
  }
  //FOR CHECKING DIAGONALS TO THE LEFT.
  while (rowinc < allRowN.length) {

    m = {};
    for (var i = 0; i < length; i++) {

      loc = [];
      x = 1;
      if (allRowN[i + rowinc] !== undefined) {
        if (m[allRowN[i + rowinc][i]] === undefined) {
          m[allRowN[i + rowinc][i]] = 1;
          loc.push([rows[i + rowinc], cols[i]]);
          for (var j = i + 1; j < length; j++) {
            if (allRowN[j + rowinc] !== undefined) {
              if (m[allRowN[j + rowinc][j]] === m[allRowN[i + rowinc][i]]) {
                x++;
                m[allRowN[i + rowinc][i]] = x;
                loc.push([rows[j + rowinc], cols[j]]);
              }
            }
          }
        }
        if (loc.length > 1) {
          var numfound = false;
          var found = [];
          if (diagDownMap.length === 0) {
            diagDownMap.push([allRowN[i + rowinc][i], loc]);
          } else {
            for (var x = 0; x < diagDownMap.length; x++) {
              if (diagDownMap[x][0] === allRowN[i + rowinc][i]) {
                diagDownMap[x].push(loc);
                numfound = true;
                found.push(1);
                break;
              } else {
                found.push(0);
              }
            }
            if (found.indexOf(1) === -1) {
              diagDownMap.push([allRowN[i + rowinc][i], loc])
            }
          }
        }
      }
    }
    rowinc++;

  }
  // FOR DIAGONALS TO THE RIGHT
  while (colinc < allRowN[0].length) {

    m = {};
    for (var i = 0; i < length; i++) {

      loc = [];
      x = 1;
      if (allRowN[i][i + colinc] !== undefined) {
        if (m[allRowN[i][i + colinc]] === undefined) {
          m[allRowN[i][i + colinc]] = 1;
          loc.push([rows[i], cols[i + colinc]]);
          for (var j = i + 1; j < length; j++) {
            if (allRowN[0][j + colinc] !== undefined) {
              if (m[allRowN[j][j + colinc]] === m[allRowN[i][i + colinc]]) {
                x++;
                m[allRowN[i][i + colinc]] = x;
                loc.push([rows[j], cols[j + colinc]]);
              }
            }
          }
        }
        if (loc.length > 1) {
          var numfound = false;
          var found = [];
          if (diagDownMap.length === 0) {
            diagDownMap.push([allRowN[i][i + colinc], loc]);
          } else {
            for (var x = 0; x < diagDownMap.length; x++) {
              if (diagDownMap[x][0] === allRowN[i][i + colinc]) {
                diagDownMap[x].push(loc);
                numfound = true;
                found.push(1);
                break;
              } else {
                found.push(0);
              }
            }
            if (found.indexOf(1) === -1) {
              diagDownMap.push([allRowN[i][i + colinc], loc]);
            }
          }
        }

      }
    }
    colinc++;
  }
}

var diagUpMap = [];

function createDiagonalMapUp() {
  diagUpMap = [];
  var rowdec = allRowN.length - 1;

  var colinc = 1;
  var m = {};
  var loc = [];
  var length;
  if (allRowN.length > allRowN[0].length) {
    length = allRowN[0].length;
  } else if (allRowN.length < allRowN[0].length) {
    length = allRowN.length;
  } else {
    length = allRowN.length;
  }
  //FOR CHECKING DIAGONALS TO THE LEFT.
  rowdec = allRowN.length - 1;

  for (var i = 0; i < length; i++) {
    m = {};
    for (k = 0; k < length; k++) {

      loc = [];
      x = 1;
      if (allRowN[rowdec - i - k] !== undefined) {
        if (m[allRowN[rowdec - i - k][k]] === undefined) {
          m[allRowN[rowdec - i - k][k]] = 1;
          loc.push([rows[rowdec - i - k], cols[k]]);
          for (var j = k + 1; j < length; j++) {
            if (allRowN[rowdec - i - j] !== undefined) {
              if (m[allRowN[rowdec - i - j][j]] === m[allRowN[rowdec - i - k][k]]) {
                x++;
                m[allRowN[rowdec - i - k][k]] = x;
                loc.push([rows[rowdec - i - j], cols[j]]);
              }
            }
          }
        }
      }

      if (loc.length > 1) {
        var numfound = false;
        var found = [];
        if (diagUpMap.length === 0) {
          diagUpMap.push([allRowN[rowdec - i - k][k], loc]);
        } else {
          for (var y = 0; y < diagUpMap.length; y++) {
            if (diagUpMap[y][0] === allRowN[rowdec - i - k][k]) {
              diagUpMap[y].push(loc);
              numfound = true;
              found.push(1);
              break;
            } else {
              found.push(0)
            }
          }
          if (found.indexOf(1) === -1) {
            diagUpMap.push([allRowN[rowdec - i - k][k], loc]);
          }
        }
      }
    }
  }

  // FOR DIAGONALS TO THE RIGHT.

  for (var i = 0; i < length; i++) {
    rowdec = allRowN.length - 1;
    m = {};
    for (k = 0; k < length; k++) {
      loc = [];
      x = 1;
      if (allRowN[rowdec - k][k + i + 1] !== undefined) {
        if (m[allRowN[rowdec - k][k + i + 1]] === undefined) {
          m[allRowN[rowdec - k][k + i + 1]] = 1;
          loc.push([rows[rowdec - k], cols[k + i + 1]]);
          for (var j = k + 1; j < length; j++) {
            if (allRowN[rowdec - j][i + j + 1] !== undefined) {
              if (m[allRowN[rowdec - j][i + j + 1]] === m[allRowN[rowdec - k][i + k + 1]]) {
                x++;
                m[allRowN[rowdec - k][k + i + 1]] = x;
                loc.push([rows[rowdec - j], cols[i + j + 1]]);
              }
            }
          }
        }
      }

      if (loc.length > 1) {
        var numfound = false;
        var found = [];
        if (diagUpMap.length === 0) {
          diagUpMap.push([allRowN[rowdec - i - k][k + i + 1], loc]);
        } else {
          for (var y = 0; y < diagUpMap.length; y++) {
            if (diagUpMap[y][0] === allRowN[rowdec - k][i + k + 1]) {
              diagUpMap[y].push(loc);
              numfound = true;
              found.push(1);
              break;
            } else {
              found.push(0)
            }
          }
          if (found.indexOf(1) === -1) {
            diagUpMap.push([allRowN[rowdec - i - k][k + i + 1], loc]);
          }
        }
      }
    }
  }
}



function hlDiagonalDownMatches() {
  var text = "";
  for (var i = 0; i < diagDownMap.length; i++) {

    for (var j = 1; j < diagDownMap[i].length; j++) {
      var color = randomColour();
      for (var k = 0; k < diagDownMap[i][j].length; k++) {
        var element = document.querySelector(diagDownMap[i][j][k][0]);
        var cell = element.querySelector(diagDownMap[i][j][k][1]);
        cell.style.backgroundColor = color;
        cell.style.color = 'white';
      }

    }
    text = text + diagDownMap[i][0] + " is matched in " + (diagDownMap[i].length - 1) + " diagonal(s). ";
  }
  document.querySelector('.messageTable').innerHTML = diagDownMap.length + " number(s) have matches in one or more diagonals. " + text;

}

function hlDiagonalUpMatches() {
  var text = "";
  for (var i = 0; i < diagUpMap.length; i++) {

    for (var j = 1; j < diagUpMap[i].length; j++) {
      var color = randomColour();
      for (var k = 0; k < diagUpMap[i][j].length; k++) {
        var element = document.querySelector(diagUpMap[i][j][k][0]);
        var cell = element.querySelector(diagUpMap[i][j][k][1]);
        cell.style.backgroundColor = color;
        cell.style.color = 'white';
      }
    }
    text = text + diagUpMap[i][0] + " is matched in " + (diagUpMap[i].length - 1) + " diagonal(s). ";
  }
  document.querySelector('.messageTable').innerHTML = diagUpMap.length + " number(s) have matches in one or more diagonal(s). " + text;
}

function hlRowMatches() {
  var text = "";
  var rowrepeats = [];
  var repeats = [];
  for (var i = 0; i < rowMap.length; i++) {
    for (var j in rowMap[i]) {
      var colour = randomColour();
      if (rowMap[i][j] > 1) {
        for (var k = 0; k < allRowN[0].length; k++) {
          var element = document.querySelector(rows[i]);
          var cell = element.querySelector(cols[k]);
          if (cell.innerHTML === j) {
            cell.style.backgroundColor = colour;
            cell.style.color = 'white';
          }
        }
        rowrepeats.push(1);
        text = text + j + " is matched " + (rowMap[i][j] - 1) + " time(s) in row " + (i + 1) + ". ";
        if (repeats.indexOf(j) === -1) {
          repeats.push(j);
        }
      }
    }
  }
  if (repeats.length > 1) {
    document.querySelector('.messageTable').innerHTML = repeats.length + " numbers are matched in " + rowrepeats.length + " row(s). " + text;
  } else if (repeats.length === 1) {
    document.querySelector('.messageTable').innerHTML = repeats.length + " number is matched in " + rowrepeats.length + " row(s). " + text;

  } else {
    document.querySelector('.messageTable').innerHTML = "No matches found!";
  }
}




//FIND MATCH IN CELLS:
function createCellMap() {
  var m = {};
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

function hlCellMatches() {
  var table = document.getElementsByTagName('table')[0];
  var cell = table.getElementsByTagName('td');
  var repeats = [];
  var text = "";
  for (var j in cellMap) {
    var colour = randomColour();
    if (cellMap[j] > 1) {
      for (var i = 0; i < cellN.length; i++) {
        if (cell[i].innerHTML === j) {
          cell[i].style.backgroundColor = colour;
          cell[i].style.color = 'white';
        }
      }
      text = text + j + " is matched " + (cellMap[j] - 1) + " time(s). "
      repeats.push(1);
    }
  }
  if (repeats.length > 1) {
    document.querySelector('.messageTable').innerHTML = repeats.length + " numbers are matched! " + text;
  } else if (repeats.length === 1) {
    document.querySelector('.messageTable').innerHTML = repeats.length + " number is matched! " + text;

  } else {
    document.querySelector('.messageTable').innerHTML = "No matches found!";
  }
}

function makeCircles() {
  var cells = document.getElementsByTagName('table')[0].getElementsByTagName('td');
  for (var i = 0; i<cells.length;i++) {
    cells[i].style.borderRadius = '100%';
  }
}

function makeSquares() {
  var cells = document.getElementsByTagName('table')[0].getElementsByTagName('td');
  for (var i = 0; i<cells.length;i++) {
    cells[i].style.borderRadius = '0%';
  }
}

function hlRemove(colour) {
  var table = document.getElementsByTagName('table')[0];
  var cell = table.getElementsByTagName('td');
  for (var i = 0; i < cell.length; i++) {
    cell[i].style.backgroundColor = colour;
    cell[i].style.color = 'black';
  }
}

function displayMessage() {
  document.getElementsByClassName('messageTable')[0].innerHTML = "";
  var messageDiv = document.getElementsByClassName('messageTable')[0];
  for (var i = 1; i < 4; i++) {
    var addP = document.createElement('p');
    addP.classList.add("mPara");
    addP.id = 'm' + i;
    messageDiv.appendChild(addP);
  }
  document.getElementById('m1').innerHTML = "Click any of the buttons above to check for matches!";
  document.getElementById('m2').innerHTML = "Create your own custom table by entering the number of columns and rows you want.";
  document.getElementById('m3').innerHTML = "You can even select your own range!";
}

var rowsInput = 3;
var colsInput = 3;
var rangeInput = 9;

window.addEventListener("DOMContentLoaded", function() {
  displayMessage();
  createNumList(rangeInput);
  createTable(rowsInput, colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  // hlRowSame();
  createDiagonalMapDown();
  createDiagonalMapUp();
  createRowMap();
  createCellMap();
  createColMap(0);
  hlRemove('#E84644');
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


    rowsInput = document.getElementById('rows').value;
    colsInput = document.getElementById('cols').value;

    displayMessage();
    createNumList(rangeInput);
    createTable(rowsInput, colsInput);
    allocateCells(rangeInput);
    createRowArrays();
    createDiagonalMapDown();
    createDiagonalMapUp();
    createRowMap();
    createCellMap();
    createColMap(0);
    // hlRowSame();
  }
});

document.querySelector('#b1').addEventListener('click', function() {
  document.getElementsByTagName('table')[0].innerHTML = "";

  displayMessage();
  createNumList(rangeInput);
  createTable(rowsInput, colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  createDiagonalMapDown();
  createDiagonalMapUp();
  createRowMap();
  createCellMap();
  createColMap(0);
  // hlRowSame();
});

document.getElementById('b3').addEventListener("click", function() {
  document.getElementsByTagName('table')[0].innerHTML = "";
  displayMessage();
  rangeInput = document.getElementById('range').value;
  createNumList(rangeInput);
  createTable(rowsInput, colsInput);
  allocateCells(rangeInput);
  createRowArrays();
  createDiagonalMapDown();
  createDiagonalMapUp();
  createRowMap();
  createCellMap();
  createColMap(0);
  // hlRowSame();
});

document.getElementById('rowmatch').addEventListener('click', function() {
  hlRemove('#E84644');
  hlRowMatches();
});
document.getElementById('colmatch').addEventListener('click', function() {
  hlRemove('#E84644');
  hlColMatches();
});
document.getElementById('diagonalDown').addEventListener('click', function() {
  hlRemove('#E84644');
  hlDiagonalDownMatches();
});
document.getElementById('diagonalUp').addEventListener('click', function() {
  hlRemove('#E84644');
  hlDiagonalUpMatches();
});
document.getElementById('anymatch').addEventListener('click', function() {
  hlRemove('#E84644');
  hlCellMatches();
});
document.getElementById('hlRemove').addEventListener('click', function() {
  displayMessage();
  hlRemove('#E84644');
});


document.getElementById('circle').addEventListener('click', function() {
makeCircles();
});
document.getElementById('squares').addEventListener('click', function() {
  makeSquares();
});


document.getElementById('slide').addEventListener('mousemove', function() {
  var change = document.getElementById('slide').value;
  var cells = document.getElementsByTagName('table')[0].getElementsByTagName('td');
  for (var i = 0; i<cells.length;i++) {
    cells[i].style.borderRadius = change+'%';
    console.log(cells[i].style.borderRadius);
}
  console.log(change);
}, false);

document.getElementById('slide').addEventListener('change', function() {
  var change = document.getElementById('slide').value;
  var cells = document.getElementsByTagName('table')[0].getElementsByTagName('td');
  for (var i = 0; i<cells.length;i++) {
    cells[i].style.borderRadius = change+'%';
    console.log(cells[i].style.borderRadius);
}
  console.log(change);
}, false);
