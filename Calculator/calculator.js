// File: calculator.js
// Developer: William Kennedy
// Description: The button functionality and logic of a Standard Calculator

const _output = document.getElementById('output');
const _clear = document.getElementById('clear');
const _equal = document.getElementById('equal');
const operands = document.getElementsByClassName("operand");
const operators = document.getElementsByClassName("operator");

// Map defining the precedence of the operators
const _operators = {'^': 3, '/': 2, 'x': 2, '+': 1, '-': 1};
const opStack = [];
let output = [];

// Assigns an anonymous function to each operand button on the calculator
for (let i=0; i< operands.length; i++) {
  assignInput(operands[i], operands[i].innerHTML);
}

// Assigns an anonymous function to each operator on the calculator
for (let i=0; i< operators.length; i++) {
  assignInput(operators[i], ' '+operators[i].innerHTML+' ');
}

// Adds click events to the numbers and BEDMAS operators buttons
function assignInput(button, input) {

  button.onclick = function() {
    _output.innerHTML += input;
  }
};

// Clears the output
_clear.addEventListener('click', event => {
  _output.innerHTML = "";
});


// Logic for computing a basic input with respect to BEDMAS
_equal.onclick = function() {
  const formula = _output.innerHTML;
  const arrFormula = formula.split(" ");
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
  _output.innerHTML = evaluatePostfix();
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

// Evaluates a Postfix expression, returns a final number
const evaluatePostfix = () => {
  const operands = [];

  output.forEach(char => {

    if (!isOperator(char)) {
      operands.push(char);
    } else {
      const op1 = operands.pop();
      const op2 = operands.pop();
      operands.push(calculateExpr(char, op1, op2));
    }
    
  });
  return operands.join('');
}

const isOperator = input => {
  switch(input) {
    case 'x':
      return true;

    case '/':
      return true;

    case '+':
      return true;
    
    case '-':
      return true;

    default:
      return false;
  }
}

const calculateExpr = (op, op1, op2) => { 

  switch(op) {
    case 'x':
      return op1*op2;
    case '/': 
      return op1/op2;
    case '^':
      return op1**op2;
    case '+':
      return op1+op2;
    case '-':
      return op1-op2;
  }
}
