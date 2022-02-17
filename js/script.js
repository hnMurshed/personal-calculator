// get inocome amount with getInputAmount function
function getIncomeInputAmount () {
    const inputField = document.getElementById('income-amount');
    const inputValue = inputField.value;
    const inputAmount = parseFloat(inputValue);
    // if (inputAmount != 'number') {
    //     document.getElementById('income-error').innerText = 'Please input a number';
    // }
    if (inputAmount < 0) {
        document.getElementById('income-error').innerText = 'Not allowed negetive number';
    }
    else {
        document.getAnimations('income-error').innerText = '';
        return inputAmount; 
    }
    
}

// get inocome and expenses amount with getInputAmount function
function getInputAmount (inputId) {
    const inputField = document.getElementById(inputId);
    const inputValue = inputField.value;
    const inputAmount = parseFloat(inputValue);

    // clear field
    inputField.value = '';

    return inputAmount;
}



// get total expenses amount
function getTotalExpense () {
    const foodCost = getInputAmount ('food-cost');
    const rentCost = getInputAmount ('rent-cost');
    const clothingCost = getInputAmount ('clothing-cost');
    console.log(rentCost, clothingCost);

    // get total expenses field and amount
    const totalExpensesField = document.getElementById('total-expenses');
    if (foodCost == NaN || clothingCost == NaN || rentCost == NaN) {
        document.getElementById('expense-error').innerText = 'Include number for each input';
    }
    else if (foodCost < 0 || clothingCost < 0 || rentCost < 0) {
        document.getElementById('expense-error').innerText = 'Not allowed negetive number';
    }
    else {
        totalExpensesField.innerText = foodCost + rentCost + clothingCost;
        const currentTotalExpenses = parseFloat(totalExpensesField.innerText);
        document.getElementById('expense-error').innerText = '';
        return currentTotalExpenses;
    }
    
}

// get balance amount
function getBalanceAmount () {
    const monthlyIncome = getIncomeInputAmount ();
    const totalExpensesAmount = getTotalExpense ();
    
    // get balance field
    const balanceField = document.getElementById('balance-field');

    if (monthlyIncome == undefined || totalExpensesAmount == undefined) {
        console.log('sorry, can not perform the calculation. Maybe you include a wrong input')
    }
    else if (totalExpensesAmount > monthlyIncome) {
        console.log(alert('You can not spend over your income'));
    }
    else {
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

    // get saving amount field
    const savingAmountField = document.getElementById('saving-amount');

    if (savingInputParchent == NaN || monthlyIncome == undefined) {
        console.log(alert('Please, percentage number can not be negetive or a text'))
    }
    else {
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
        console.log(alert('You can not save money. your saving amount is bigger than your balance'))
    }
    remainingBalanceField.innerText = balanceAmount - savingAmount;
}

// envent handling on Save button
document.getElementById('save-button').addEventListener('click', function () {
    getSavingAmount ()
    getRemainingBalance ()

    // clear icome input field
    const inputField = document.getElementById('income-amount');
    inputField.value = '';
})