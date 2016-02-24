var randomInc = function (min,max) {
    return Math.floor(Math.random()*(max - min +1) + min);
  };

var numpush = [];
var numlist = [];
var blocks = [];
//how many divs/classes?
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

var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';

// Create the inner div before appending to the body
var innerDiv = document.createElement('div');
innerDiv.className = 'block-2';

// The variable iDiv is still good... Just append to it.
iDiv.appendChild(innerDiv);

// Then append the whole thing onto the body
document.getElementsByTagName('body')[0].appendChild(iDiv);
//how many numbers?
var createNumList = function(max) {
  for (i = 1; i<max+1;i++) {
    numlist.push(i);
  }
};

function createBlocks(range, divcount) {
  createNumList(range);
  createDivList(divcount);
}

createBlocks(10,6);



// console.log('Divs : ['+blocks+']');

// var blocks = ['.n1', '.n2', '.n3'];

//randomly allocate numbers
function allocate() {
  for (var i in blocks) {
    var number = randomInc(1,9);
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
              binarycheck.push(check.length);
           for (j=0; j<check.length;j++) {
               var element = document.querySelector(blocks[check[j]]);
               element.classList.add('hl');
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





window.addEventListener("DOMContentLoaded", function(){
  allocate();
    hlSame();
    console.log(binarycheck);
});




// if (num1===num2 || num2===num3 || num1===num3) {
//
// }

var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';

// Create the inner div before appending to the body
var innerDiv = document.createElement('div');
innerDiv.className = 'block-2';

// The variable iDiv is still good... Just append to it.
iDiv.appendChild(innerDiv);

// Then append the whole thing onto the body
document.getElementsByTagName('body')[0].appendChild(iDiv);
//how many numbers?
