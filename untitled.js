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
