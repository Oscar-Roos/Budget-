let incomeCounter = 2
let expensesCounter = 6

const expenses = [
    {id: 1, source: 'food', sum: 4000},
    {id: 2, source: 'rent', sum: 3000},
    {id: 3, source: 'internet', sum: 500},
    {id: 4, source: 'electricity', sum: 1300},
    {id: 5, source: 'car', sum: 1500},
    {id: 6, source: 'fun', sum: 500}
]

const income = [
    {id: 1, source: 'salary', sum: 18000},
    {id: 2, source: 'stocks', sum: 800}
]

module.exports = {expenses, income, expensesCounter, incomeCounter};