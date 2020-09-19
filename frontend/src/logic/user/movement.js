import store from "../../config/store";
import { SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

export default function handleMovement(user) {
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SIZE, oldPos[1]];
      case "EAST":
        return [oldPos[0] + SIZE, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SIZE];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SIZE];
      default:
      //
    }
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

  function observeBoundaries(oldPos, newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= MAP_HEIGHT - SIZE
    );
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SIZE;
    const x = newPos[0] / SIZE;
    const nextTile = tiles[y][x][1];
    return nextTile < 5;
  }

  function dispatchMove(direction, newPos) {
    console.log(newPos)
    const x = newPos[0]
    const y = newPos[1]
    const html = document.getElementsByTagName('html')[0];
    let centerWidth = window.innerWidth/2 - x - 20
    let centerHeight = window.innerHeight/2 - y
    html.style.left = `${centerWidth}px`
    html.style.top = `${centerHeight}px`
    store.dispatch({
      type: "MOVE_USER",
      payload: {
        position: newPos,
        direction,
        spriteLocation: getSpriteLocation(direction),
      },
    });
  }

  function attemptMove(direction) {
    const oldPos = store.getState().user.position;
    const newPos = getNewPosition(oldPos, direction);

    if (observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos))
      dispatchMove(direction, newPos);
  }

  function handleKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 37:
        return attemptMove("WEST");

      case 38:
        return attemptMove("NORTH");

      case 39:
        return attemptMove("EAST");

      case 40:
        return attemptMove("SOUTH");

      default:
      //console.log(e.keyCode)
    }
  }

  window.addEventListener("keydown", (e) => {
    handleKeyDown(e);
  });

  return user;
}
