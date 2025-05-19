let totalIncome = 0;
let totalExpenses = 0;
let transactions = [];

window.onload = function () {
    // Cargar datos guardados
    const savedData = JSON.parse(localStorage.getItem('budgetData'));
    if (savedData) {
        totalIncome = savedData.totalIncome;
        totalExpenses = savedData.totalExpenses;
        transactions = savedData.transactions;
        updateSummary();
        renderTransactionHistory();
    }
};

function addIncome() {
    const description = document.getElementById('income-description').value.trim();
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Por favor, ingresa una descripción y una cantidad válida para el ingreso.');
        return;
    }

    totalIncome += amount;
    transactions.push({
        description,
        category: 'Ingreso',
        amount: 0,
        type: 'Ingreso'
    });

    updateSummary();
    saveData();
    renderTransactionHistory();

    // Limpiar campos
    document.getElementById('income-description').value = '';
    document.getElementById('income-amount').value = '';
}

function addExpense() {
    const description = document.getElementById('expense-description').value.trim();
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Por favor, ingresa una descripción y un monto válido para el gasto.');
        return;
    }

    totalExpenses += amount;
    transactions.push({
        description,
        category,
        amount,
        type: 'Gasto'
    });

    updateSummary();
    saveData();
    renderTransactionHistory();

    // Limpiar campos
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

function renderTransactionHistory() {
    const table = document.getElementById('transaction-history');
    table.innerHTML = ''; // Limpiar contenido

    transactions.forEach((t, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td>${t.type === 'Gasto' ? '$' + t.amount.toFixed(2) : '-'}</td>
            <td>${t.type}</td>
            <td><button onclick="deleteTransaction(${index})">Eliminar</button></td>
        `;
        table.appendChild(row);
    });
}

function deleteTransaction(index) {
    const t = transactions[index];
    if (t.type === 'Ingreso') {
        totalIncome -= 0; // ingreso no suma cantidad directamente
    } else {
        totalExpenses -= t.amount;
    }
    transactions.splice(index, 1);
    updateSummary();
    saveData();
    renderTransactionHistory();
}

function updateSummary() {
    document.getElementById('total-income').innerText = totalIncome.toFixed(2);
    document.getElementById('total-expenses').innerText = totalExpenses.toFixed(2);
    document.getElementById('balance').innerText = (totalIncome - totalExpenses).toFixed(2);
}

function saveData() {
    const data = {
        totalIncome,
        totalExpenses,
        transactions
    };
    localStorage.setItem('budgetData', JSON.stringify(data));
}

function clearAll() {
    if (confirm('¿Estás seguro que deseas borrar todos los datos?')) {
        totalIncome = 0;
        totalExpenses = 0;
        transactions = [];
        updateSummary();
        renderTransactionHistory();
        localStorage.removeItem('budgetData');
    }
}
