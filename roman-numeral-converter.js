function convertToRoman(num) {
  
  // change num into array for easier data manipulation
  var arr = (''+num).split('');
  
  var key = {one:"I",five:"V",ten:"X",fifty:"L",hundred:"C",fiveHundred:"D",thousand:"M"};
  
  var output = [];
  
  function produceNumeral(indexVal, smallNum, mediumNum, bigNum){
    // parameter indexVal is the value of the index
    // smallNum, mediumNum, and bigNum are taken from
    // the key.  ex: key.one is "I", key.ten is "X", etc.
    var val = Number(indexVal);
    if (val < 4) {
      output.push(smallNum.repeat(val));
    } // ex: num is 3, make III
    else if (val == 4) {
      output.push(smallNum + mediumNum);
    } // ex: make IV
    else if (val == 5) {
      output.push(mediumNum);
    }  // ex: make V
    else if (val < 9) {
      output.push(mediumNum + smallNum.repeat(val - 5));
    } // ex: make VIII
    else {
      output.push(smallNum + bigNum);
    } // ex: make IX
  } // close produceNumeral
  
  if (arr.length === 4) {
    // change thousands
    output.push("M".repeat(arr[0]));
    // change hundreds
    produceNumeral(arr[1], key.hundred, key.fiveHundred, key.thousand);
    // changes tens
    produceNumeral(arr[2], key.ten, key.fifty, key.hundred);
    // changes ones
    produceNumeral(arr[3], key.one, key.five, key.ten);
    console.log(output.join(''));
  } // close 4 digit numbers
  else if (arr.length === 3) {
    // change hundreds
    produceNumeral(arr[0], key.hundred, key.fiveHundred, key.thousand);
    // changes tens
    produceNumeral(arr[1], key.ten, key.fifty, key.hundred);
    // changes ones
    produceNumeral(arr[2], key.one, key.five, key.ten);
    console.log(output.join(''));
  } // close 3 digit numbers
  else if (arr.length === 2) {
    // changes tens
    produceNumeral(arr[0], key.ten, key.fifty, key.hundred);
    // changes ones
    produceNumeral(arr[1], key.one, key.five, key.ten);
    console.log(output.join(''));
  } // close 2 digit numbers
  else if (arr.length === 1) {
    // changes ones
    produceNumeral(arr[0], key.one, key.five, key.ten);
    console.log(output.join(''));
  } // close 1 digit numbers
  else {
    console.log('Number is too big.');
  } // catches numbers more than four digits

  return output.join('');
  
} // close convertToRoman

convertToRoman(36);