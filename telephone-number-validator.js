function telephoneCheck(str) {
  // for numbers with parenthenses
  if (/^1?(\s|-)?\(\d{3}\)(\s|-)?\d{3}(\s|-)?\d{4}$/.test(str)) {
    console.log('true');
    return true;
  }
  // for numbers without parenthenses
  else if (/^1?(\s|-)?\d{3}(\s|-)?\d{3}(\s|-)?\d{4}$/.test(str)) {
    return true;
  }
  else {
    console.log('false');
    return false;
  }
}

telephoneCheck("555-555-5555");