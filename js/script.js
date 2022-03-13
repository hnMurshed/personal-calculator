// get inocome amount with getInputAmount function
function getIncomeInputAmount () {
    const inputField = document.getElementById('income-amount');
    const inputValue = inputField.value;
    const inputAmount = parseFloat(inputValue);
    if (!inputAmount) {
        displayError('income-amount', 'income-error-message');
    }
    else if (inputAmount < 0) {
        alert('Please input positive number')
    }
    else {
        hideError('income-amount', 'income-error-message');
    }

    return inputAmount;
}

const displayError = (id, errorId) => {
    const errorField = document.getElementById(id);
    errorField.style.backgroundColor = '#ffe6e6';
    errorField.style.border = '1px solid #ff6666';
    document.getElementById(errorId).style.display = 'block';
}
const hideError = (id, errorId) => {
    const errorField = document.getElementById(id);
    errorField.style.backgroundColor = '#add8e666';
    errorField.style.border = 'none';
    document.getElementById(errorId).style.display = 'none';
}

// get inocome and expenses amount with getInputAmount function
function getInputAmount (inputId) {
    const inputField = document.getElementById(inputId);
    const inputValue = inputField.value;
    const inputAmount = parseFloat(inputValue);

    if (inputAmount < 0) {
        alert('Please input positive number')
    }

    // clear field
    inputField.value = '';

    return inputAmount;
}



// get total expenses amount
function getTotalExpense () {
    const foodCost = getInputAmount ('food-cost');
    const rentCost = getInputAmount ('rent-cost');
    const clothingCost = getInputAmount ('clothing-cost');

    if (!foodCost) {
        displayError('food-cost', 'food-error-message');
    }
    else {
        hideError('food-cost', 'food-error-message');
    }
    if (!rentCost) {
        displayError('rent-cost', 'rent-error-message');
    }
    else {
        hideError('rent-cost', 'rent-error-message');
    }
    if (!clothingCost) {
        displayError('clothing-cost', 'cloth-error-message');
    }
    else {
        hideError('clothing-cost', 'cloth-error-message');
    }

    // get total expenses field and amount
    const totalExpensesField = document.getElementById('total-expenses');

    if (foodCost < 0 || clothingCost < 0 || rentCost < 0) {
        document.getElementById('expense-error').innerText = 'Not allowed negetive number';
    }
    else if (foodCost && clothingCost && rentCost) {
        totalExpensesField.innerText = foodCost + rentCost + clothingCost;
        const currentTotalExpenses = parseFloat(totalExpensesField.innerText);
        return currentTotalExpenses;
    }
    
}

// get balance amount
function getBalanceAmount () {
    const monthlyIncome = getIncomeInputAmount ();
    const totalExpensesAmount = getTotalExpense ();
    
    // get balance field
    const balanceField = document.getElementById('balance-field');

    if (totalExpensesAmount > monthlyIncome) {
        console.log(alert('You can not spend over your income'));
    }
    else if (monthlyIncome && totalExpensesAmount) {
        balanceField.innerText = monthlyIncome - totalExpensesAmount;
    }
}

// event handling on Calculate button
document.getElementById('calculate-button').addEventListener('click', function () {
    getBalanceAmount ()
})

// get saving amount with function
function getSavingAmount () {
    const savingInputParchent = getInputAmount ('saving-input');
    const monthlyIncome = getIncomeInputAmount ();

    if (!savingInputParchent) {
        displayError('saving-input', 'saving-error-message');
    }
    else {
        hideError('saving-input', 'saving-error-message');
    }

    // get saving amount field
    const savingAmountField = document.getElementById('saving-amount');

    if (savingInputParchent && monthlyIncome) {
        savingAmountField.innerText = (monthlyIncome * savingInputParchent) / 100;
    }
}

// get current savingAmount and balanceAmount
function getCurrentSavingBalance (fieldId) {
    const savingAmountField = document.getElementById(fieldId);
    const currentAmount = parseFloat(savingAmountField.innerText);

    return currentAmount;
}

// get remaining balance
function getRemainingBalance () {
    const savingAmount = getCurrentSavingBalance ('saving-amount');
    const balanceAmount = getCurrentSavingBalance ('balance-field');

    // get remaining balance field
    const remainingBalanceField = document.getElementById('remaining-balance');

    if (savingAmount > balanceAmount) {
        console.log(alert('Insufficient amount to save'))
    }
    else if (savingAmount && balanceAmount) {
        remainingBalanceField.innerText = balanceAmount - savingAmount;
    }
}

// envent handling on Save button
document.getElementById('save-button').addEventListener('click', function () {
    getSavingAmount ()
    getRemainingBalance ()

    // clear icome input field
    const inputField = document.getElementById('income-amount');
    inputField.value = '';
})