import React from 'react';
import { Meteor } from 'meteor/meteor';
import { VideoCallServices } from 'meteor/elmarti:video-chat';
import Call from './Call.jsx';

class Wrapper extends React.Component {
    getTarget = () => {
        const targetID = document.getElementById("targetID").value;
        const target = targetID == 1 ? this.refs.target : (targetID == 2) ? this.refs.target2 : this.refs.target3;
        return target;
    }

    constructor() {
        super();
        VideoCallServices.init({
            iceServers: [
                { url: 'stun:stun.l.google.com:19302' },
                {
                    url: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                }
            ]
        });
        VideoCallServices.setOnError((err, data) => {
            switch (err.name) {
                case "NotFoundError":
                    alert("Could not find webcam");
                    VideoCallServices.endCall();
                    break;
                case "NotAllowedError":
                    alert("Could not access media device");
                    VideoCallServices.endCall();
                    break;
                case "NotReadableError":
                    alert("Could not access your device.");
                    VideoCallServices.endCall();
                    break;
                case "SecurityError":
                    alert("Media support is disabled in this browser.");
                    VideoCallServices.endCall();
                    break;
                default:
                    console.log(err, data);
            }
        });
        VideoCallServices.onReceiveCall = (_id) => {
            this.setState({
                showChat: _id
            });
            const { caller, target, target2, target3 } = this.refs;
            VideoCallServices.answerCall({
                localElement: caller,
                remoteElement: this.getTarget(),
                audio: true,
                video: false
            });
            alert("answered call");
            //VideoCallServices.rejectCall();
        };
        VideoCallServices.onTerminateCall = () => {
            alert("Call ended");
        };
        VideoCallServices.onCallRejected = () => {
            alert("Call rejected");
        };
        this.state = {
            showChat: false
        };
    }

    callUser(showChat) {
        const user = Meteor.users.findOne({
            _id: showChat
        });
        this.setState({
            showChat
        });
        VideoCallServices.call({
            id: showChat,
            localElement: this.refs.caller,
            remoteElement: this.getTarget(),
            audio: true,
            video: false
        });
        alert("called "+showChat);
    }
    render() {
        return (
            <div>
                <Call callUser={this.callUser.bind(this)}/>
                <video id="caller" ref="caller" style={{width: "1px", height: "1px"}} />
                <video id="target" ref="target" style={{width: "1px", height: "1px"}}/>
                <video id="target2" ref="target2" style={{width: "1px", height: "1px"}}/>
                <video id="target3" ref="target3" style={{width: "1px", height: "1px"}}/>
            </div>
            );
    }
}

export default Wrapper;