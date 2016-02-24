
  var randomInc = function (min,max) {
    return Math.floor(Math.random()*(max - min +1) + min);
  };

// window.onload = function(){
//   var number = randomInc(1,9);
// document.getElementById('n').innerHTML = number;
// };



window.addEventListener("DOMContentLoaded", function(){
  var number = randomInc(1,9);
document.getElementById('n').innerHTML = number;
});
