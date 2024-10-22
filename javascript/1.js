// Task 1: Simple Calculator Function
function calculator(num1, num2, operator) {
    let result;

    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                result = 'Error: Division by zero';
            }
            break;
        default:
            result = 'Error: Invalid operator';
    }

    return result;
}

// Task 2: Sum Even Numbers in an Array
function sumEvenNumbers(numbers) {
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            sum += numbers[i];
        }
    }

    return sum;
}

// Task 3: Person Object Manipulation
const Person = {
    firstName: '',
    lastName: '',
    age: 0,

    getFullName: function() {
        return this.firstName + ' ' + this.lastName;
    },

    incrementAge: function() {
        this.age += 1;
    }
};

// Main function to choose a task
function chooseTask() {
    const task = prompt("Which task would you like to perform?\n1. Calculator\n2. Sum of Even Numbers\n3. Person Object Manipulation");

    if (task === '1') {
        // Task 1: Calculator
        let num1 = parseFloat(prompt("Enter the first number: "));
        let num2 = parseFloat(prompt("Enter the second number: "));
        let operator = prompt("Enter the operator (+, -, *, /): ");
        alert("Result: " + calculator(num1, num2, operator));
    } else if (task === '2') {
        // Task 2: Sum Even Numbers
        let inputArray = prompt("Enter numbers separated by commas: ");
        let numbersArray = inputArray.split(',').map(Number);
        alert("Sum of even numbers: " + sumEvenNumbers(numbersArray));
    } else if (task === '3') {
        // Task 3: Person Object Manipulation
        Person.firstName = prompt("Enter the first name: ");
        Person.lastName = prompt("Enter the last name: ");
        Person.age = parseInt(prompt("Enter the age: "));
        alert("Full Name: " + Person.getFullName());
        alert("Current Age: " + Person.age);
        Person.incrementAge();
        alert("Age after increment: " + Person.age);
    } else {
        alert("Invalid selection. Please refresh and choose a valid task.");
    }
}

// Run the main function
chooseTask();
