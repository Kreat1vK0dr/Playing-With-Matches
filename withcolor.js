var randomInc = function (min,max) {
    return Math.floor(Math.random()*(max - min +1) + min);
  };

var numpush = [];
var numlist = [];
var blocks = [];

// how many divs/classes?
var createDivList = function(maxblocks) {
  for (i = 0; i<maxblocks;i++) {
    var addDiv = document.createElement('div');
    addDiv.classList.add('n');
    addDiv.classList.add('n'+(i+1));
    blocks.push('.n'+(i+1));
    var pDiv = document.getElementsByClassName('blocks');
    pDiv[0].appendChild(addDiv);
  }
};



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

var createNumList = function(maxrange) {
  for (i = 1; i<maxrange+1;i++) {
    numlist.push(i);
  }
  for (var i in blocks) {
    var number = randomInc(1,maxrange);
    var element = document.querySelector(blocks[i]);
    document.querySelector(blocks[i]).innerHTML = number;
    numpush.push(number);
  }
};

function createBlocks(maxrange, divcount) {
  createNumList(maxrange);
  createDivList(divcount);
  allocate(divcount);
}

console.log('Divs : ['+blocks+']');

var blocks = ['.n1', '.n2', '.n3'];

// randomly allocate numbers WITHOUT CONSIDERING ROWS AND COLUMNS
function allocate(max) {
  for (var i in blocks) {
    var number = randomInc(1,max);
    var element = document.querySelector(blocks[i]);
    document.querySelector(blocks[i]).innerHTML = number;
    numpush.push(number);
  }
}



// console.log('Numlist : ['+numlist+']');
// console.log('Numpush : [' +numpush+']');


  var binarycheck = [];
  var idx =[];
  var check = [];

// FUNCTION TO HIGHLIGHT SAME WITHOUT CONSIDERING ROWS AND COLUMNS
function hlSame() {
    for (i=0;i<numlist.length;i++) {
      check = [];
      idx = numpush.indexOf(numlist[i]);
      if (idx===-1) {
          binarycheck.push(0);
          } else {

          // check.push(numlist[i]);
            while (idx!==-1) {
                check.push(idx);
                idx = numpush.indexOf(numlist[i], idx+1);
           } console.log(check);
            if (check.length>1) {
              var color = randomColour();
              binarycheck.push(check.length);
           for (j=0; j<check.length;j++) {
               var element = document.querySelector(blocks[check[j]]);
               element.classList.add('hl');
               element.style.backgroundColor = color;
            //  console.log(blocks[check[j]]);
//                console.log(element);
           }
         } else {
           binarycheck.push(0);
         }
       }
     }
     var repeats = 0;
     var text = ""
     for (var k=0;k<binarycheck.length;k++) {
       if (binarycheck[k]!=0) {
         repeats += 1;
         if (binarycheck[k]===1) {
           text += "Number "+numlist[k]+" is repeated once. ";
         } else if (binarycheck[k]===2) {
          text += "Number "+numlist[k]+" is repeated twice. ";
       } else if (binarycheck[k]>2){
         text += "Number "+numlist[k]+" is repeated "+binarycheck[k]+" times. ";
       }

       }
       if(repeats===1) {
         document.querySelector('.message').innerHTML = repeats+" number has been repeated. "+text;

       } else if (repeats>1) {
         document.querySelector('.message').innerHTML = repeats+" numbers have been repeated. "+text;
       } else {
         document.querySelector('.message').innerHTML = "No numbers have been repeated.";
       }
     }
   }


// createBlocks(10,6); PAGE WORKED WORKED WHEN THIS FUNCTION WAS EITHER OUTSIDE OR WITHIN THE FUNCTION BELOW.

window.addEventListener("DOMContentLoaded", function(){

// NO TABLE

createBlocks(10,48);
    hlSame();
    console.log(binarycheck);

});




// if (num1===num2 || num2===num3 || num1===num3) {
//
// }
