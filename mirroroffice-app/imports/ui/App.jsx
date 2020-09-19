import React, { useState } from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import Login from './Login.jsx';
import Wrapper from "./Wrapper.jsx";

export const App = () => {
    setVolume = (volume) => {
      var audio = document.getElementById('caller'); 
      audio.volume = volume; 
      var audio2 = document.getElementById('target'); 
      audio2.volume = volume; 
    }

    return (
      <div>
        <h1>Welcome to Meteor!</h1>
        <Hello/>
        <Info/>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              <a className="navbar-brand" href="#">Meteor Video Chat</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <Login />
              </ul>
            </div>
            <div>
              <input 
                id="volume"
                style={{width: "100px"}}
                type="number" 
                min="0" 
                max="1" 
                step="0.1"
                />
              <input 
                id="targetID"
                style={{width: "100px"}}
                type="number" 
                min="1" 
                max="3" 
                step="1"
                defaultValue={1}
                />
              <button onClick={()=>setVolume(document.getElementById("volume").value)}>update volume</button>
            </div>
            <div>
              <Wrapper />
            </div>
          </div>
        </nav>
      </div>
    );

}