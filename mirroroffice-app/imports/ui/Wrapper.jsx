import React from 'react';
import { Meteor } from 'meteor/meteor';
import { VideoCallServices } from 'meteor/elmarti:video-chat';
import Call from './Call.jsx';

class Wrapper extends React.Component {

    getCaller = () => {
        const targetID = document.getElementById("targetID").value;
        const target = targetID == 1 ? this.refs.caller : (targetID == 2) ? this.refs.caller2 : this.refs.caller3;
        return target;
    }

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
                    console.log("Could not find webcam");
                    VideoCallServices.endCall();
                    break;
                case "NotAllowedError":
                    console.log("Could not access media device");
                    VideoCallServices.endCall();
                    break;
                case "NotReadableError":
                    console.log("Could not access your device.");
                    VideoCallServices.endCall();
                    break;
                case "SecurityError":
                    console.log("Media support is disabled in this browser.");
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
                remoteElement: this.refs.target,
                audio: true,
                video: false
            });
            console.log("answered call");
            //VideoCallServices.rejectCall();
        };
        VideoCallServices.onTerminateCall = () => {
            console.log("Call ended");
        };
        VideoCallServices.onCallRejected = () => {
            console.log("Call rejected");
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
            remoteElement: this.refs.target,
            audio: true,
            video: false
        });
        console.log("called "+showChat);
    }
    render() {
        return (
            <div>
                <Call callUser={this.callUser.bind(this)}/>
                <video id="caller" ref="caller" style={{width: "1px", height: "1px"}} />
                <video id="caller2" ref="caller2" style={{width: "1px", height: "1px"}} />
                <video id="caller3" ref="caller3" style={{width: "1px", height: "1px"}} />
                <video id="target" ref="target" style={{width: "1px", height: "1px"}}/>
                <video id="target2" ref="target2" style={{width: "1px", height: "1px"}}/>
                <video id="target3" ref="target3" style={{width: "1px", height: "1px"}}/>
            </div>
            );
    }
}

export default Wrapper;