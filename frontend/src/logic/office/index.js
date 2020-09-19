import React from 'react'
import Map from '../map'
import User from '../user'

import tiles from '../../data/maps/1'
import store from '../../config/store'

function Office(props) {
  store.dispatch({ type: 'ADD_TILES', payload: {
    tiles,
  }})

  return (
    <div
      style={{
        position: 'relative',
        width: '760px',
        height: '720px',
      }}
    >
      <Map />
      <User />
    </div>
  )
}

export default Office
