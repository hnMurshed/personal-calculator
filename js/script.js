// get inocome amount with getInputAmount function
function getIncomeInputAmount() {
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

// get expenses amount
function getInputAmount(inputId) {
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

// get new expense amount
function getNewExpenseAmount(inputId) {
    const inputField = document.getElementById(inputId + '-cost');
    const inputValue = inputField.value;
    const inputAmount = parseFloat(inputValue);

    if (inputAmount < 0) {
        alert('Please input positive number')
    }

    // clear field
    // inputField.value = '';
    sumNewExpenses(inputAmount);
}

// sum new expenses
let currentNewExpense = 0;
const sumNewExpenses = (newExpense) => {
    if (newExpense && newExpense > 0) {
        currentNewExpense += newExpense;
        console.log(currentNewExpense);
    }
}

// add more expense
const addNewExpense = () => {
    const expensesField = document.getElementById('expenses-field');
    const newExpenseName = document.getElementById('expense-name-input').value;
    const newExpenseAmount = document.getElementById('expense-amount').value;
    const div = document.createElement('div');
    div.className = "d-flex align-items-center justify-content-end my-3";

    div.innerHTML = `
        <h5 class="me-2 text-capitalize">${newExpenseName}:</h5>
        <input id="${newExpenseName}-cost" class="border-none rounded-1 px-2 py-1" type="text" placeholder="${newExpenseName} cost amount" name="">
    `;

    if (!newExpenseName || !newExpenseAmount) {
        alert('Fields are required to filled with currect value');
        console.log(newExpenseAmount, newExpenseName);
    }
    else {
        expensesField.appendChild(div);
        document.getElementById(newExpenseName + '-cost').value = newExpenseAmount;

        getNewExpenseAmount(newExpenseName);

        // clear field
        document.getElementById('expense-name-input').value = '';
        document.getElementById('expense-amount').value = '';
    }
}

// get total expenses amount
function getTotalExpense() {
    const foodCost = getInputAmount('food-cost');
    const rentCost = getInputAmount('rent-cost');
    const clothingCost = getInputAmount('clothing-cost');

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
        totalExpensesField.innerText = foodCost + rentCost + clothingCost + currentNewExpense;
        const currentTotalExpenses = parseFloat(totalExpensesField.innerText);
        return currentTotalExpenses;
    }

}

// get balance amount
function getBalanceAmount() {
    const monthlyIncome = getIncomeInputAmount();
    const totalExpensesAmount = getTotalExpense();

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
    getBalanceAmount();

    // clear new expense input fields
    // document.getElementById(newExpenseName + '-cost').value = '';
})

// get saving amount with function
function getSavingAmount() {
    const savingInputParchent = getInputAmount('saving-input');
    const monthlyIncome = getIncomeInputAmount();

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
function getCurrentSavingBalance(fieldId) {
    const savingAmountField = document.getElementById(fieldId);
    const currentAmount = parseFloat(savingAmountField.innerText);

    return currentAmount;
}

// get remaining balance
function getRemainingBalance() {
    const savingAmount = getCurrentSavingBalance('saving-amount');
    const balanceAmount = getCurrentSavingBalance('balance-field');

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
    getSavingAmount()
    getRemainingBalance()

    // clear icome input field
    const inputField = document.getElementById('income-amount');
    inputField.value = '';
})