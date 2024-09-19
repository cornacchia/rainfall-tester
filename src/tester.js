const rainfallFunctions = require('./rainfall')
const tests = require('./rainfallTests')

function verifyTest (testData, func) {
  const funcResult = func(testData.input)
  if (funcResult === testData.output) return true
  return false
}

const caughtErrors = {}

for (const errFunc in rainfallFunctions.erroneous) {
  caughtErrors[errFunc] = false
}

for (const test in tests) {
  console.log('>>>', test)
  if (verifyTest(tests[test], rainfallFunctions.correct)) {
    console.log('Correct Rainfall PASS')
  } else console.log('Correct Rainfall FAIL')

  let erroneousCaught = 0
  let erroneousTotal = 0
  for (const errFunc in rainfallFunctions.erroneous) {
    erroneousTotal += 1
    if (verifyTest(tests[test], rainfallFunctions.erroneous[errFunc])) {
      console.log(errFunc, 'UNCAUGHT')
    } else {
      console.log(errFunc, 'CAUGHT')
      erroneousCaught += 1
      caughtErrors[errFunc] = true
    }
  }
  const fractionCaught = (erroneousCaught / erroneousTotal).toFixed(2)
  console.log('### Caught', fractionCaught, 'of erroneous programs')
}

let caught = 0
let total = 0
for (const errFunc in caughtErrors) {
  total += 1
  if (caughtErrors[errFunc]) caught += 1
}

const caughtFraction = (caught / total).toFixed(2)

console.log('Caught', caughtFraction, 'of errors')