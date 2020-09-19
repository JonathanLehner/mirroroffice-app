import React, { useState } from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import Login from './Login.jsx';
import Wrapper from "./Wrapper.jsx";
import { withTracker } from 'meteor/react-meteor-data';
import OfficeBox from "./OfficeBox.jsx";

export const App = () => {
    setVolume = (volume) => {
      var audio = document.getElementById('caller'); 
      audio.volume = volume; 
      var audio2 = document.getElementById('target'); 
      audio2.volume = volume; 
    }

    addToChat = () => {
      const msg = document.getElementById("chatInput").value;
      document.getElementById("chatInput").value = "";
      Meteor.call("addToChat", {msg});
    }

    return (
      <div>
        <h1>Welcome to Mirroroffice!</h1>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <Login />
              </ul>
            </div>
            <div>
              <OfficeBox />
            </div>
            <div style={{padding: "10px", opacity: "0.5"}}>
              <Tracked_ChatBox />
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
              <button onClick={()=>setVolume(document.getElementById("volume").value)}>update volume</button>
            </div>
            <div>
              <input 
                  id="chatInput"
                  style={{width: "100px"}}
                  />
              <button onClick={()=>this.addToChat()}>Send message to chat</button>
            </div>
            <div>
              <Wrapper />
            </div>
          </div>
        </nav>
      </div>
    );

}

const ChatBox = (props) => {
  const chatMessages = props.chatMessages.pop() || {};
  return (
    <div>
      <div>{chatMessages.msg}</div>
      {/*chatMessages.map((msg) => {
        return <div>{msg}</div>;
      })*/}
    </div>
  )
}

const Tracked_ChatBox = withTracker(()=>{
  const chatMessages = ChatCollection.find().fetch();
  return {
    chatMessages
  };
})(ChatBox);