import React from "react";
import { connect } from "react-redux";
import { SIZE } from "../../config/constants";
import store from "../../config/store";

import "./styles.css";

function getTileSprite(type) {
  switch (type) {
    case 0:
      return "floor";
    case 5:
      return "wall1";
    case 6:
      return "wall2";
    case 7:
      return "table1";
    case 8:
      return "table2";
    case 9:
      return "table3";
    case 10:
      return "table4";
    case 11:
      return "table5";
    case 12:
      return "table6";
    case 13:
      return "table7";
    case 14:
      return "table8";
    default:
      return "floor";
  }
}

function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile[1])}`}
      onClick={() => {
        if (props.tile[1] < 5) {
          const x = props.tile[0][1];
          const y = props.tile[0][0];
          const html = document.getElementsByTagName("html")[0];
          let centerWidth = window.innerWidth / 2 - x * SIZE - 20;
          let centerHeight = window.innerHeight / 2 - y * SIZE;
          html.style.left = `${centerWidth}px`;
          html.style.top = `${centerHeight}px`;
          let direction = "NORTH";
          let newPos = [x * SIZE, y * SIZE];
          store.dispatch({
            type: "MOVE_USER",
            payload: {
              position: newPos,
              direction,
              spriteLocation: `${SIZE}px ${SIZE * 3}px`,
            },
          });
        }
      }}
      style={{
        height: SIZE,
        width: SIZE,
      }}
    />
  );
}

function MapRow(props) {
  return (
    <div
      className="row"
      style={{
        height: SIZE,
      }}
    >
      {props.tiles.map((tile) => (
        <MapTile tile={tile} />
      ))}
    </div>
  );
}

function Map(props) {
  return (
    <div
      style={{
        position: "relative",
        top: "0px",
        left: "0px",
        width: "800px",
        height: "480px",
      }}
    >
      {props.tiles.map((row) => (
        <MapRow tiles={row} />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tiles: state.map.tiles,
  };
}

export default connect(mapStateToProps)(Map);
