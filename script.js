// CREATE RANDOM NUMBER
var randomInc = function (min,max) {
    return Math.floor(Math.random()*(max - min +1) + min);
  };

var numpush = [];
var numlist = [];
var blocks = [];

//CREATE AN ARRAY CONTAINING THE SPECIFIED RANGE OF NUMBERS (I.E. NUMLIST = [1,2,3,...,MAXRANGE])
var createNumList = function(maxrange) {
  numlist = [];
  for (i = 1; i<maxrange+1;i++) {
    numlist.push(i);
  }
  // for (var i in blocks) {
  //   var number = randomInc(1,maxrange);
  //   var element = document.querySelector(blocks[i]);
  //   document.querySelector(blocks[i]).innerHTML = number;
  //   numpush.push(number);
  // }
};

// createNumList(9);

//CREATE RANDOM COLOUR.
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


//CREATE SPECIFIED NUMBER OF DIVS THAT WILL CONTAIN THE NUMBERS. WE WILL SORT THROUGH THESE DIVS LATER TO FIND MATCHES.
//EACH DIV IS GIVEN A CLASS '.n1', '.n2', '.n3', and so on. THESE CLASSES ARE THEN PUSHED TO AN ARRAY CALLED 'blocks'.
var createDivList = function(maxblocks) {
  blocks = [];
  for (i = 0; i<maxblocks;i++) {
    var addDiv = document.createElement('div');
    addDiv.classList.add('n');
    addDiv.classList.add('n'+(i+1));
    blocks.push('.n'+(i+1));
    var pDiv = document.getElementsByClassName('blocks');
    pDiv[0].appendChild(addDiv);
  }
};

// createDivList(48);

//CREATE DIVS AND NUMLIST IN ONE FUNCTION.
// function createBlocks(maxrange, divcount) {
//   createNumList(maxrange);
//   createDivList(divcount);
// }

//RANDOMLY ALLOCATE A NUMBER WITHIN A SPECIFIED RANGE TO EACH DIV.
function allocate(max) {
  numpush = [];
  for (var i in blocks) {
    var number = randomInc(1,max);
    var element = document.querySelector(blocks[i]);
    document.querySelector(blocks[i]).innerHTML = number;
    numpush.push(number);
  }
}

// allocate(9);


  var binarycheck = [];
  var idx =[];
  var check = [];

//HIGHLIGHT MATCHING NUMBERS.
function hlSame() {
  binarycheck = [];
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
              console.log(binarycheck);
           for (j=0; j<check.length;j++) {
               var element = document.querySelector(blocks[check[j]]);
               element.classList.add('hl');
               element.style.backgroundColor = color;
               element.style.color = 'black';
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

hlSame();

var divs = 9;
var range = 9;
// createBlocks(10,6); PAGE WORKED WORKED WHEN THIS FUNCTION WAS EITHER OUTSIDE OR WITHIN THE FUNCTION BELOW.

window.addEventListener("DOMContentLoaded", function(){
createNumList(range);
createDivList(divs);
allocate(range);
hlSame();
});
//
document.getElementById('b1').addEventListener('click', function() {
  document.getElementsByClassName('blocks')[0].innerHTML = "";
  document.getElementsByClassName('message')[0].innerHTML = "";
  createNumList(range);
  createDivList(divs);
  allocate(range);
  hlSame();
});

document.getElementById('b2').addEventListener("click", function() {
  document.getElementsByClassName('blocks')[0].innerHTML = "";
  document.getElementsByClassName('message')[0].innerHTML = "";
  divs = document.getElementById('divs').value;
  createNumList(range);
  createDivList(divs);
  allocate(range);
  hlSame();
})
document.getElementById('b3').addEventListener("click", function() {
  document.getElementsByClassName('blocks')[0].innerHTML = "";
  document.getElementsByClassName('message')[0].innerHTML = "";
  range = document.getElementById('range').value;
  createNumList(range);
  createDivList(divs);
  allocate(range);
  hlSame();
})


// if (num1===num2 || num2===num3 || num1===num3) {
//
// }
