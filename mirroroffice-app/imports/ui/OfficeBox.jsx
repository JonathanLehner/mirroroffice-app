import React, { Component } from 'react'
import Index from './frontend/index.js'

class OfficeBox extends Component {
  render() {
    return (
      <div style={{position: "relative"}}>
        <Index setPositions={this.props.setPositions}/>
      </div>
    )
  }
}

export default OfficeBox