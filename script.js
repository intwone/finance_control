const transactionsUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const outcomeDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionValue = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null 
  ? localStorageTransactions 
  : []

const removeTransaction = id => {
  transactions = transactions
    .filter(transaction => id !== transaction.id)
  
  updateLocalStorage()
  
  init()
}

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus' 
  const amountWithoutOperator = Math.abs(transaction.amount).toFixed(2)
  const li = document.createElement('li')
  
  li.classList.add(CSSClass)
  li.innerHTML = `
    ${transaction.name} <span>${operator}R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
  `
  transactionsUL.prepend(li)
}

const updateBalanceValue = () => {
  const transactionsAmount = transactions
    .map(transaction => transaction.amount)

  const totalAmount = transactionsAmount
    .reduce((acc, amount) => acc + amount, 0)
    .toFixed(2)
  
  const income = transactionsAmount
    .filter(amount => amount > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2)

  const outcome = Math.abs(transactionsAmount
      .filter(amount => amount < 0)
      .reduce((acc, value) => acc + value, 0))
      .toFixed(2)

  incomeDisplay.innerHTML = `R$ ${income}`
  outcomeDisplay.innerHTML = `R$ ${outcome}`
  balanceDisplay.innerHTML = `R$ ${totalAmount}`
}

const init = () => {
  transactionsUL.innerHTML = '' 
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValue()
}

init()

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => {
  return Math.floor(Math.random() * 10000000000)
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionValue = Number(inputTransactionValue.value.trim())

  if(transactionName === '' || transactionValue === 0) {
    return alert('Por favor, preencha o nome e o valor da transação')
  }

  const transaction = { 
    id: generateID(), 
    name: transactionName, 
    amount: transactionValue
  }

  transactions.push(transaction)

  init()

  updateLocalStorage()

  inputTransactionName.value = ''
  inputTransactionValue.value = ''
})
