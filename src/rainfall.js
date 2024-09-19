// Correct implementation of the algorithm
function correctRainfall (inputArr) {
  let sumPositiveNums = 0
  let numPositiveNums = 0
  let guardFound = false

  for (let i = 0; !guardFound && i < inputArr.length; i++) {
    const currentNum = inputArr[i]
    if (currentNum === 99999) guardFound = true
    else if (currentNum > 0) {
      sumPositiveNums += currentNum
      numPositiveNums += 1
    }
  }

  let fraction = 0
  if (numPositiveNums > 0) {
    fraction = sumPositiveNums / numPositiveNums
  }

  return fraction.toFixed(2)
}

// Does not check for GUARD
function noGuardCheck (inputArr) {
  let sumPositiveNums = 0
  let numPositiveNums = 0
  let guardFound = false

  for (let i = 0; !guardFound && i < inputArr.length; i++) {
    const currentNum = inputArr[i]
    if (currentNum > 0) {
      sumPositiveNums += currentNum
      numPositiveNums += 1
    }
  }

  let fraction = 0
  if (numPositiveNums > 0) {
    fraction = sumPositiveNums / numPositiveNums
  }

  return fraction.toFixed(2)
}

// Includes 0s in the average
function includesZeros (inputArr) {
  let sumPositiveNums = 0
  let numPositiveNums = 0
  let guardFound = false

  for (let i = 0; !guardFound && i < inputArr.length; i++) {
    const currentNum = inputArr[i]
    if (currentNum === 99999) guardFound = true
    else if (currentNum >= 0) {
      sumPositiveNums += currentNum
      numPositiveNums += 1
    }
  }

  let fraction = 0
  if (numPositiveNums > 0) {
    fraction = sumPositiveNums / numPositiveNums
  }

  return fraction.toFixed(2)
}

// Includes negatives in the average
function includesNegatives (inputArr) {
  let sumPositiveNums = 0
  let numPositiveNums = 0
  let guardFound = false

  for (let i = 0; !guardFound && i < inputArr.length; i++) {
    const currentNum = inputArr[i]
    if (currentNum === 99999) guardFound = true
    else if (currentNum !== 0) {
      sumPositiveNums += currentNum
      numPositiveNums += 1
    }
  }

  let fraction = 0
  if (numPositiveNums > 0) {
    fraction = sumPositiveNums / numPositiveNums
  }

  return fraction.toFixed(2)
}

// Does not check for positive numbers
function noPositiveCheck (inputArr) {
  let sumPositiveNums = 0
  let numPositiveNums = 0
  let guardFound = false

  for (let i = 0; !guardFound && i < inputArr.length; i++) {
    const currentNum = inputArr[i]
    if (currentNum === 99999) guardFound = true
    else {
      sumPositiveNums += currentNum
      numPositiveNums += 1
    }
  }

  let fraction = 0
  if (numPositiveNums > 0) {
    fraction = sumPositiveNums / numPositiveNums
  }

  return fraction.toFixed(2)
}

// Checks GUARD for !== instead of <
function wrongGuardCheck (inputArr) {
  let sumPositiveNums = 0
  let numPositiveNums = 0
  let guardFound = false

  let i = 0
  while (i < inputArr.length && inputArr[i] < 99999) {
    const currentNum = inputArr[i]
    if (currentNum === 99999) guardFound = true
    else if (currentNum > 0) {
      sumPositiveNums += currentNum
      numPositiveNums += 1
    }

    i++
  }

  let fraction = 0
  if (numPositiveNums > 0) {
    fraction = sumPositiveNums / numPositiveNums
  }

  return fraction.toFixed(2)
}

// Wrong average calculation (inverted dividends)
function wrongAverageCalc (inputArr) {
  let sumPositiveNums = 0
  let numPositiveNums = 0
  let guardFound = false

  for (let i = 0; !guardFound && i < inputArr.length; i++) {
    const currentNum = inputArr[i]
    if (currentNum === 99999) guardFound = true
    else if (currentNum > 0) {
      sumPositiveNums += currentNum
      numPositiveNums += 1
    }
  }

  let fraction = 0
  if (numPositiveNums > 0) {
    fraction = numPositiveNums / sumPositiveNums
  }

  return fraction.toFixed(2)
}

// Does not check that number of positive integers > 0
function doesNotCheckNumOfInt (inputArr) {
  let sumPositiveNums = 0
  let numPositiveNums = 0
  let guardFound = false

  for (let i = 0; !guardFound && i < inputArr.length; i++) {
    const currentNum = inputArr[i]
    if (currentNum === 99999) guardFound = true
    else if (currentNum > 0) {
      sumPositiveNums += currentNum
      numPositiveNums += 1
    }
  }

  let fraction = 0
  fraction = sumPositiveNums / numPositiveNums

  return fraction.toFixed(2)
}

const rainfallFunctions = {
  correct: { prog: correctRainfall, description: 'Implementazione corretta.' },
  erroneous: {
    noGuardCheck: {
      prog: noGuardCheck,
      description: 'Non verifica di aver raggiunto il valore di guardia.'
    },
    includesZeros: {
      prog: includesZeros,
      description: 'Include nel calcolo della media anche i valori nulli.'
    },
    includesNegatives: {
      prog: includesNegatives,
      description: 'Include nel calcolo della media anche i valori negativi.'
    },
    noPositiveCheck: {
      prog: noPositiveCheck,
      description: 'Include nel calcolo della media i valori nulli e negativi.'
    },
    wrongGuardCheck: {
      prog: wrongGuardCheck,
      description: 'Include solo i numeri positivi minori del numero di guardia (invece che diversi).'
    },
    wrongAverageCalc: {
      prog: wrongAverageCalc,
      description: 'Fa un errore nel calcolare la media (inverte dividendo e divisore).'
    },
    doesNotCheckNumOfInt: {
      prog: doesNotCheckNumOfInt,
      description: 'Non controlla che il numero di valori positivi sia maggiore di 0 (e quindi prova a dividere per 0).'
    }
  }
}

module.exports = rainfallFunctions
