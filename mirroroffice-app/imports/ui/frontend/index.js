import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { SIZE } from "./config/constants";

import store from './config/store'

const html = document.getElementsByTagName('html')[0];
let centerWidth = window.innerWidth/2 - 380
let centerHeight = window.innerHeight/2
html.style.left = `${centerWidth}px`
html.style.top = `${centerHeight}px`
document.ontouchmove = function(event){
  event.preventDefault()
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

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||
         evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    let direction;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
          direction = "WEST"
        } else {
          direction = "EAST"
        }
    } else {
        if ( yDiff > 0 ) {
          direction = "NORTH"
        } else {
            direction = "SOUTH"
        }
    }
    store.dispatch({
      type: "MOVE_USER",
      payload: {
        direction,
        position: store.getState().user.position,
        spriteLocation: getSpriteLocation(direction),
      },
    });
    /* reset values */
    xDown = null;
    yDown = null;
}

const BoxedOffice = () => <Provider store={store}>
  <App />
</Provider>;

export default BoxedOffice;
