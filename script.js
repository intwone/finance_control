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

const addTransactionIntoDOM = ({ amount, name, id }) => {
  const operator = amount < 0 ? '-' : '+'
  const CSSClass = amount < 0 ? 'minus' : 'plus' 
  const amountWithoutOperator = Math.abs(amount).toFixed(2)
  const li = document.createElement('li')
  
  li.classList.add(CSSClass)
  li.innerHTML = `
    ${name} <span>${operator}R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
  `
  transactionsUL.prepend(li)
}

const getOutcome = transactionsAmount => { 
  return Math.abs(transactionsAmount
    .filter(amount => amount < 0)
    .reduce((acc, value) => acc + value, 0))
    .toFixed(2)
}

const getIncome = transactionsAmount => { 
  return transactionsAmount
    .filter(amount => amount > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2)
}

const getTotalAmount = transactionsAmount => {
  return transactionsAmount
    .reduce((acc, amount) => acc + amount, 0)
    .toFixed(2)
}

const updateBalanceValue = () => {
  const transactionsAmount = transactions.map(({ amount }) => amount)

  const totalAmount = getTotalAmount(transactionsAmount)
  
  const income = getIncome(transactionsAmount)

  const outcome = getOutcome(transactionsAmount)

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

const addToTransactionsArray = (transactionName, transactionValue) => {
  const transaction = { 
    id: generateID(), 
    name: transactionName, 
    amount: transactionValue
  }

  transactions.push(transaction)
}

const cleanInputs = () => {
  inputTransactionName.value = ''
  inputTransactionValue.value = ''
}

const handleFormSubmit = event => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionValue = Number(inputTransactionValue.value.trim())
  const checkInputEmpty = transactionName === '' || transactionValue === 0

  if(checkInputEmpty) {
    return alert('Por favor, preencha o nome e o valor da transação')
  }

  addToTransactionsArray(transactionName, transactionValue)

  init()

  updateLocalStorage()

  cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)
