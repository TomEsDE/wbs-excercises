/**
 * Create the class Calculator
 * this class has 3 methods:
 * - history: once the = key is pressed, it keeps the last value in
 *            memory in an array
 * - equals: returns the value (thanks to an 'eval' function)
 * - clear: clears the history
 */
class Calculator {
  constructor() {
    this._evalArray = [];
    this._historyArray = [];
  }

  addValue(value) {
    // console.log('addValue', value);
    const lastVal = this.getLastVal();

    if (lastVal.type === 'operator') {
      this.evalArray.push({ type: 'value', val: value });
      // print(value);
    } else {
      lastVal.val = lastVal.val + value;
      // print(value);
    }
    this.print();
  }

  addFloat() {
    console.log('addFloat');
    const lastVal = this.getLastVal();

    // console.log(lastVal);

    if (lastVal.type === 'operator') {
      this.evalArray.push({ type: 'float', val: '0.' });
      // print('.');
    } else if (lastVal.type === 'value') {
      lastVal.val = lastVal.val + '.';
      lastVal.type = 'float';
      // print('.');
    }
    this.print();
  }

  addOperation(operator) {
    // console.log('addOperation', operator);
    const lastVal = this.getLastVal();
    // console.log(lastVal);

    if (lastVal.type === 'operator') {
      lastVal.val = operator;
    } else {
      this.evalArray.push({ type: 'operator', val: operator });
      // print(operator);
    }

    // this.evalArray.push({ type: 'operator', val: operator });
    // print(operator);
    this.print();
  }

  history(expr, result) {
    // console.log('history');
    this.historyArray.push({
      expr: expr,
      result: result,
    });
  }

  equals() {
    console.table(this.evalArray);
    console.log('equals', this.getPrintText());

    const printtext = this.getPrintText().replace(/x/g, '*');
    const result = eval(printtext);

    console.log('eval >>> ', result);

    print(result);
    this.history(printtext, result);

    this.evalArray.length = 0;
    this.addValue(result);

    console.table(this.historyArray);

    const divHistory = document.getElementById('history');

    const divHistoryEntry = document.createElement('div');
    divHistoryEntry.innerHTML = `${printtext} = ${result}`;
    divHistory.appendChild(divHistoryEntry);
  }

  clear() {
    console.log('clear');
    this.historyArray.length = 0;
    this.evalArray.length = 0;
    document.getElementById('history').innerHTML = '';
  }

  getPrintText() {
    const lastVal = this.evalArray[this.evalArray.length - 1];
    if (lastVal.type === 'operator')
      this.evalArray.length = this.evalArray.length - 1;

    const printText = this.evalArray.reduce(
      (acc, curr) => acc + `${curr.val} `,
      // acc + (curr.type === 'operator' ? ` ${curr.val} ` : curr.val),
      ''
    );

    return printText;
  }

  print() {
    const printText = this.evalArray.reduce(
      (acc, curr) => acc + `${curr.val} `,
      // acc + (curr.type === 'operator' ? ` ${curr.val} ` : curr.val),
      ''
    );
    print(printText);
  }

  getLastVal() {
    const lastVal = this.evalArray[this.evalArray.length - 1];
    return lastVal ? lastVal : { type: 'operator', val: '' };
  }

  get evalArray() {
    return this._evalArray;
  }
  get historyArray() {
    return this._historyArray;
  }
}

const calc = new Calculator();

const calculatorScreen = document.querySelector('#calculator .screen');
const equals = document.querySelector('#calculator .eval');

/**
 * This function below writes the value of the pressed key on the screen
 * The += is the equivalent of:
 * document.querySelector('.screen').innerHTML = document.querySelector('.screen').innerHTML + val;
 *
 **/
function printAdd(val) {
  calculatorScreen.innerHTML += val;
}

function print(val) {
  calculatorScreen.innerHTML = val;
}

//this code listen to every key on the calculator and add the value on the screen
// document.querySelectorAll('#calculator span').forEach((key) => {
//   if (key.innerText !== '=') {
//     key.addEventListener('click', (e) => print(e.target.innerText));
//   }
// });

document.querySelectorAll('#calculator .val').forEach((key) => {
  if (key.innerText !== '=') {
    key.addEventListener('click', (e) => {
      calc.addValue(e.target.innerText);
    });
  }
});

document.querySelectorAll('#calculator .float').forEach((key) => {
  if (key.innerText !== '=') {
    key.addEventListener('click', (e) => calc.addFloat());
  }
});

document.querySelectorAll('#calculator .operator').forEach((key) => {
  if (key.innerText !== '=') {
    key.addEventListener('click', (e) => calc.addOperation(e.target.innerText));
  }
});

document.querySelector('#calculator .clear').addEventListener('click', () => {
  calculatorScreen.innerHTML = '';
  calc.clear();
});

// Implement here the event when the = key is pressed

document
  .querySelector('#calculator .eval')
  .addEventListener('click', () => calc.equals());
