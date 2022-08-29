// File: calculator.js
// Developer: William Kennedy
// Description: The button functionality and logic of a Standard Calculator

const _output = document.getElementById('output');
const _clear = document.getElementById('clear');
const _equal = document.getElementById('equals');
const buttonInputs = document.getElementsByClassName("input");

// Map defining the precedence of the operators
const _operators = {'^': 3, '/': 2, 'x': 2, '+': 1, '-': 1};
const opStack = [];
let output = [];

// Assigns an anymous function to each input button on the calculator
for (let i=0; i < buttonInputs.length; i++) {

  assignInput(buttonInputs[i], buttonInputs[i].innerHTML);

}

//Adds click events to the numbers and BEDMAS operators buttons
function assignInput(button, input) {

  button.onclick = function() {
    _output.innerHTML += input;
  }
};

//Clears the output
_clear.onclick = function() {
  _output.innerHTML = "";
}


// Logic for computing a basic input with respect to BEDMAS
_equal.onclick = function() {
  const formula = _output.innerHTML;
  const arrFormula = formula.split("");
  output = [];

  // Converts from infix to postfix form
  arrFormula.forEach(char => {

    switch(char) {
      case '(': 
        opStack.push(char);
        break;
      case ')':
        // Case calculates operations of the current parethenese's
        i = opStack.pop();
        while (i !== '(') {
          output.push(i)
          i = opStack.pop();
        }
        break;

      case '^':
        removeOperator(char);
        break;
        
      case '+':
        removeOperator(char);
        break;

      case '-': 
        removeOperator(char);
        break;

      case 'x':
        removeOperator(char);
        break;

      case '/':
        removeOperator(char);
        break;

      default:
        output.push(char);
        break;
    }
  });
  
  while (opStack.length !== 0) {
    output.push(opStack.pop());
  }
  _output.innerHTML = output.join('');
}

// Helper function that solves the two cases of adding an operator to the opStack
// 1) If the top element has the same or lower precedence, it pushes the new operator to the opStack
// 2) If the top element of the opStack has a higher precedence than the operator to be added then
// each operator must be popped until the top element is of equal or less precedence
function removeOperator(op) {

  let top = opStack[opStack.length-1];
  if (opStack.length === 0) {

    opStack.push(op);

  } else {

    while (opStack.length !== 0) {

      if (_operators[top] > _operators[op]) {
        output.push(opStack.pop());
      } else {
        break;
      }
    }
    opStack.push(op);
  }
}

const evaluatePostfix = () => {
  const operands = [];

  output.forEach(char =>{
    switch(char) {
      case '':

        break;

      default:
        operands.push(char);
        break;
    }
  })
}
