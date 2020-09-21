import { SIZE } from "../../config/constants";
const initialState = {
  position: [[360, 0],[240,80]],
  spriteLocation: [['0px 0px'],['0px 0px']],
  direction: ['south','south'],
}

function getSpriteLocation(direction) {
  switch (direction) {
    case "SOUTH":
      return `${SIZE}px ${SIZE * 0}px`;
    case "EAST":
      return `${SIZE}px ${SIZE * 1}px`;
    case "WEST":
      return `${SIZE}px ${SIZE * 2}px`;
    case "NORTH":
      return `${SIZE}px ${SIZE * 3}px`;
    default:
    //
  }
}

const userReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'MOVE_USER':
      return {
        position: [[action.payload['position'][0],action.payload['position'][1]],[state['position'][1][0],state['position'][1][1]]],
        spriteLocation: [getSpriteLocation(action.payload['direction'][0]),getSpriteLocation(state['direction'][1])],
        direction: [action.payload['direction'][0],state['direction'][1]],
      }
      case 'MOVE_USER2':
        return {
          position: [[state['position'][0][0],state['position'][0][1]],[action.payload['position'][0],action.payload['position'][1]]],
          spriteLocation: [getSpriteLocation(state['direction'][0]),getSpriteLocation(action.payload['direction'][1])],
          direction: [state['direction'][0],action.payload['direction'][1]],
        }
    default:
      return state
  }
}

export default userReducer
