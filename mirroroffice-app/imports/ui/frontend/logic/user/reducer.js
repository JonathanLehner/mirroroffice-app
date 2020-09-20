const initialState = {
  position: [360, 0],
  spriteLocation: '0px 0px',
  direction: 'south',
  walkIndex: 0
}

const userReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'MOVE_USER':
      return {
        ...action.payload
      }
    default:
      return state
  }
}

export default userReducer
