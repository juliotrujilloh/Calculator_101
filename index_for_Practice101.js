let calculatorButtons = document.querySelectorAll(".key"); //with querySelectorAll we receive an array of elements
//"key" is valid for class selection - they have two names assigned

let calculatorWindow = document.getElementById("window");

var typedNumbersArray = [];

var num2 = 0;

var selectedOp = "";
var enableOperation = false; //Used to avoid multiple clickings on operation buttons.

//-------------------------------------------------- Calculator's buttons Listener --------------------------------------------------------------
for (let i = 0; i < calculatorButtons.length; i++) {

    calculatorButtons[i].addEventListener("click", function () {
        var calculatorButton = this.innerHTML;   //"this" works instead of calculatorButtons[i]
        if (calculatorButton in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || ["."].includes(calculatorButton)) {
            if (calculatorButton == "." && typedNumbersArray.includes(".")) {
                //console.log(typedNumbersArray)
                buttonAnimation(calculatorButton);
                keySound();
                return
            } else if (calculatorButton == "." & typedNumbersArray.length == 0) {
                //console.log(typedNumbersArray)
                typedNumbersArray.push("0", ".");
            } else {
                typedNumbersArray.push(calculatorButton);
                calculatorWindow.value = typedNumbersArray.join('');
                //console.log(calculatorButton)
            }
            enableOperation = true;
            //console.log(enableOperation);
        } else if (["-", "+", "="].includes(calculatorButton) && enableOperation == true) {
            //console.log(calculatorButton);
            operation(calculatorButton);
        } else if (["C"].includes(calculatorButton)) {
            operation(calculatorButton);
        } else {
            selectedOp = calculatorButton;
            console.log("Override Function") //the process falls here when + is pressed and then - // -> look a way to override the calc functions
        }
        buttonAnimation(calculatorButton);
        keySound();
    });
}

//-------------------------------------------------- Keyboard Listener ----------------------------------------------------------------------------
document.addEventListener("keydown", function (params) {

    if (params.key in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || ["."].includes(params.key)) {
        if (params.key == "." && typedNumbersArray.includes(".")) {
            //console.log(typedNumbersArray)
            params.preventDefault();
        } else if (params.key == "." & typedNumbersArray.length == 0) {
            //console.log(typedNumbersArray);
            typedNumbersArray.push("0", ".");
        } else {
            typedNumbersArray.push(params.key);
            calculatorWindow.value = typedNumbersArray.join('');
        }
        enableOperation = true;
    } else if (["-", "+", "="].includes(params.key) && enableOperation == true) { //using .includes() method - note below
        operation(params.key);
        //buttonAnimation(params.key);
        //keySound();
    } else if (["C", "c"].includes(params.key)) {
        operation(params.key);
        //buttonAnimation(params.key);
    } else {
        selectedOp = params.key;
        console.log(selectedOp)
        params.preventDefault(); //to cancel the event
        //buttonAnimation(params.key);
    }
    buttonAnimation(params.key);
    keySound();
});

//-------------------------------------------------- UI Functions -----------------------------------------------------------------------------------
function buttonAnimation(currentKey) {
    try {
        const numbers = { //JS object used as a dictionary
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine",
            0: "zero",
            ".": "dot",
            "C": "C",
            "c": "C",
            "+": "plus",
            "-": "minus",
            "=": "equal"
        }

        //console.log(numbers[currentKey])
        var activeButton = document.querySelector("." + numbers[currentKey]);

        activeButton.classList.add("pressed"); //Adding a class name to the html element + CSS style

        setTimeout(function () {
            activeButton.classList.remove("pressed"); //Removing CSS style 
        }, 100);
    } catch (error) {
        console.log(error);
    }
}

function keySound() {
    let keySound = new Audio('sounds\\click-button.mp3');
    keySound.play();
}

//------------------------------------------------------ Calc functions ------------------------------------------------------------------------------------
function operation(selectedOperation) {

    var num1 = calculatorWindow.value; // 1. num1 value is assigned with what's on the screen

    switch (selectedOperation) {      //2. Operation get's selected
        case "c": //a way to express "or" inside switch statement
        case "C":
            typedNumbersArray = [];
            calculatorWindow.value = 0;
            num2 = 0;
            selectedOp = '';
            enableOperation = false;
            //console.log("The operation was performed")
            break;
        case "+":
            if (selectedOp == "-") { //to check if there is a previous operation in place
                calculatorWindow.value = parseFloat(num2) - parseFloat(num1);
                num2 = calculatorWindow.value; //saving the current number on the screen
            } else {

                //console.log("+ was pressed")
                // console.log("This is the selected operation = " + selectedOp)
                // console.log("value of num1 = " + num1)
                // console.log("value of num2 = " + num2)
                calculatorWindow.value = parseFloat(num1) + parseFloat(num2); //3. Operation with what's on the screen and saved number (num2= 0 default)
                //console.log("value on the window: " + calculatorWindow.value)
                num2 = calculatorWindow.value;
                //console.log("New value of num2 after operation = " + num2)
            }

            typedNumbersArray = [];
            selectedOp = selectedOperation;
            //console.log(selectedOp);
            enableOperation = false;
            break;

        case "-":
                //console.log("the selected operation is, now: " + selectedOp)
            if (selectedOp == "+") {
                //console.log(`value of num1 = ${num1} and num2 = ${num2}`)
                calculatorWindow.value = parseFloat(num2) + parseFloat(num1);
                num2 = calculatorWindow.value;
                //console.log(`new value of num2 = ${num2}`);
            } else if (num2 == 0) {
                // console.log("value of num1 = " + num1);
                // console.log("value of num1 = " + num2);
                calculatorWindow.value = parseFloat(num1) - parseFloat(num2);
                num2 = calculatorWindow.value;
            } else {
                calculatorWindow.value = parseFloat(num2) - parseFloat(num1);
                num2 = calculatorWindow.value;
            }
            //console.log(calculatorWindow.value)
            //console.log("value of num2 = " + num2);
            typedNumbersArray = [];
            selectedOp = selectedOperation;
            //console.log(selectedOp);
            enableOperation = false;
            break;

        case "=":
                //console.log("= was pressed");
            if (selectedOp == "+") { //With "selectedOp" we are storing the current operation and it gets executed
                calculatorWindow.value = parseFloat(num2) + parseFloat(num1);
            } else {
                calculatorWindow.value = parseFloat(num2) - parseFloat(num1);
            }
            num1 = 0;
            num2 = 0;
            selectedOp = '';
            typedNumbersArray = [];
            //enableOperation = false; <- Testing
            break;

        default:
            console.log(selectedOperation + " was selected, couldn't perform operation");
            break;
    }
}

//----------------------------------------------------------- References ---------------------------------------------------------------------------------------

//note on buttonAnimation() -> I had to change the class names of the buttons to words, css doesn't take numbers as class names

//note on includes.() -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

//note on css pointer-events: CSS pointer events property: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events