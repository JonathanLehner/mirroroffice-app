import React, { Component } from 'react'
import Index from './frontend/index.js'

class OfficeBox extends Component {
  render() {
    return (
      <div style={{position: "absolute"}}>
        <Index />
      </div>
    )
  }
}

export default OfficeBox