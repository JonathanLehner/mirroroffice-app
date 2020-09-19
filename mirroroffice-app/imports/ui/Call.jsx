import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
const User = Meteor.users;

class Call extends React.Component {
    constructor(){
        super();
    }
    callUser(key){
        console.log(this.props);
        this.props.callUser(key);
    }
    render(){
        console.log(this.props);
        console.log(this.props.users);
        return (
            <div>
                <div>Call Users</div>
                {this.props.usersLoading ? 
                    <div>
                        <div>
                            {
                            this.props.users && this.props.users.map(user => (
                                <div key={user._id} onClick={() => this.callUser(user._id)}>
                                    {user._id}
                                </div>
                            ))
                            }
                        </div>
                    </div> : "Loading"}
            </div>     
        );
    }
}

export default withTracker(()=>{
    const usersLoading = !Meteor.subscribe("all_users").ready();
    const users = User.find({
        _id:{
            $ne : Meteor.userId()
        }
    }).fetch();
    return {
        usersLoading,
        users
    };
})(Call);