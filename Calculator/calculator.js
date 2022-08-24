// File: calculator.js
// Developer: William Kennedy
// Description: The button functionality and logic of a Standard Calculator

const _output = document.getElementById('output');
const _clear = document.getElementById('clear');
const _equal = document.getElementById('equals');

const buttonInputs = document.getElementsByClassName("input");

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

  // Puts 
}
