// get inocome and expenses amount with getInputAmount function

function getInputAmount (inputId) {
    const inputField = document.getElementById(inputId);
    const inputValue = inputField.value;
    const inputAmount = parseFloat(inputValue);

    // if (typeof inputField.value != 'number') {
    //     console.log('Please input a number');
    // }
    // else {  
    //     const inputValue = inputField.value;
    //     const inputAmount = parseFloat(inputValue);
        
    // }

    return inputAmount;

    // clear input fields
    inputField.value = '';
}

// get total expenses and balance amount

function getTotalExpense () {
    const foodCost = getInputAmount ('food-cost');
    const rentCost = getInputAmount ('rent-cost');
    const clothingCost = getInputAmount ('clothing-cost');

    // get total expenses field and amount
    const totalExpensesField = document.getElementById('total-expenses');
    totalExpensesField.innerText = foodCost + rentCost + clothingCost;

    const currentTotalExpenses = parseFloat(totalExpensesField.innerText);
    return currentTotalExpenses;
}

// get balance amount
function getBalanceAmount () {
    const monthlyIncome = getInputAmount ('income-amount');
    const totalExpensesAmount = getTotalExpense ();

    // get balance field
    const balanceField = document.getElementById('balance-field');
    balanceField.innerText = monthlyIncome - totalExpensesAmount;

}

// event handling on Calculate button
document.getElementById('calculate-button').addEventListener('click', function () {
    getBalanceAmount ()
})