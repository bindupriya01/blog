function generateRandomNumber() {
    const minValue = parseInt(document.getElementById('minValue').value);
    const maxValue = parseInt(document.getElementById('maxValue').value);
    if (isNaN(minValue) || isNaN(maxValue)) {
        document.getElementById('result').textContent = "Please enter valid numbers.";
        return;
    }
    if (minValue > maxValue) {
        document.getElementById('result').textContent = "Minimum value should be less than or equal to Maximum value.";
        return;
    }
    const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    document.getElementById('result').textContent = `Generated Random Number: ${randomNumber}`;
}