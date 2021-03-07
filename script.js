const transactionsUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector("#money-plus")
const outcomeDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")

const dummyTranslations = [
  { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
  { id: 2, name: 'Salário', amount: 300 },
  { id: 3, name: 'Torta de frango', amount: -10 },
  { id: 4, name: 'Violão', amount: 150 },
];

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus' 
  const amountWithoutOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')
  
  li.classList.add(CSSClass)
  li.innerHTML = `
    ${transaction.name} <span>${operator}R$${amountWithoutOperator}</span>
    <button class="delete-btn">x</button>
  `
  transactionsUL.prepend(li)
}

const updateBalanceValue = () => {
  const transactionsAmount = dummyTranslations
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
  dummyTranslations.forEach(addTransactionIntoDOM)
  updateBalanceValue(dummyTranslations)
}

init()
