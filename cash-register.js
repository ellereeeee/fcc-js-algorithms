function checkCashRegister(price, cash, cid) {

  // see what cash denominations exist in drawer
  function filterCid(value) {
    return value[1] > 0;
  }
  var filteredCid = cid.filter(filterCid);

  // total cash in drawer
  function sumCid(total, value) {
    return total + value[1];
  }
  var totalCid;
  if (filteredCid.length > 1) {
    totalCid = filteredCid.reduce(sumCid, 0).toFixed(2);
  } else {
    totalCid = filteredCid[0][1];
  }
  // find cash denomination amounts
  function findDenominationAmount(item) {
    var amount;
    if (item[0] == "PENNY") {
      amount = item[1] / .01;
    } else if (item[0] == "NICKEL") {
      amount = item[1] / .05;
    } else if (item[0] == "DIME") {
      amount = item[1] / .1;
    } else if (item[0] == "QUARTER") {
      amount = item[1] / .25;
    } else if (item[0] == "ONE") {
      amount = item[1]
    } else if (item[0] == "FIVE") {
      amount = item[1] / 5;
    } else if (item[0] == "TEN") {
      amount = item[1] / 10;
    } else if (item[0] == "TWENTY") {
      amount = item[1] / 20;
    } else if (item[0] == "ONE HUNDRED") {
      amount = item[1] / 100;
    }
    var newItem = [item[0], +amount.toFixed(2)];
    return newItem;
  }
  var denominationTotals = filteredCid.map(findDenominationAmount);

  var change = [];

  // calculate change due
  const totalChangeDue = cash - price;
  var changeRemaining = totalChangeDue;

  // check for sufficient funds in drawer
  if (totalCid < totalChangeDue) {
    return {
      status: "INSUFFICIENT_FUNDS",
      change: []
    };
    // close drawer if all change in drawer equals change due
  } else if (totalCid == totalChangeDue) {
    return {
      status: "CLOSED",
      change: cid
    };
    // give change
  } else {
    //    roughAmount = +(changeRemaining / denomAmount).toFixed(2)
    var changeGiven = 0;
    var arrayDecrementer = -1;
    // calculate change to give for each denomination
    function giveChangeForDenomination(denomName, denomAmount) {
      var roughAmount;
      roughAmount = Math.trunc(changeRemaining / denomAmount);
      var amountToGive;
      (roughAmount > denominationTotals[denominationTotals.length + arrayDecrementer][1]) ? amountToGive = filteredCid[filteredCid.length + arrayDecrementer][1]: amountToGive = roughAmount * denomAmount;
      change.push([denomName, amountToGive]);
      filteredCid[filteredCid.length + arrayDecrementer][1] = filteredCid[filteredCid.length + arrayDecrementer][1] - amountToGive;
      denominationTotals[denominationTotals.length + arrayDecrementer][1] = 0;
      changeGiven = +(changeGiven + amountToGive).toFixed(2);
      changeRemaining = +(changeRemaining - amountToGive).toFixed(2);
    }
    while (changeGiven != totalChangeDue) {
      if (Math.abs(arrayDecrementer) > filteredCid.length) {
        return {
          status: "INSUFFICIENT_FUNDS",
          change: []
        }
      } else if (changeRemaining >= 100 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "ONE HUNDRED" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("ONE HUNDRED", 100);
      } // close 100 if statement
      else if (changeRemaining >= 20 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "TWENTY" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("TWENTY", 20);
      } // close 20 if statement
      else if (changeRemaining >= 10 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "TEN" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("TEN", 10);
      } // close 10 if statement
      else if (changeRemaining >= 5 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "FIVE" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("FIVE", 5);
      } // close 5 if statement
      else if (changeRemaining >= 1 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "ONE" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("ONE", 1);
      } // close 1 if statement
      else if (changeRemaining >= .25 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "QUARTER" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("QUARTER", .25);
      } // close .25 if statement
      else if (changeRemaining >= .1 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "DIME" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("DIME", .1);
      } // close .1 if statement
      else if (changeRemaining >= .05 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "NICKEL" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("NICKEL", .05);
      } // close .05 if statement
      else if (changeRemaining >= .01 && denominationTotals[denominationTotals.length + arrayDecrementer][0] == "PENNY" && denominationTotals[denominationTotals.length + arrayDecrementer][1] > 0) {
        giveChangeForDenomination("PENNY", .01);
      } // close .05 if statement
      else {
        arrayDecrementer = arrayDecrementer - 1;
      }
    } // close while loop
    return {
      status: "OPEN",
      change: change
    }
  }
} // close checkCashRegister