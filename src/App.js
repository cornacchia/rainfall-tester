import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RainfallTester from './RainfallTester'

const _ = require('lodash')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }


  render () {
    return (
      <div style={{ width: '100%' }}>
        <Row>
          <Col>
            <RainfallTester />
          </Col>
        </Row>
      </div>
    )
  }
}

export default App;
