/*
1) remove all non-alphanumeric characters (punctuation, spaces, and sumbols)
2) turn everything into lower case
3) split a string via delimiter and turn into array
4) iterate through array, checking if each string is equal to itself reversed
5) voila! done
*/
function palindrome(str) {
  str = str.replace(/[_\W]/g, '');
  str = str.toLowerCase();
  var reverseStr = str.split('').reverse('').join('');
  //return reverseStr;//
  if (str == reverseStr) {
     return true;
  }
  else {
    return false;
  }
}

palindrome("_eye");