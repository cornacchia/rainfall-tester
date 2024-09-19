import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ArrowDown, ArrowRight, Trash } from 'react-bootstrap-icons'

const _ = require('lodash')
const rainfallFunctions = require('./rainfall')

function parseInputStr (inputStr) {
  const valueArr = []
  const inputArr = inputStr.split(',')

  for (const el of inputArr) {
    const intVal = parseInt(el)
    if (_.isNaN(intVal)) alert('Attenzione,', el, 'non è un parametro di input valido.')
    else valueArr.push(intVal)
  }

  return valueArr
}

function parseOutputStr (outputStr) {
  const floatVal = parseFloat(outputStr)
  if (_.isNaN(floatVal)) alert('Attenzione,', outputStr, 'non è un output valido.')

  return floatVal.toFixed(2)
}

function verifyTest (testData, func) {
  const funcResult = func(testData.input)
  if (funcResult === testData.output) return true
  return false
}

class RainfallTester extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tests: [],
      currentTestInputStr: '',
      currentTestOutputStr: '',
      testReports: [],
      errorsCaught: -1,
      errorsTotal: -1,
      caughtDescriptions: [],
      uncaughtDescriptions: [],
      showUncaughtDescriptions: false
    }

    this.setTestInput = this.setTestInput.bind(this)
    this.setTestOutput = this.setTestOutput.bind(this)
    this.addTest = this.addTest.bind(this)
    this.removeTest = this.removeTest.bind(this)
    this.runTests = this.runTests.bind(this)
    this.setShowUncaughtDescriptions = this.setShowUncaughtDescriptions.bind(this)
  }

  componentDidMount () {
  }

  setShowUncaughtDescriptions (event) {
    this.setState({ showUncaughtDescriptions: event.target.checked })
  }

  setTestInput (ev) {
    const newTestInput = ev.target.value
    this.setState({
      currentTestInputStr: newTestInput
    })
  }

  setTestOutput (ev) {
    const newTestOutput = ev.target.value
    this.setState({
      currentTestOutputStr: newTestOutput
    })
  }

  addTest () {
    const inputStr = this.state.currentTestInputStr
    const outputStr = this.state.currentTestOutputStr

    const inputArr = parseInputStr(inputStr)
    const outputVal = parseOutputStr(outputStr)

    const test = {
      input: inputArr,
      output: outputVal
    }

    const tests = this.state.tests
    tests.push(test)

    this.setState({ tests })
  }

  removeTest (idx) {
    const tests = this.state.tests
    const newTests = tests.toSpliced(idx, 1)

    this.setState({ tests: newTests })
  }

  runTests () {
    const testReports = []
    const caughtErrors = {}

    for (const errFunc in rainfallFunctions.erroneous) {
      caughtErrors[errFunc] = false
    }

    for (const test of this.state.tests) {
      const testReport = {
        test: test,
        correctPass: false,
        fractionOfErrorsCaught: '-1'
      }

      if (verifyTest(test, rainfallFunctions.correct.prog)) {
        testReport.correctPass = true
      }

      let erroneousCaught = 0
      let erroneousTotal = 0
      for (const errFunc in rainfallFunctions.erroneous) {
        erroneousTotal += 1
        if (!verifyTest(test, rainfallFunctions.erroneous[errFunc].prog)) {
          erroneousCaught += 1
          caughtErrors[errFunc] = true
        }
      }
      const fractionCaught = (erroneousCaught / erroneousTotal).toFixed(2)
      testReport.fractionOfErrorsCaught = fractionCaught

      testReports.push(testReport)
    }

    let caught = 0
    let total = 0
    for (const errFunc in caughtErrors) {
      total += 1
      if (caughtErrors[errFunc]) caught += 1
    }

    const totalCaughtFraction = (caught / total).toFixed(2)

    const caughtDescriptions = []
    const uncaughtDescriptions = []
    for (const errFunc in caughtErrors) {
      if (caughtErrors[errFunc]) caughtDescriptions.push(rainfallFunctions.erroneous[errFunc].description)
      else uncaughtDescriptions.push(rainfallFunctions.erroneous[errFunc].description)
    }

    this.setState({
      testReports,
      errorsCaught: caught,
      errorsTotal: total,
      caughtDescriptions,
      uncaughtDescriptions
    })
  }

  render () {
    return (
      <div style={{ width: '100%' }}>
        <Row>
          <Col xs={2}></Col>
          <Col xs={8} style={{ fontSize: '20px'}}>
          <p>
            Scrivete un programma che, dato un array di <strong>N &gt; 0</strong> valori interi (una qualsiasi combinazione di numeri interi, cioè maggiori, minori o uguali a zero), legga questi valori uno ad uno fino ad incontrare il valore di guardia <strong>99999</strong>. <br/>
            Dopo aver incontrato il valore di guardia il programma deve stampare la <strong>media</strong> dei valori positivi (maggiori di 0) letti fino a quel momento, escluso il valore di guardia.
          </p>
          </Col>
          <Col xs={2}></Col>
        </Row>

        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <h2>Inserisci test</h2>
            <Form>
              <Form.Group>
                <Form.Label>Valori in ingresso</Form.Label>
                <Form.Control type='text' value={this.state.currentTestInputStr} onChange={this.setTestInput} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Valore atteso in uscita</Form.Label>
                <Form.Control type='text' value={this.state.currentTestOutputStr} onChange={this.setTestOutput} />
              </Form.Group>
              <Button onClick={this.addTest} style={{ marginTop: '10px'}}>
                Aggiungi
              </Button>
            </Form>
          </Col>
          <Col xs={3}></Col>
        </Row>

        <hr />

        <Row>
          <Col xs={6} style={{ fontSize: '20px'}}>
            <h2>Test implementati</h2>
            {this.state.tests.map((test, tIdx) => (
              <Row key={tIdx}>
                <Col>
                  <Button size='small' variant='danger' onClick={() => { this.removeTest(tIdx) }}><Trash /></Button>
                  &nbsp;&nbsp;&nbsp;
                  {JSON.stringify(test.input)} <ArrowRight /> {test.output}
                </Col>
              </Row>
            ))}
          </Col>

          <Col xs={6}>
            <Row>
              <Col>
                <Button variant='primary' onClick={this.runTests}>Verifica copertura dei test</Button>
                {this.state.errorsCaught >= 0 &&
                  <p>I test catturano {this.state.errorsCaught}/{this.state.errorsTotal} programmi errati.</p>
                }
              </Col>
            </Row>
            {this.state.caughtDescriptions.length > 0 &&
              <Row>
                <h3>Errori catturati</h3>
                <ul>
                {this.state.caughtDescriptions.map((descr, dIdx) => (
                  <li key={dIdx}>{descr}</li>
                ))}
                </ul>
              </Row>
            }
            {this.state.uncaughtDescriptions.length > 0 &&
              <Row>
                <h3>Errori non catturati</h3>
                <Form>
                  <Form.Group>
                    <Form.Check type='checkbox' checked={this.state.showUncaughtDescriptions} onChange={this.setShowUncaughtDescriptions} label='Mostra'></Form.Check>
                  </Form.Group>
                </Form>
                <ul>
                  {this.state.uncaughtDescriptions.map((descr, dIdx) => (
                    <li key={dIdx}>{this.state.showUncaughtDescriptions ? descr : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}</li>
                  ))}
                </ul>
              </Row>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

RainfallTester.propTypes = {

}

export default RainfallTester
