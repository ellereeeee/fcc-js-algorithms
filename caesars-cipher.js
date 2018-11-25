function rot13(str) { // LBH QVQ VG!
  var asciiCode = [];
  var decrypted = [];
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
      if (str.charCodeAt(i) - 13 < 65) {
        asciiCode.push(str.charCodeAt(i) + 26 - 13);
      } else {
        asciiCode.push(str.charCodeAt(i) - 13);
      }
    } else {
      asciiCode.push(str.charCodeAt(i));
    }
  }
  for (var j = 0; j < asciiCode.length; j++) {
    decrypted.push(String.fromCharCode(asciiCode[j]));
  }
  return decrypted.join('');
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");